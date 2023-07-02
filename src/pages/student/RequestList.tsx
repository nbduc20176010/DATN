import React, { useEffect, useState } from "react";

import { Layout, List, Tag, Typography } from "antd";
import Custombreadcrumb from "../../components/CustomBreadcrumb";
import api from "../../services/api";

const { Content } = Layout;

type Props = {};

const StudentRequestList = (props: Props) => {
  const [datas, setDatas] = useState([]);
  const accessToken = localStorage.getItem("token");
  const [loading, setLoading] = useState(true);

  const handleGetRequests = async () => {
    await api
      .get(`/student/requests`, {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      })
      .then((item) => {
        setLoading(false);
        setDatas(item.data);
      })
      .catch((err) => {
        setLoading(false);
        return err;
      });
  };

  useEffect(() => {
    handleGetRequests();
    // eslint-disable-next-line
  }, []);

  return (
    <Layout className="h-full">
      <Content className="p-6 min-h-[280px]">
        <Custombreadcrumb breads={["teacher", "request"]} />
        <List
          className="bg-white rounded-lg px-5"
          dataSource={datas}
          loading={loading}
          renderItem={(item: any) => (
            <List.Item key={item._id}>
              <List.Item.Meta
                title={
                  <Typography className="font-bold">{item.notes}</Typography>
                }
                description={`Send date: ${item.sendDate}`}
              />
              <div>
                Status:{" "}
                <Tag
                  color={
                    item.status === "Pending"
                      ? "blue"
                      : item.status === "Approved"
                      ? "green"
                      : "red"
                  }
                >
                  {item.status}
                </Tag>
              </div>
            </List.Item>
          )}
        />
      </Content>
    </Layout>
  );
};

export default StudentRequestList;

import React, { useEffect, useState } from "react";

import { Layout, List, Tag, Typography } from "antd";
import Custombreadcrumb from "../../components/CustomBreadcrumb";
import api from "../../services/api";

const { Content } = Layout;

type Props = {};

const RequestList = (props: Props) => {
  const [datas, setDatas] = useState([]);
  const accessToken = localStorage.getItem("token");

  const handleGetRequests = async () => {
    const results = await api.get(`/teacher/requests`, {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });
    setDatas(results.data);
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
          renderItem={(item: any) => (
            <List.Item key={item._id}>
              <List.Item.Meta
                title={<Typography className="font-bold">{item.notes}</Typography>}
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

export default RequestList;

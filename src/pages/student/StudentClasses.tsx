import React, { useEffect, useState } from "react";

import { Layout, List, Tag, Typography } from "antd";
import Custombreadcrumb from "../../components/CustomBreadcrumb";
import api from "../../services/api";

const { Content } = Layout;

type Props = {};

const StudentClasses = (props: Props) => {
  const [datas, setDatas] = useState([]);
  const accessToken = localStorage.getItem("token");
  const [loading, setLoading] = useState(true);

  const handleGetRequests = async () => {
    await api
      .get(`/student/classes`, {
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

  const getStatus = (midScore: number, finalScore: number) => {
    if (!midScore || !finalScore) {
      return <Tag color="blue">Studying</Tag>;
    } else if (midScore > 40 && finalScore > 40) {
      return <Tag color="green">Passed</Tag>;
    } else {
      return <Tag color="red">Failed</Tag>;
    }
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
                  <Typography className="font-bold">
                    {item.className}
                  </Typography>
                }
                description={`Teacher name: ${item.teacherName}`}
              />
              <div className="flex gap-5">
                <div className="flex flex-col">
                  <p>Mid score: {item.midScore}</p>
                  <p>Final score: {item.finalScore}</p>
                </div>
                <div>Status: {getStatus(item.midScore, item.finalScore)}</div>
              </div>
            </List.Item>
          )}
        />
      </Content>
    </Layout>
  );
};

export default StudentClasses;

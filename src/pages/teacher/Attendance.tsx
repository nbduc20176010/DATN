import React, { useEffect, useState } from "react";

import { Avatar, Button, Checkbox, Layout, List, Typography } from "antd";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { fetchClassDetail, submitAttendance } from "../../redux/teacherSlice";

const { Content } = Layout;
const { Title, Text } = Typography;

type Props = {};

const Attendance = (props: Props) => {
  const { id = "" } = useParams();
  const { classDetail } = useAppSelector((state) => state.teacher);
  const [absentStudent, setAbsentStudent] = useState<any[]>([]);
  const dispatch = useAppDispatch();
  const accessToken = localStorage.getItem("token");

  const handleAbsentStudent = (absented: any) => {
    const newList = absentStudent.map((item: any) =>
      item._id === absented._id ? { ...item, absent: item.absent + 1 } : item
    );
    setAbsentStudent(newList);
    dispatch(
      submitAttendance({ id: id, values: absentStudent, token: accessToken })
    );
  };

  const handleSubmitAttendances = () => {
    console.log(absentStudent);
  };

  useEffect(() => {
    dispatch(fetchClassDetail(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, dispatch]);

  useEffect(() => {
    if (classDetail) {
      setAbsentStudent(classDetail.students);
    }
  }, [classDetail]);

  return (
    <div className=" w-[1024px] m-auto">
      <Layout className="bg-white">
        <Content className="p-10 min-h-400">
          <div className="flex justify-between">
            <div className="text-center">
              <Title level={3}>Class detail</Title>
            </div>
            <div className="flex gap-3">
              <Text>
                Class name: <Text strong>{classDetail.className}</Text>
              </Text>
              <Text>
                Room: <Text strong>{classDetail.room}</Text>
              </Text>
              <Text>
                Number of students:{" "}
                <Text strong>{classDetail.numberOfStudents}</Text>
              </Text>
            </div>
          </div>

          <List
            header={
              <div className="flex justify-center relative">
                <Title level={3}>Student list</Title>
              </div>
            }
            className="demo-loadmore-list"
            itemLayout="horizontal"
            dataSource={classDetail.students}
            renderItem={(item: any) => (
              <List.Item
                key={item._id}
                actions={[
                  <Checkbox onChange={() => handleAbsentStudent(item)}>
                    Absent
                  </Checkbox>,
                ]}
              >
                <List.Item.Meta
                  className="px-4"
                  avatar={
                    <Avatar src={`http://localhost:5000/${item.image.data}`} />
                  }
                  title={item.fullName}
                  description={
                    <div className="flex gap-4">
                      <p>Absent: {item.absent}</p>
                      <p>Mid score: {item.midScore}</p>
                      <p>Final score: {item.finalScore}</p>
                    </div>
                  }
                />
              </List.Item>
            )}
          />
          <div>
            <Button type="primary" onClick={handleSubmitAttendances}>
              Submit attendances
            </Button>
          </div>
        </Content>
      </Layout>
    </div>
  );
};

export default Attendance;

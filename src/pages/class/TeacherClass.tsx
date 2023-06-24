import React, { useEffect, useState } from "react";

import {
  Avatar,
  Button,
  Input,
  Layout,
  List,
  Popconfirm,
  Typography,
} from "antd";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { useParams } from "react-router-dom";
import {
  createRequest,
  fetchClassDetail,
  updateClassDetail,
} from "../../redux/teacherSlice";
import dayjs from "dayjs";

const { Content } = Layout;
const { Title, Text } = Typography;

const TeacherClass = () => {
  const { id = "" } = useParams();
  const { classDetail } = useAppSelector((state) => state.teacher);
  const dispatch = useAppDispatch();
  const accessToken = localStorage.getItem("token");
  const [notesValue, setNotesValue] = useState("");

  const handleEditNote = () => {
    const { notes, ...rest } = classDetail;
    dispatch(
      updateClassDetail({
        id,
        token: accessToken,
        values: { notes: notesValue, rest },
      })
    );
  };

  const requestRemoveStudent = (studentId: string) => {
    const newValues = {
      notes: "Delete student",
      sendDate: dayjs().format("YYYY-MM-DD"),
      body: { studentId, classId: id },
      sendBy: localStorage.getItem("username"),
      category: "class",
    };
    dispatch(createRequest({ values: newValues, token: accessToken }));
  };

  useEffect(() => {
    dispatch(fetchClassDetail(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, dispatch]);

  useEffect(() => {
    classDetail.notes && setNotesValue(classDetail.notes);
  }, [classDetail.notes]);

  return (
    <div className=" w-[1024px] m-auto">
      <Layout className="bg-white">
        <Content className="p-10 min-h-400">
          <div className="flex justify-between">
            <div className="flex flex-col w-1/2">
              <div className="text-center">
                <Title level={3}>Class detail</Title>
              </div>
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
              <div className="border-2 w-10/12 m-auto mt-5 p-2 rounded-md">
                <Input.TextArea
                  value={notesValue}
                  rows={5}
                  onChange={(e: any) => setNotesValue(e.target.value)}
                />
                <Button
                  type="primary"
                  className=" mt-2"
                  onClick={handleEditNote}
                >
                  Edit note
                </Button>
              </div>
            </div>
            <div className="flex flex-col w-1/2">
              <div className="text-center">
                <Title level={3}>Teacher information</Title>
              </div>
              <>
                <div className="flex justify-around">
                  <div className="flex flex-col">
                    <Text>
                      Teacher:{" "}
                      <Text strong>{classDetail.teacher?.fullName}</Text>
                    </Text>
                    <Text>
                      Email: <Text strong>{classDetail.teacher?.email}</Text>
                    </Text>
                    <Text>
                      Phone number:{" "}
                      <Text strong>{classDetail.teacher?.phoneNumber}</Text>
                    </Text>
                  </div>
                  <img
                    src={`http://localhost:5000/${classDetail.teacher?.image.data}`}
                    width={150}
                    height={250}
                    alt=""
                  />
                </div>
              </>
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
                actions={[
                  <Popconfirm
                    title="Are you sure?"
                    onConfirm={() => requestRemoveStudent(item._id)}
                  >
                    <Button type="primary" shape="round">
                      remove
                    </Button>
                  </Popconfirm>,
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
                      <p>Email: {item.email}</p>
                      <p>Phone number: {item.phoneNumber}</p>
                    </div>
                  }
                />
              </List.Item>
            )}
          />
        </Content>
      </Layout>
    </div>
  );
};

export default TeacherClass;

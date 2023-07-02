import React, { useState } from "react";

import {
  Avatar,
  Button,
  Form,
  Input,
  InputNumber,
  List,
  Modal,
  Popconfirm,
  Space,
  Typography,
} from "antd";
import AddStudent from "./AddStudent";
import { iStudent } from "../../dtos/pageDto";
import { useAppDispatch } from "../../redux/store";
import { editClass, submitScore } from "../../redux/adminSlice";

const { Title } = Typography;

export default function StudentList({
  id,
  students,
}: {
  id: string;
  students: iStudent[];
}) {
  const [scoreModalOpened, setScoreModalOpened] = useState(false);
  const [form] = Form.useForm();
  const accessToken = localStorage.getItem("token");
  const dispatch = useAppDispatch();
  const handleDeleteStudent = (studentId: string) => {
    const newList = students.filter((item) => item._id !== studentId);
    dispatch(
      editClass({
        id: id,
        values: { students: newList },
        token: `${accessToken}`,
      })
    );
  };
  const handleClearClass = () => {
    dispatch(
      editClass({
        id: id,
        values: { students: [] },
        token: `${accessToken}`,
      })
    );
  };

  const handleCloseModal = () => setScoreModalOpened(false);

  const handleOpenModal = (values: any) => {
    setScoreModalOpened(true);
    form.setFieldsValue(values);
  };

  const handleSubmitForm = (values: any) => {
    dispatch(submitScore({ id, values, token: accessToken }));
    handleCloseModal();
  };

  return (
    <div className="flex flex-col mt-10 gap-5">
      <div className="flex gap-4">
        <AddStudent id={id} classStudents={students} />
        <div>
          <Button danger shape="round" onClick={handleClearClass}>
            Clear students
          </Button>
        </div>
      </div>
      <div className="bg-gray-100 rounded-lg w-8/12 min-h-[150px] m-auto">
        <List
          header={
            <div className="flex justify-center relative">
              <Title level={3}>Student list</Title>
            </div>
          }
          className="demo-loadmore-list"
          itemLayout="horizontal"
          dataSource={students}
          renderItem={(item: any) => (
            <List.Item
              actions={[
                <Button
                  onClick={() => handleOpenModal(item)}
                  type="primary"
                  shape="round"
                >
                  Score
                </Button>,
                <Popconfirm
                  title="Are you sure?"
                  onConfirm={() => handleDeleteStudent(item._id)}
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
                  <>
                    <div>
                      <p>Email: {item.email}</p>
                      <p>Phone number: {item.phoneNumber}</p>
                    </div>
                    <div className="flex gap-4">
                      <p>Absent: {item.absent}</p>
                      <p>Mid score: {item.midScore}</p>
                      <p>Final score: {item.finalScore}</p>
                    </div>
                  </>
                }
              />
            </List.Item>
          )}
        />
      </div>
      <Modal
        destroyOnClose
        open={scoreModalOpened}
        footer={null}
        onCancel={handleCloseModal}
      >
        <Form
          labelCol={{ span: 6 }}
          preserve={false}
          labelAlign="left"
          form={form}
          className="px-10 pt-10"
          onFinish={handleSubmitForm}
        >
          <Form.Item label="Id" name="_id">
            <Input disabled />
          </Form.Item>
          <Form.Item label="Mid score" name="midScore">
            <InputNumber className="w-full" min={0} max={100} />
          </Form.Item>
          <Form.Item label="Final score" name="finalScore">
            <InputNumber className="w-full" min={0} max={100} />
          </Form.Item>
          <Space size="middle">
            <Button htmlType="submit" type="primary">
              Submit
            </Button>
            <Button onClick={handleCloseModal}>Cancel</Button>
          </Space>
        </Form>
      </Modal>
    </div>
  );
}

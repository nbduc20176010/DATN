import React, { useEffect, useState } from "react";

import { Button, Form, Input, InputNumber, Modal, Select } from "antd";
import { useAppDispatch } from "../../redux/store";
import { createRequest } from "../../redux/teacherSlice";
import dayjs from "dayjs";

type Props = {
  formValues: any;
};

export default function ChangeProfile({ formValues }: Props) {
  const [form] = Form.useForm();
  const [formOpen, setFormOpen] = useState(false);
  const dispatch = useAppDispatch();

  const handleSubmit = (values: any) => {
    const accessToken = localStorage.getItem("token");
    const { notes, ...rest } = values;
    const newValues = {
      notes: notes,
      body: rest,
      sendDate: dayjs().format("YYYY-MM-DD"),
      sendBy: localStorage.getItem("username"),
      category: "employee"
    };
    dispatch(createRequest({ values: newValues, token: accessToken }));
    setFormOpen(false);
  };

  const handleCloseForm = () => {
    setFormOpen(false);
  };

  useEffect(() => {
    form.setFieldsValue(formValues);
  }, [form, formValues]);

  return (
    <>
      <Modal open={formOpen} footer={null} closable={false} title="New request">
        <Form
          form={form}
          onFinish={handleSubmit}
          labelAlign="left"
          labelCol={{ span: 5, offset: 2 }}
          wrapperCol={{ span: 12, offset: 1 }}
        >
          <Form.Item name="_id" label="Id">
            <Input disabled />
          </Form.Item>
          <Form.Item
            name="fullName"
            label="Full name"
            rules={[{ required: true, message: "Field required!" }]}
          >
            <Input placeholder="Full name" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, type: "email", message: "Field required!" },
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="phoneNumber"
            label="Phone number"
            rules={[
              {
                required: true,
                message: "Field required!",
                pattern: new RegExp(/\d+/g),
              },
            ]}
          >
            <Input placeholder="Phone number" />
          </Form.Item>
          <Form.Item
            name="salary"
            label="Salary"
            rules={[{ required: true, message: "Field required!" }]}
          >
            <InputNumber min={0} placeholder="Salary" />
          </Form.Item>
          <Form.Item
            name="age"
            label="Age"
            rules={[
              { required: true, message: "Field required!" },
              {
                validator: (_: any, value: any) => {
                  if (value < 18) {
                    return Promise.reject(new Error("age lower than 18"));
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <InputNumber min={0} max={100} placeholder="Age" />
          </Form.Item>
          <Form.Item
            name="sex"
            label="Gender"
            wrapperCol={{ span: 6, offset: 1 }}
            rules={[{ required: true, message: "Field required!" }]}
          >
            <Select
              placeholder="Gender"
              options={[
                { value: "male", label: "Male" },
                { value: "female", label: "Female" },
              ]}
            />
          </Form.Item>
          <Form.Item
            name="notes"
            label="Notes"
            rules={[{ required: true, message: "Field required!" }]}
          >
            <Input.TextArea />
          </Form.Item>
          <div className="flex justify-end gap-4">
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button onClick={handleCloseForm}>Cancel</Button>
          </div>
        </Form>
      </Modal>
      <Button onClick={() => setFormOpen(true)}>Request update profile</Button>
    </>
  );
}

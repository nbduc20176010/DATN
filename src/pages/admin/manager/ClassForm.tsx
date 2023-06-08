import React from "react";

import { Button, Form, Input, InputNumber, Modal } from "antd";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { triggerClassForm } from "../../../redux/commonSlice";
import { addClass } from "../../../redux/adminSlice";

export default function ClassForm({ form }: any) {
    const accessToken = localStorage.getItem("token");
    const { classFormOpen } = useAppSelector((state) => state.common);
    const dispatch = useAppDispatch();

    const handleSubmit = (values: any) => {
        dispatch(addClass({ values: values, token: accessToken }));
        handleCloseForm();
    };

    const handleCloseForm = () => {
        dispatch(triggerClassForm());
    };

    return (
        <Modal
            title="Class"
            footer={null}
            open={classFormOpen}
            closable={false}
        >
            <Form
                form={form}
                onFinish={handleSubmit}
                labelAlign="left"
                labelCol={{ span: 5, offset: 2 }}
                wrapperCol={{ span: 12, offset: 1 }}
            >
                <Form.Item
                    name="className"
                    label="Class name"
                    rules={[{ required: true, message: "Field required!" }]}
                >
                    <Input placeholder="Class name" />
                </Form.Item>
                <Form.Item
                    name="maxStudents"
                    label="Max students"
                    rules={[{ required: true, message: "Field required!" }]}
                >
                    <InputNumber
                        min={0}
                        max={45}
                        placeholder="Max number of students"
                    />
                </Form.Item>
                <Form.Item name="notes" label="Notes">
                    <Input.TextArea placeholder="Notes" />
                </Form.Item>
                <div className="flex justify-end gap-4">
                    <Button htmlType="submit">Submit</Button>
                    <Button onClick={handleCloseForm}>Cancel</Button>
                </div>
            </Form>
        </Modal>
    );
}

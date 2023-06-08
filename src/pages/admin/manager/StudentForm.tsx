import React, { useState } from "react";

import { Button, Form, Input, InputNumber, Modal, Select } from "antd";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { triggerStudentForm } from "../../../redux/commonSlice";
import { addStudent, editStudent } from "../../../redux/adminSlice";

export default function StudentForm({ form }: any) {
    const [uploadImage, setuploadImage] = useState<any>({});
    const accessToken = localStorage.getItem("token");

    const { studentFormOpen, formType } = useAppSelector(
        (state) => state.common
    );
    const dispatch = useAppDispatch();

    const handleSubmit = (values: any) => {
        let formData = new FormData();
        formData.append("image", uploadImage);
        Object.keys(values).forEach((key) => {
            if (typeof values[key] !== "object")
                formData.append(key, values[key]);
            else formData.append(key, JSON.stringify(values[key]));
        });
        if (values._id) {
            dispatch(
                editStudent({
                    _id: values._id,
                    values: formData,
                    token: `${accessToken}`,
                })
            );
        } else {
            dispatch(
                addStudent({
                    values: formData,
                    token: `${accessToken}`,
                })
            );
        }
        handleCloseForm();
    };

    const handleCloseForm = () => {
        dispatch(triggerStudentForm());
        setuploadImage({});
    };

    const uploadingImage = (event: any) => {
        event.target.files[0] && setuploadImage(event.target.files[0]);
    };

    return (
        <Modal
            title="Student"
            footer={null}
            open={studentFormOpen}
            closable={false}
        >
            <Form
                form={form}
                onFinish={handleSubmit}
                labelAlign="left"
                labelCol={{ span: 5, offset: 2 }}
                wrapperCol={{ span: 12, offset: 1 }}
            >
                {formType === "add" ? (
                    <>
                        <Form.Item
                            name="username"
                            label="Username"
                            rules={[
                                { required: true, message: "Field required!" },
                            ]}
                        >
                            <Input placeholder="User name" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            label="Password"
                            rules={[
                                { required: true, message: "Field required!" },
                                { min: 6, message: "Minimum 6 characters!" },
                            ]}
                        >
                            <Input.Password placeholder="Password" />
                        </Form.Item>
                    </>
                ) : (
                    <Form.Item name="_id" label="Id">
                        <Input disabled />
                    </Form.Item>
                )}
                <div className="m-2">
                    <input
                        multiple={false}
                        type="file"
                        onChange={uploadingImage}
                    />
                </div>
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
                    rules={[{ required: true, message: "Field required!" }]}
                >
                    <Input placeholder="Email" />
                </Form.Item>
                <Form.Item
                    name="phoneNumber"
                    label="Phone number"
                    rules={[{ required: true, message: "Field required!" }]}
                >
                    <Input placeholder="Phone number" />
                </Form.Item>
                <Form.Item
                    name="age"
                    label="Age"
                    rules={[
                        { required: true, message: "Field required!" },
                        {
                            validator: (_: any, value: any) => {
                                if (value < 18) {
                                    return Promise.reject(
                                        new Error("age lower than 18")
                                    );
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
                <div className="flex justify-end gap-4">
                    <Button htmlType="submit">Submit</Button>
                    <Button onClick={handleCloseForm}>Cancel</Button>
                </div>
            </Form>
        </Modal>
    );
}

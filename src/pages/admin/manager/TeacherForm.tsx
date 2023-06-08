import React, { useState } from "react";

import { Button, Form, Input, InputNumber, Modal, Select } from "antd";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { triggerTeacherForm } from "../../../redux/commonSlice";
import { addTeacher, editTeacher } from "../../../redux/adminSlice";

export default function TeacherForm({ form }: any) {
    const [uploadImage, setuploadImage] = useState<any>();
    const accessToken = localStorage.getItem("token");

    const { teacherFormOpen, formType } = useAppSelector(
        (state) => state.common
    );
    const dispatch = useAppDispatch();

    const handleSubmit = (values: any) => {
        let formData = new FormData();
        uploadImage && formData.append("image", uploadImage);
        Object.keys(values).forEach((key) => {
            if (typeof values[key] !== "object")
                formData.append(key, values[key]);
            else formData.append(key, JSON.stringify(values[key]));
        });
        if (values._id) {
            dispatch(
                editTeacher({
                    _id: values._id,
                    values: formData,
                    token: `${accessToken}`,
                })
            );
        } else {
            dispatch(
                addTeacher({
                    values: formData,
                    token: `${accessToken}`,
                })
            );
        }
        handleCloseForm();
    };

    const handleCloseForm = () => {
        dispatch(triggerTeacherForm());
        setuploadImage({});
    };

    const uploadingImage = (event: any) => {
        event.target.files[0] && setuploadImage(event.target.files[0]);
    };

    return (
        <Modal
            title="Teacher"
            footer={null}
            open={teacherFormOpen}
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

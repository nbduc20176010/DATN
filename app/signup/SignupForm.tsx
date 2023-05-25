"use client";

import { KeyOutlined, UserOutlined } from "@ant-design/icons";
import { iSignup } from "@dtos/formDto";
import { useAppDispatch, useAppSelector } from "@redux/store";
import { resetLoading, signup } from "@redux/userSlice";
import { Button, Form, Input, Space, Typography } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const { Title } = Typography;

const SignupForm = () => {
    const [signupForm] = Form.useForm();
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { loginLoading } = useAppSelector((state) => state.user);

    const handleSignup = (values: iSignup) => {
        if (values.password === values.repeatPassword) {
            dispatch(
                signup({
                    username: values.username,
                    password: values.password,
                })
            );
        }
    };

    useEffect(() => {
        if (loginLoading === "success") {
            dispatch(resetLoading());
            router.push("/signin");
        }
    }, [loginLoading]);

    return (
        <>
            <div className="w-full text-center mb-5">
                <div className="absolute">
                    <Link
                        href="/"
                        className="underline underline-offset-2 font-semibold"
                    >
                        Back
                    </Link>
                </div>
                <Title level={3} style={{ margin: 0, letterSpacing: "0.2rem" }}>
                    Sign Up
                </Title>
            </div>
            <Form
                form={signupForm}
                onFinish={handleSignup}
                style={{
                    width: 300,
                }}
            >
                <Form.Item name="username" rules={[{ required: true }]}>
                    <Input prefix={<UserOutlined />} placeholder="username" />
                </Form.Item>
                <Form.Item name="password" rules={[{ required: true }]}>
                    <Input.Password
                        prefix={<KeyOutlined />}
                        placeholder="password"
                    />
                </Form.Item>
                <Form.Item
                    name="repeatPassword"
                    rules={[
                        { required: true },
                        {
                            validator(_, value) {
                                if (
                                    signupForm.getFieldValue("password") ===
                                    value
                                ) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(
                                    "Confirm password not matched"
                                );
                            },
                        },
                    ]}
                >
                    <Input.Password
                        prefix={<KeyOutlined />}
                        placeholder="Repeat password"
                    />
                </Form.Item>
                <div className="w-full flex justify-end">
                    <Space size="middle">
                        <Button
                            htmlType="submit"
                            loading={loginLoading !== "idle"}
                        >
                            Register
                        </Button>
                        <Button danger>Cancel</Button>
                    </Space>
                </div>
            </Form>
        </>
    );
};

export default SignupForm;

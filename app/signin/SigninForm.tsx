'use client'

import Link from "next/link";
import React, { useEffect } from "react";

import { Button, Form, Input, Space, Typography } from "antd";
import { UserOutlined, KeyOutlined } from "@ant-design/icons";

import { useAppDispatch, useAppSelector } from "@redux/store";
import { signin } from "@redux/userSlice";
import { iSignin } from "@dtos/formDto";
import { useRouter } from "next/navigation";

const { Title } = Typography;

const SigninForm = () => {
    const [signinForm] = Form.useForm();
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { loginLoading } = useAppSelector((state) => state.user);

    const handleLogin = (values: iSignin) => {
        dispatch(signin(values));
    };

    useEffect(() => {
        if (loginLoading === "success") {
            const role = localStorage.getItem("role");
            if (role === "regular") {
                router.push("/");
            } else {
                router.push(`/${role}`);
            }
        }
    }, [loginLoading, dispatch]);

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
                    Sign In
                </Title>
            </div>
            <Form
                form={signinForm}
                style={{
                    width: 300,
                }}
                onFinish={handleLogin}
            >
                <Form.Item name="username" rules={[{ required: true }]}>
                    <Input prefix={<UserOutlined />} placeholder="Username" />
                </Form.Item>
                <Form.Item name="password" rules={[{ required: true }]}>
                    <Input.Password
                        prefix={<KeyOutlined />}
                        placeholder="password"
                    />
                </Form.Item>
                <div className="w-full flex justify-end">
                    <Space size="middle">
                        <Button
                            htmlType="submit"
                            loading={loginLoading !== "idle"}
                        >
                            Login
                        </Button>
                        <Button danger>Cancel</Button>
                    </Space>
                </div>
            </Form>
        </>
    );
};

export default SigninForm;

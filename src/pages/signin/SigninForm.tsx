import React, { useEffect } from "react";

import { Button, Form, Input, Space, Typography } from "antd";
import { UserOutlined, KeyOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { resetLoading, signIn } from "../../redux/commonSlice";
import { Link, useNavigate } from "react-router-dom";

const { Title } = Typography;

const SigninForm = () => {
  const [signinForm] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.common);

  const handleLogin = (values: any) => {
    dispatch(signIn(values));
  };

  useEffect(() => {
    if (loading === "success") {
      let role = localStorage.getItem("role");
      switch (role) {
        case "admin":
          navigate("/admin");
          break;
        case "teacher":
          navigate("/teacher");
          break;
        default:
          navigate("/");
          break;
      }
      dispatch(resetLoading());
    }
  }, [loading, dispatch, navigate]);

  return (
    <>
      <div className="w-full text-center mb-5">
        <div className="absolute">
          <Button
            onClick={() => navigate("/")}
            shape="round"
            className="font-semibold"
          >
            Back
          </Button>
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
          <Input.Password prefix={<KeyOutlined />} placeholder="password" />
        </Form.Item>
        <div className="w-full flex justify-end">
          <Space size="middle">
            <Button
              type="primary"
              htmlType="submit"
              loading={loading === "loading"}
            >
              Login
            </Button>
            <Button onClick={() => navigate("/")} danger>
              Cancel
            </Button>
          </Space>
        </div>
      </Form>
    </>
  );
};

export default SigninForm;

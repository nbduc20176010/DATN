import React from "react";

import { Avatar, Button, Divider, notification, Space } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/store";
import { signOut } from "../../redux/commonSlice";
import { LogoutOutlined } from "@ant-design/icons";


const nav_container = [
  "m-auto",
  "flex",
  "justify-between",
  "p-3",
  "text-lg",
  "font-semibold",
  "tracking-wide",
];

const Header = ({ extraMenu, currentUser }: any) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    const token = localStorage.getItem("token");
    dispatch(signOut(token!))
      .then(() => {
        localStorage.clear();
        notification.success({
          message: "Sign out success!",
          description: "Goodbye!",
          duration: 2,
        });
        navigate("/signin");
      })
      .catch(() =>
        notification.error({
          message: "Sign out unsuccess!",
          description: "Somethings went wrong!",
          duration: 2,
        })
      );
  };

  return (
    <div className="w-full bg-[#f0f0f0]">
      <div className={nav_container.join(" ")}>
        <div className="flex gap-14">
          <div>Home Icon</div>
          {extraMenu.length && (
            <div className="flex gap-4">
              {extraMenu.map((item: any) => (
                <div key={item.label} className="hover:underline">
                  <Link to={item.path}>{item.label}</Link>
                </div>
              ))}
            </div>
          )}
        </div>
        {currentUser ? (
          <div className="flex gap-2 items-center">
            <Space size="middle">
              <Avatar
                shape="circle"
                src={`http://localhost:5000/${currentUser.image?.data}`}
                size={40}
              />
              <div>{currentUser.fullName}</div>
            </Space>
            <Divider type="vertical" />
            <Button
              danger
              size="small"
              shape="round"
              className="flex items-center"
              onClick={handleLogout}
            >
              Log out <LogoutOutlined />
            </Button>
          </div>
        ) : (
          <div className="flex gap-4">
            <Link to="/signin">
              <Button style={{ fontWeight: 600 }} shape="round">
                Sign In
              </Button>
            </Link>
            <Link to="signup">
              <Button shape="round" style={{ fontWeight: 600 }}>
                Sign Up
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;

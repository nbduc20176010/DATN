import React from "react";

import { Button, Dropdown, MenuProps, notification, Space } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/store";
import { signOut } from "../../redux/commonSlice";

const nav_container = [
    "m-auto",
    "flex",
    "justify-between",
    "p-3",
    "text-lg",
    "font-semibold",
    "tracking-wide",
];

const Header = ({ extraMenu }: any) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const currentUser = localStorage.getItem("username");

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

    const items: MenuProps["items"] = [
        {
            key: "1",
            label: "1st menu item",
        },
        {
            key: "3",
            label: "Sign Out",
            onClick: handleLogout,
        },
    ];

    return (
        <div className="w-full bg-[#f0f0f0]">
            <div className={nav_container.join(" ")}>
                <div className="flex gap-14">
                    <div>Home Icon</div>
                    {extraMenu.length && (
                        <div className="flex gap-4">
                            {extraMenu.map((item: any) => (
                                <div
                                    key={item.label}
                                    className="hover:underline"
                                >
                                    <Link to={item.path}>{item.label}</Link>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                {currentUser ? (
                    <Dropdown menu={{ items }}>
                        <Space
                            size="middle"
                            style={{
                                cursor: "pointer",
                            }}
                        >
                            <div className="rounded-full bg-slate-800 w-10 h-10"></div>
                            <div>{currentUser}</div>
                        </Space>
                    </Dropdown>
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

"use client";

import { iExtraMenu } from "@dtos/userNavDto";
import { Button, Dropdown, MenuProps, Space } from "antd";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import { useAppDispatch, useAppSelector } from "@redux/store";
import { resetLoading, signout } from "@redux/userSlice";
import { useRouter } from "next/navigation";

const nav_container = [
    "m-auto",
    "flex",
    "justify-between",
    "p-3",
    "text-lg",
    "font-semibold",
    "tracking-wide",
];

interface iProps {
    extraMenu?: iExtraMenu[];
}

const Navbar = ({ extraMenu = [] }: iProps) => {
    const [currentUser, setCurrentUser] = useState<string>("");
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { logoutLoading } = useAppSelector((state) => state.user);

    useEffect(() => {
        getCookie("user-token") &&
            setCurrentUser(localStorage.getItem("username")!);
    }, []);

    useEffect(() => {
        if (logoutLoading === "success") {
            setCurrentUser("");
            dispatch(resetLoading());
            router.push("/signin");
        }
    }, [logoutLoading, dispatch]);

    const items: MenuProps["items"] = [
        {
            key: "1",
            label: <a href="#">1st menu item</a>,
        },
        {
            key: "3",
            label: "Sign Out",
            onClick: () => {
                dispatch(signout(`${getCookie("user-token")}`));
            },
        },
    ];

    return (
        <div className="w-full">
            <div className={nav_container.join(" ")}>
                <div className="flex gap-14">
                    <div>
                        <Link href="/" prefetch={false}>Home Icon</Link>
                    </div>
                    {extraMenu.length && (
                        <div className="flex gap-4">
                            {extraMenu.map((item) => (
                                <div
                                    key={item.label}
                                    className="hover:underline"
                                >
                                    <Link href={item.path} prefetch={false}>{item.label}</Link>
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
                        <Link href="/signin" prefetch={false}>
                            <Button style={{ fontWeight: 600 }} shape="round">
                                Sign In
                            </Button>
                        </Link>
                        <Link href="signup" prefetch={false}>
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

export default Navbar;

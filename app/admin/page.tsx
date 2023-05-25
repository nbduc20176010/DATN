"use client";

import { useAppDispatch, useAppSelector } from "@redux/store";
import { resetLoading } from "@redux/userSlice";
import { notification } from "antd";
import { useEffect } from "react";

const AdminHome = () => {
    const { loginLoading } = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (loginLoading === "success") {
            notification.success({
                message: "Login success",
                description: `Welcome`,
                duration: 3,
            });
            dispatch(resetLoading());
        }
    }, []);
    return <div>AdminHome</div>;
};

AdminHome.pageType = "admin";

export default AdminHome;

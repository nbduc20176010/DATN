import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../header/Header";

const AdminLayout = () => {
    const adminNav = [
        {
            label: "Board",
            path: "/admin",
        },
        {
            label: "Manager",
            path: "/admin/manager",
        },
    ];

    return (
        <div>
            <Header extraMenu={adminNav} />
            <div className="w-10/12 m-auto">
                <Outlet />
            </div>
        </div>
    );
};

export default AdminLayout;

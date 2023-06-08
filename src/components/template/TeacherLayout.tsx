import React from "react";

import { Outlet } from "react-router-dom";
import Header from "../header/Header";

const TeacherLayout = () => {
    const teacherNav = [
        {
            label: "Board",
            path: "/teacher",
        },
        {
            label: "Manager",
            path: "/teacher/manager",
        },
    ];

    return (
        <div>
            <Header extraMenu={teacherNav} />
            <div className="bg-white w-10/12 m-auto">
                <Outlet />
            </div>
        </div>
    );
};

export default TeacherLayout;

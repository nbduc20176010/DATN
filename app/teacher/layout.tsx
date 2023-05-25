import Navbar from "@components/Navbar";
import { iExtraMenu } from "@dtos/userNavDto";
import React from "react";

const TeacherLayout = ({ children }: { children: React.ReactNode }) => {
    const teacherNav: iExtraMenu[] = [
        {
            label: "Home",
            path: "/teacher",
        },
        {
            label: "Dashboard",
            path: "/teacher/dashboard",
        },
        {
            label: "Manager",
            path: "/teacher/manager",
        },
    ];

    return (
        <div className="h-screen md:h-auto">
            <Navbar extraMenu={teacherNav} />
            <div className="flex items-center">{children}</div>
        </div>
    );
};

export default TeacherLayout;

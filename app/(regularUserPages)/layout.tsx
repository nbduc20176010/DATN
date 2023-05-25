import Navbar from "@components/Navbar";
import { iExtraMenu } from "@dtos/userNavDto";
import React from "react";

const UserLayout = ({ children }: { children: React.ReactNode }) => {
    const userNav: iExtraMenu[] = [
        {
            label: "Home",
            path: "/",
        },
        {
            label: "About",
            path: "about",
        },
        {
            label: "Contact",
            path: "contact",
        },
    ];
    return (
        <div className="h-screen md:h-auto">
            <Navbar extraMenu={userNav} />
            <div className="flex min-h-400 items-center justify-center w-full">
                {children}
            </div>
        </div>
    );
};

export default UserLayout;

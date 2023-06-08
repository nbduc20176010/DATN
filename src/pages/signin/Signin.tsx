import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import SigninForm from "./SigninForm";

const signin_page = [
    "h-screen",
    "min-h-400",
    "flex",
    "justify-center",
    "items-center",
    "bg-[#f0f0f0]",
];

const form_container = [
    "rounded-lg",
    "border-0",
    "bg-white",
    "py-5",
    "px-7",
    "shadow-md",
];

const SignIn = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const role = localStorage.getItem("role");
        switch (role) {
            case "admin":
                navigate("/admin");
                break;
            case "teacher":
                navigate("/teacher");
                break;
            case "regular":
                navigate("/");
                break;
            default:
                break;
        }
    }, [navigate]);

    return (
        <div className={signin_page.join(" ")}>
            <div className={form_container.join(" ")}>
                <SigninForm />
            </div>
        </div>
    );
};

export default SignIn;

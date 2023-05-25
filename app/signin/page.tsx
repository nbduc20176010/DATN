'use client'

import FormSkeleton from "@components/FormSkeleton";
import dynamic from "next/dynamic";
import React from "react";

const signin_page = [
    "h-screen",
    "min-h-400",
    "flex",
    "justify-center",
    "items-center",
];

const form_container = [
    "rounded-lg",
    "border-0",
    "bg-white",
    "py-5",
    "px-7",
    "shadow-md",
];

const SigninForm = dynamic(() => import("./SigninForm"), {
    ssr: false,
    loading: () => <FormSkeleton />,
});

const SigninPage = () => {
    return (
        <div className={signin_page.join(" ")}>
            <div className={form_container.join(" ")}>
                <SigninForm />
            </div>
        </div>
    );
};

export default SigninPage;

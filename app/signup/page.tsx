import FormSkeleton from "@components/FormSkeleton";
import dynamic from "next/dynamic";
import React from "react";

const signup_page = [
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

const SignupForm = dynamic(() => import("./SignupForm"), {
    ssr: false,
    loading: () => <FormSkeleton />,
});

const SignupPage = () => {
    return (
        <div className={signup_page.join(" ")}>
            <div className={form_container.join(" ")}>
                <SignupForm />
            </div>
        </div>
    );
};

export default SignupPage;

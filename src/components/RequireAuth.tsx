import React, { useEffect } from "react";

import { Navigate, Outlet, useNavigate } from "react-router-dom";

const RequireAuth = () => {
    const navigate = useNavigate();

    const accessToken = localStorage.getItem("token");

    useEffect(() => {
        const role = localStorage.getItem("role");
        switch (role) {
            case "admin":
                navigate("/admin");
                break;
            case "teacher":
                navigate("/teacher");
                break;
            default:
                break;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <>{!accessToken ? <Navigate to="/signin" /> : <Outlet />}</>;
};

export default RequireAuth;

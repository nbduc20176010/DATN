import React, { useEffect } from "react";

import { Outlet } from "react-router-dom";
import Header from "../header/Header";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { getProfile } from "../../redux/commonSlice";

const TeacherLayout = () => {
  const profile = useAppSelector((state) => state.common.profile);
  const dispatch = useAppDispatch();
  const accessToken = localStorage.getItem("token");

  const teacherNav = [
    {
      label: "Board",
      path: "/teacher",
    },
    {
      label: "Requests",
      path: "/teacher/request",
    },
    {
      label: "Manager",
      path: "/teacher/manager",
    },
  ];

  useEffect(() => {
    dispatch(getProfile({ type: "employee", token: accessToken }));
  }, [dispatch, accessToken]);

  return (
    <div className="h-screen">
      <Header extraMenu={teacherNav} currentUser={profile} />
      <div className="bg-white w-10/12 mx-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default TeacherLayout;

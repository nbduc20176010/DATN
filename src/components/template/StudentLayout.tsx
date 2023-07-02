import React, { useEffect } from "react";

import { Outlet } from "react-router-dom";
import Header from "../header/Header";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { getProfile } from "../../redux/commonSlice";

const StudentLayout = () => {
  const profile = useAppSelector((state) => state.common.profile);
  const dispatch = useAppDispatch();
  const accessToken = localStorage.getItem("token");

  useEffect(() => {
    dispatch(getProfile({ type: "student", token: accessToken }));
  }, [dispatch, accessToken]);

  return (
    <div className="h-screen">
      <Header currentUser={profile} />
      <div className="bg-white w-10/12 mx-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default StudentLayout;

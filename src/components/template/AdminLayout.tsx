import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../header/Header";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { getProfile } from "../../redux/commonSlice";
import api from "../../services/api";
import { Badge } from "antd";

const AdminLayout = () => {
  const [pendingRequests, setPendingRequests] = useState(0);
  const profile = useAppSelector((state) => state.common.profile);
  const dispatch = useAppDispatch();
  const accessToken = localStorage.getItem("token");

  const adminNav = [
    {
      label: "Board",
      path: "/admin",
    },
    {
      label: (
        <Badge count={pendingRequests} showZero size="small" className="text-lg hover:underline">
          Requests
        </Badge>
      ),
      path: "/admin/request",
    },
    {
      label: "Manager",
      path: "/admin/manager",
    },
  ];

  const getNumberOfPendingRequests = async () => {
    const numOfRequest = await api.post("/admin/requests/pending", null, {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });
    setPendingRequests(numOfRequest.data.numberOfRequests);
  };

  useEffect(() => {
    dispatch(getProfile({ type: "employee", token: accessToken }));
    getNumberOfPendingRequests();
    // eslint-disable-next-line
  }, [dispatch, accessToken]);

  return (
    <div className="min-h-screen">
      <Header extraMenu={adminNav} currentUser={profile} />
      <div className="w-10/12 mx-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;

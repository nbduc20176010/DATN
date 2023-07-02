import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { fetchStudentProfile } from "../../redux/studentSlice";
import ChangeProfile from "./ChangeProfile";
import { Spin } from "antd";

type Props = {};

const StudentInformation = (props: Props) => {
  const { profile, loading } = useAppSelector((state) => state.student);
  const accessToken = localStorage.getItem("token");
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchStudentProfile({ token: accessToken }));
  }, [dispatch, accessToken]);

  return (
    <div className="grid grid-cols-2 items-center justify-items-center bg-white py-20 rounded-md">
      <div>
        {loading && <Spin />}
        <div className="flex gap-2">
          <span className="font-bold">Full name:</span>
          {profile?.fullName}
        </div>
        <div className="flex gap-2">
          <span className="font-bold">Email:</span>
          {profile?.email}
        </div>
        <div className="flex gap-2">
          <span className="font-bold">Phone number:</span>
          {profile?.phoneNumber}
        </div>
        <div className="flex gap-2">
          <span className="font-bold">Age:</span>
          {profile?.age}
        </div>
        <div className="flex gap-2">
          <span className="font-bold">Sex:</span>
          {profile?.sex}
        </div>
      </div>
      <div>
        <img
          src={`http://localhost:5000/${profile?.image?.data}`}
          width={300}
          alt=""
        />
      </div>
      <ChangeProfile formValues={profile} />
    </div>
  );
};

export default StudentInformation;

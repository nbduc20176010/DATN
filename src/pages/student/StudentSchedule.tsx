import React, { useEffect } from "react";
import Custombreadcrumb from "../../components/CustomBreadcrumb";
import { Spin, Typography } from "antd";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { fetchStudentSchedule } from "../../redux/studentSlice";

export default function StudentSchedule() {
  const { schedule, loading } = useAppSelector((state) => state.student);
  const dispatch = useAppDispatch();
  const accessToken = localStorage.getItem("token");

  useEffect(() => {
    dispatch(fetchStudentSchedule({ token: accessToken }));
  }, [dispatch, accessToken]);
  return (
    <>
      <Custombreadcrumb breads={["student", "board"]} />
      <div className="m-auto grid grid-cols-7 min-w-[800px]">
        {loading ? (
          <Spin />
        ) : (
          schedule?.map((item: any) => (
            <div
              className="flex flex-col first:border-l-2 min-h-[300px]"
              key={item.label}
            >
              <div key={item.label} className="border-2 border-l-0 text-center">
                <Typography.Text strong>{item.label}</Typography.Text>
              </div>
              <div className="flex flex-col items-center h-full bg-white pt-2 gap-2">
                {item.classes?.map((subclass: any) => (
                  <div
                    key={subclass.shift + " " + subclass.room}
                    className="flex flex-col justify-center items-center p-4 bg-green-400 rounded-md text-white"
                  >
                    <div>
                      {subclass.class} - {subclass.room}
                    </div>
                    <div>Shift {subclass.shift}</div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}

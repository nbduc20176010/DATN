import React, { useEffect } from "react";

import { Button, Layout, Popconfirm, Typography } from "antd";
import Custombreadcrumb from "../../components/CustomBreadcrumb";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { createRequest, fetchTeacherSchedule } from "../../redux/teacherSlice";
import dayjs from "dayjs";

const { Content } = Layout;
const { Text } = Typography;

const TeacherDashboard = () => {
  const { schedule } = useAppSelector((state) => state.teacher);
  const dispatch = useAppDispatch();
  const accessToken = localStorage.getItem("token");

  const requestDelete = (classSchedule: any) => {
    const newValues = {
      notes: "Delete schedule",
      body: classSchedule,
      sendDate: dayjs().format("YYYY-MM-DD"),
      sendBy: localStorage.getItem("username"),
      category: "schedule",
    };
    dispatch(createRequest({ values: newValues, token: accessToken }));
  };

  useEffect(() => {
    dispatch(fetchTeacherSchedule(`${accessToken}`));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <Layout>
      <Content style={{ padding: "24px", minHeight: 280, overflowX: "scroll" }}>
        <Custombreadcrumb breads={["teacher", "board"]} />
        <div className="m-auto grid grid-cols-7 min-w-[800px]">
          {schedule?.map((item: any) => (
            <div
              className="flex flex-col first:border-l-2 min-h-[300px]"
              key={item.label}
            >
              <div key={item.label} className="border-2 border-l-0 text-center">
                <Text strong>{item.label}</Text>
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
                    <Popconfirm
                      title="Request delete this schedule?"
                      onConfirm={() =>
                        requestDelete({ classId: subclass._id, label: item.label })
                      }
                    >
                      <Button className="bg-white mt-2">-Delete-</Button>
                    </Popconfirm>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Content>
    </Layout>
  );
};

export default TeacherDashboard;

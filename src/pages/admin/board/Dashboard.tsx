import React, { useEffect } from "react";

import { Button, Layout, Spin, Typography } from "antd";
import Custombreadcrumb from "../../../components/CustomBreadcrumb";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import {
  deleteClassInSchedule,
  fetchSchedules,
  triggerForm,
} from "../../../redux/scheduleSlice";
import { CloseCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import AddSchedule from "./AddSchedule";

const { Content } = Layout;
const { Text } = Typography;

const AdminDashboard = () => {
  const { schedules, loading } = useAppSelector((state) => state.schedule);
  const dispatch = useAppDispatch();
  const accessToken = localStorage.getItem("token");

  const handleOpenForm = () => {
    dispatch(triggerForm());
  };

  const handleDeleteClassInSchedule = ({ id, values }: any) => {
    const weekday = schedules?.find((item: any) => item._id === id);
    const newList = weekday?.classes.filter(
      (item: any) => item._id !== values._id
    );
    dispatch(
      deleteClassInSchedule({ id, values: newList, token: accessToken })
    );
  };

  useEffect(() => {
    dispatch(fetchSchedules());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <Layout>
      <Content style={{ padding: "24px", minHeight: 280, overflowX: "scroll" }}>
        <Custombreadcrumb breads={["admin", "board"]} />
        {loading ? (
          <Spin />
        ) : (
          <>
            <Button
              type="primary"
              shape="round"
              className="mb-4 flex items-center"
              onClick={handleOpenForm}
            >
              Add schedule <PlusCircleOutlined />
            </Button>
            <div className="m-auto grid grid-cols-7  min-w-[800px]">
              {schedules?.map((item: any) => (
                <div
                  className="flex flex-col first:border-l-2 min-h-[300px]"
                  key={item.label}
                >
                  <div
                    key={item.label}
                    className="border-2 border-l-0 text-center"
                  >
                    <Text strong>{item.label}</Text>
                  </div>
                  <div className="flex flex-col items-center h-full bg-white pt-2 gap-2">
                    {item.classes?.map((subclass: any) => (
                      <div
                        key={subclass.shift + " " + subclass.room}
                        className="flex flex-col justify-center items-center pb-2 bg-green-400 rounded-md text-white"
                      >
                        <div className="w-full flex">
                          <Button
                            size="small"
                            style={{ border: "none", marginLeft: "auto" }}
                            onClick={() =>
                              handleDeleteClassInSchedule({
                                id: item._id,
                                values: subclass,
                              })
                            }
                          >
                            <CloseCircleOutlined />
                          </Button>
                        </div>
                        <div className="mx-4">
                          {subclass.class} - {subclass.room}
                        </div>
                        <div className="mx-4">Shift {subclass.shift}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
        <AddSchedule />
      </Content>
    </Layout>
  );
};

export default AdminDashboard;

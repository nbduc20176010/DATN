import React, { useEffect } from "react";

import { Button, Layout, Spin, Typography } from "antd";
import Custombreadcrumb from "../../../components/CustomBreadcrumb";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { fetchSchedules, triggerForm } from "../../../redux/scheduleSlice";
import { PlusCircleOutlined } from "@ant-design/icons";
import AddSchedule from "./AddSchedule";

const { Content } = Layout;
const { Text } = Typography;

const AdminDashboard = () => {
    const { schedules, loading } = useAppSelector((state) => state.schedule);
    const dispatch = useAppDispatch();

    const handleOpenForm = () => {
        dispatch(triggerForm());
    };

    useEffect(() => {
        dispatch(fetchSchedules());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    return (
        <Layout>
            <Content style={{ padding: "24px", minHeight: 280 }}>
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
                        <div className="m-auto grid grid-cols-7">
                            {schedules?.map((item) => (
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
                                        {item.class.map((subclass) => (
                                            <div>
                                                {subclass.className} -{" "}
                                                {subclass.room}
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

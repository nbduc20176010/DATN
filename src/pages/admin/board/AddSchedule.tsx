import React, { useEffect } from "react";

import { Button, Form, Input, Modal, Select } from "antd";
import { getRooms, triggerForm } from "../../../redux/scheduleSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { fetchDatas } from "../../../redux/adminSlice";

type Props = {
    schedule?: any;
};

const AddSchedule = ({ schedule }: Props) => {
    const [form] = Form.useForm();
    const dispatch = useAppDispatch();
    const { formOpen } = useAppSelector((state) => state.schedule);
    const { rooms = [] } = useAppSelector((state) => state.schedule);
    const { datas } = useAppSelector((state) => state.admin);

    const handleSubmit = (values: any) => {
        console.log(values);
    };

    useEffect(() => {
        const accessToken = localStorage.getItem("token");
        dispatch(fetchDatas({ key: "class", token: accessToken }));
        dispatch(getRooms());
    }, [dispatch]);

    return (
        <Modal
            title="Add schedule"
            footer={null}
            open={formOpen}
            closable={false}
        >
            <Form
                form={form}
                onFinish={handleSubmit}
                labelAlign="left"
                labelCol={{ span: 5, offset: 2 }}
                wrapperCol={{ span: 12, offset: 1 }}
            >
                <Form.Item
                    name="label"
                    label=" name"
                    rules={[{ required: true, message: "Field required!" }]}
                >
                    <Input placeholder="Class name" />
                </Form.Item>
                <Form.Item
                    name="shift"
                    label="Shift"
                    rules={[{ required: true }]}
                >
                    <Select
                        style={{ width: 120 }}
                        options={[
                            { value: 1, label: "Shift 1" },
                            { value: 2, label: "Shift 2" },
                            { value: 3, label: "Shift 3" },
                            { value: 4, label: "Shift 4" },
                            { value: 5, label: "Shift 5" },
                        ]}
                    />
                </Form.Item>
                <Form.Item
                    name="class"
                    label="Class"
                    rules={[{ required: true }]}
                >
                    <Select
                        style={{ width: 120 }}
                        options={datas.map((item: any) => ({
                            value: item.className,
                            label: item.className,
                        }))}
                    />
                </Form.Item>
                <Form.Item
                    name="room"
                    label="Room"
                    rules={[{ required: true }]}
                >
                    <Select
                        style={{ width: 120 }}
                        options={rooms.map((item: any) => ({
                            value: item.roomName,
                            label: item.roomName,
                        }))}
                    />
                </Form.Item>
                <div className="flex justify-end gap-4">
                    <Button htmlType="submit">Submit</Button>
                    <Button onClick={() => dispatch(triggerForm())}>
                        Cancel
                    </Button>
                </div>
            </Form>
        </Modal>
    );
};

export default AddSchedule;

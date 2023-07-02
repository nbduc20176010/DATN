import React, { useEffect } from "react";

import { Button, Form, Modal, Select } from "antd";
import {
  addSchedule,
  getRooms,
  getTeachers,
  triggerForm,
} from "../../../redux/scheduleSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { fetchDatas } from "../../../redux/adminSlice";

const AddSchedule = () => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const {
    formOpen,
    rooms = [],
    teacher,
  } = useAppSelector((state) => state.schedule);
  const { datas } = useAppSelector((state) => state.admin);
  const accessToken = localStorage.getItem("token");
  const currentClass = Form.useWatch("class", form);

  const handleSubmit = (values: any) => {
    const newSchedule = {
      ...values,
      classId: datas.find((item: any) => item.className === currentClass)._id,
    };
    dispatch(addSchedule({ values: newSchedule, token: accessToken }));
    dispatch(triggerForm());
  };

  useEffect(() => {
    dispatch(getTeachers(accessToken));
    dispatch(getRooms());
    dispatch(fetchDatas({ key: "class", token: accessToken }));
  }, [dispatch, accessToken]);

  return (
    <Modal title="Add schedule" footer={null} open={formOpen} closable={false}>
      <Form
        form={form}
        onFinish={handleSubmit}
        labelAlign="left"
        labelCol={{ span: 5, offset: 2 }}
        wrapperCol={{ span: 12, offset: 1 }}
      >
        <Form.Item name="label" label="Weekday" rules={[{ required: true }]}>
          <Select
            style={{ width: 120 }}
            options={[
              { value: "Monday", label: "Monday" },
              { value: "Tuesday", label: "Tuesday" },
              { value: "Wednesday", label: "Wednesday" },
              { value: "Thursday", label: "Thursday" },
              { value: "Friday", label: "Friday" },
              { value: "Sasturday", label: "Sasturday" },
              { value: "Sunday", label: "Sunday" },
            ]}
          />
        </Form.Item>
        <Form.Item name="shift" label="Shift" rules={[{ required: true }]}>
          <Select
            options={[
              { value: 1, label: "Shift 1" },
              { value: 2, label: "Shift 2" },
              { value: 3, label: "Shift 3" },
              { value: 4, label: "Shift 4" },
              { value: 5, label: "Shift 5" },
            ]}
          />
        </Form.Item>
        <Form.Item name="class" label="Class" rules={[{ required: true }]}>
          <Select
            options={datas.map((item: any) => ({
              value: item.className,
              label: item.className,
            }))}
          />
        </Form.Item>
        {currentClass && (
          <Form.Item
            name="teacherId"
            label="Teacher"
            initialValue={
              datas.find((item: any) => item.className === currentClass).teacher
                ?._id
            }
            rules={[{ required: true }]}
          >
            <Select
              defaultValue={
                datas.find((item: any) => item.className === currentClass)
                  .teacher?._id
              }
              options={teacher?.map((item: any) => ({
                value: item._id,
                label: item.fullName,
              }))}
            />
          </Form.Item>
        )}
        <Form.Item name="room" label="Room" rules={[{ required: true }]}>
          <Select
            options={rooms.map((item: any) => ({
              value: item.roomName,
              label: item.roomName,
            }))}
          />
        </Form.Item>
        <div className="flex justify-end gap-4">
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button onClick={() => dispatch(triggerForm())}>Cancel</Button>
        </div>
      </Form>
    </Modal>
  );
};

export default AddSchedule;

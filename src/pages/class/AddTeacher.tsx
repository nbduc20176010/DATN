"use client";

import React, { useEffect, useState } from "react";
import { Button, Popover } from "antd";
import { iTeacher } from "../../dtos/pageDto";
import { useAppDispatch } from "../../redux/store";
import { editClass } from "../../redux/adminSlice";
import api from "../../services/api";
import { PlusOutlined } from "@ant-design/icons";

export default function AddTeacher({ id }: any) {
    const [isOpen, setIsOpen] = useState(false);
    const [teacherList, setTeacherList] = useState<iTeacher[]>([]);
    const accessToken = localStorage.getItem("token");

    const dispatch = useAppDispatch();

    const addTeacherToClass = (teacher: iTeacher) => {
        dispatch(
            editClass({
                id: id,
                values: { teacher: teacher },
                token: `${accessToken}`,
            })
        );
        setIsOpen(false);
    };

    useEffect(() => {
        api.get("/admin/teacher", {
            headers: {
                authorization: `Bearer ${accessToken}`,
            },
        })
            .then((res) => setTeacherList(res.data))
            .catch((error) => console.log(error));
    }, [accessToken]);

    return (
        <Popover
            title="Teacher list"
            trigger="click"
            placement="bottomRight"
            open={isOpen}
            content={
                <>
                    <div className="flex flex-col gap-3 border-[1px] p-2 min-h-[150px] overflow-auto">
                        {teacherList?.map((item) => (
                            <div
                                key={item._id}
                                className="flex justify-around border-b-[1px]"
                            >
                                {item.fullName}{" "}
                                <Button
                                    className="flex justify-center items-center"
                                    size="small"
                                    shape="circle"
                                    onClick={() => addTeacherToClass(item)}
                                >
                                    <PlusOutlined />
                                </Button>
                            </div>
                        ))}
                    </div>
                    <Button className="mt-2" onClick={() => setIsOpen(false)}>
                        Cancel
                    </Button>
                </>
            }
        >
            <Button
                className="flex items-center"
                shape="round"
                type="primary"
                onClick={() => setIsOpen(!isOpen)}
            >
                Add/Change teacher
                <PlusOutlined />
            </Button>
        </Popover>
    );
}

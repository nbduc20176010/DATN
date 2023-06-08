import React, { useEffect, useState } from "react";

import { Button, Checkbox, Popover, Space } from "antd";
import { iStudent } from "../../dtos/pageDto";
import { useAppDispatch } from "../../redux/store";
import { editClass } from "../../redux/adminSlice";
import api from "../../services/api";
import { PlusOutlined } from "@ant-design/icons";

export default function AddStudent({
    id,
    classStudents,
}: {
    id: string;
    classStudents: iStudent[];
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [studentList, setStudentList] = useState<iStudent[]>([]);
    const [addedStudents, setAddedStudents] = useState<iStudent[]>([]);
    const accessToken = localStorage.getItem("token");

    const dispatch = useAppDispatch();

    const handlePickStudent = (value: iStudent) => {
        if (addedStudents.find((item) => item._id === value._id)) {
            setAddedStudents(
                addedStudents.filter((item) => item._id !== value._id)
            );
        } else {
            setAddedStudents([...addedStudents, value]);
        }
    };

    const handleAddStudent = () => {
        dispatch(
            editClass({
                id: id,
                values: { students: addedStudents },
                token: `${accessToken}`,
            })
        );
        setIsOpen(false);
    };

    useEffect(() => {
        api.get("/admin/student", {
            headers: {
                authorization: `Bearer ${accessToken}`,
            },
        })
            .then((res) => setStudentList(res.data))
            .catch((error) => console.log(error));
    }, [accessToken]);

    return (
        <Popover
            title="Student list"
            trigger="click"
            placement="bottomRight"
            open={isOpen}
            content={
                <>
                    <div className="flex flex-col gap-3 border-[1px] p-2 min-h-[150px] overflow-auto">
                        {studentList.map((item: any) => (
                            <div
                                key={item._id}
                                className="flex justify-around border-b-[1px]"
                            >
                                {item.fullName}{" "}
                                <Checkbox
                                    onChange={() => handlePickStudent(item)}
                                />
                            </div>
                        ))}
                    </div>
                    <Space size="small">
                        <Button
                            className="m-2"
                            shape="round"
                            onClick={handleAddStudent}
                        >
                            Add
                        </Button>
                        <Button
                            className="m-2"
                            shape="round"
                            onClick={() => setIsOpen(false)}
                        >
                            Cancel
                        </Button>
                    </Space>
                </>
            }
        >
            <Button
                className="flex items-center"
                shape="round"
                type="primary"
                onClick={() => setIsOpen(!isOpen)}
            >
                Add students
                <PlusOutlined />
            </Button>
        </Popover>
    );
}

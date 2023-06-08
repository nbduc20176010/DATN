import React from "react";

import { Avatar, Button, List, Popconfirm, Typography } from "antd";
import AddStudent from "./AddStudent";
import { iStudent } from "../../dtos/pageDto";
import { useAppDispatch } from "../../redux/store";
import { editClass } from "../../redux/adminSlice";

const { Title } = Typography;

export default function StudentList({
    id,
    students,
}: {
    id: string;
    students: iStudent[];
}) {
    const accessToken = localStorage.getItem("token");
    const dispatch = useAppDispatch();
    const handleDeleteStudent = (studentId: string) => {
        const newList = students.filter((item) => item._id !== studentId);
        dispatch(
            editClass({
                id: id,
                values: { students: newList },
                token: `${accessToken}`,
            })
        );
    };

    return (
        <div className="flex flex-col mt-10 gap-5">
            <div className="bg-gray-100 rounded-lg w-8/12 min-h-[150px] m-auto">
                <List
                    header={
                        <div className="flex justify-center relative">
                            <Title level={3}>Student list</Title>
                            <div className="absolute right-2">
                                <AddStudent id={id} classStudents={students} />
                            </div>
                        </div>
                    }
                    className="demo-loadmore-list"
                    itemLayout="horizontal"
                    dataSource={students}
                    renderItem={(item: any) => (
                        <List.Item
                            actions={[
                                <Popconfirm
                                    title="Are you sure?"
                                    onConfirm={() =>
                                        handleDeleteStudent(item._id)
                                    }
                                >
                                    <Button type="primary" shape="round">
                                        remove
                                    </Button>
                                </Popconfirm>,
                            ]}
                        >
                            <List.Item.Meta
                                className="px-4"
                                avatar={
                                    <Avatar
                                        src={`http://localhost:5000/${item.image.data}`}
                                    />
                                }
                                title={item.fullName}
                                description={
                                    <div className="flex gap-4">
                                        <p>Email: {item.email}</p>
                                        <p>Phone number: {item.phoneNumber}</p>
                                    </div>
                                }
                            />
                        </List.Item>
                    )}
                />
            </div>
        </div>
    );
}

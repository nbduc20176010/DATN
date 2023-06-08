import React from "react";

import { Layout, Typography } from "antd";
import StudentList from "./StudentList";
import { useAppSelector } from "../../redux/store";
import { useParams } from "react-router-dom";

const { Content } = Layout;
const { Title, Text, Paragraph } = Typography;

const TeacherClass = () => {
    const { id = "" } = useParams();
    const { classDetail } = useAppSelector((state) => state.admin);

    return (
        <div className=" w-[1024px] m-auto">
            <Layout className="bg-white">
                <Content className="p-10 min-h-400">
                    <div className="flex justify-between">
                        <div className="flex flex-col w-1/2">
                            <div className="text-center">
                                <Title level={3}>Class detail</Title>
                            </div>
                            <Text>
                                Class name:{" "}
                                <Text strong>{classDetail?.className}</Text>
                            </Text>
                            <Text>
                                Room: <Text strong>{classDetail?.room}</Text>
                            </Text>
                            <Text>
                                Number of students:{" "}
                                <Text strong>
                                    {classDetail?.numberOfStudents}
                                </Text>
                            </Text>
                            <div className="border-2 w-10/12 m-auto mt-5 p-4 rounded-md">
                                <Paragraph>{classDetail?.notes}</Paragraph>
                            </div>
                        </div>
                        <div className="flex flex-col w-1/2">
                            <div className="text-center">
                                <Title level={3}>Teacher information</Title>
                            </div>
                            {
                                <>
                                    <div className="flex justify-around">
                                        <div className="flex flex-col">
                                            <Text>
                                                Teacher:{" "}
                                                <Text strong>
                                                    {
                                                        classDetail?.teacher!
                                                            .fullName
                                                    }
                                                </Text>
                                            </Text>
                                            <Text>
                                                Email:{" "}
                                                <Text strong>
                                                    {
                                                        classDetail?.teacher!
                                                            .email
                                                    }
                                                </Text>
                                            </Text>
                                            <Text>
                                                Phone number:{" "}
                                                <Text strong>
                                                    {
                                                        classDetail?.teacher!
                                                            .phoneNumber
                                                    }
                                                </Text>
                                            </Text>
                                        </div>
                                        <img
                                            src={`http://localhost:5000/${classDetail?.teacher!.image.data}`}
                                            width={150}
                                            height={250}
                                            alt=""
                                        />
                                    </div>
                                </>
                            }
                        </div>
                    </div>
                    <StudentList id={id} students={classDetail?.students} />
                </Content>
            </Layout>
        </div>
    );
};

export default TeacherClass;

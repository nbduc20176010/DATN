import React from "react";

import { Button, Table, Tag, Popconfirm, Space } from "antd";
import Columns from "./columns";
import { useAppDispatch } from "../../redux/store";
import {
    setFormType,
    triggerStudentForm,
    triggerTeacherForm,
} from "../../redux/commonSlice";
import {
    CheckOutlined,
    ClearOutlined,
    EditOutlined,
    UndoOutlined,
} from "@ant-design/icons";
import { deleteStudent, deleteTeacher } from "../../redux/adminSlice";
import { Link } from "react-router-dom";

const CustomTable = ({ data, columns, form }: any) => {
    const accessToken = localStorage.getItem("token");
    const dispatch = useAppDispatch();

    const handleOpenForm = (values: any) => {
        dispatch(setFormType("edit"));
        form.setFieldsValue(values);
        switch (columns) {
            case "teacher":
                dispatch(triggerTeacherForm());
                break;
            case "student":
                dispatch(triggerStudentForm());
                break;
            default:
                break;
        }
    };

    const teacherColumns = [
        ...Columns.TEACHER_COLUMNS,
        {
            title: "Gender",
            dataIndex: "sex",
            key: "sex",
            render: (_: any, { sex }: any) => (
                <>
                    {sex === "male" ? (
                        <Tag color="green" key="male">
                            Male
                        </Tag>
                    ) : (
                        <Tag color="volcano" key="female">
                            Female
                        </Tag>
                    )}
                </>
            ),
        },
        {
            title: "Actions",
            key: "actions",
            render: (_: any, record: any) => (
                <Space size="small">
                    <Button
                        type="primary"
                        onClick={() => handleOpenForm(record)}
                        className="flex items-center"
                    >
                        <EditOutlined />
                    </Button>
                    <Popconfirm
                        title="Are you sure to delete?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() =>
                            dispatch(
                                deleteTeacher({
                                    _id: record._id,
                                    token: `${accessToken}`,
                                })
                            )
                        }
                    >
                        <Button className="flex items-center" danger>
                            <ClearOutlined />
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    const studentColumns = [
        ...Columns.STUDENT_COLUMNS,
        {
            title: "Gender",
            dataIndex: "sex",
            key: "sex",
            render: (_: any, { sex }: any) => (
                <>
                    {sex === "male" ? (
                        <Tag color="green" key="male">
                            Male
                        </Tag>
                    ) : (
                        <Tag color="volcano" key="female">
                            Female
                        </Tag>
                    )}
                </>
            ),
        },
        {
            title: "Actions",
            key: "actions",
            render: (_: any, record: any) => (
                <Space size="small">
                    <Button
                        type="primary"
                        className="flex items-center"
                        onClick={() => handleOpenForm(record)}
                    >
                        <EditOutlined />
                    </Button>
                    <Popconfirm
                        title="Are you sure to delete?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() =>
                            dispatch(
                                deleteStudent({
                                    _id: record._id,
                                    token: `${accessToken}`,
                                })
                            )
                        }
                    >
                        <Button className="flex items-center" danger>
                            <ClearOutlined />
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    const classColumns = [
        ...Columns.CLASS_COLUMNS,
        {
            title: "Teacher",
            dataIndex: "teacher",
            key: "teacher",
            render: (_: any, { fullName }: any) => fullName,
        },
        {
            title: "Detail",
            key: "detail",
            render: (_: any, { _id }: any) => (
                <Link to={`../class/${_id}`}>Visit</Link>
            ),
        },
    ];

    const getColumns = () => {
        switch (columns) {
            case "teacher":
                return teacherColumns;
            case "student":
                return studentColumns;
            case "class":
                return classColumns;
            default:
                return teacherColumns;
        }
    };

    return (
        <Table
            size="small"
            dataSource={data}
            columns={getColumns()}
            expandable={{
                rowExpandable: () => columns !== "class",
                expandedRowRender: (record: any) => (
                    <Space>
                        {record.image && (
                            <img
                                src={`http://localhost:5000/${record.image.data}`}
                                width={100}
                                height={100}
                                alt={record.image}
                            />
                        )}
                        <div>
                            <p style={{ margin: 0 }}>Email: {record.email}</p>
                            <p style={{ margin: 0 }}>
                                Phone number: {record.phoneNumber}
                            </p>
                            {record.salary && (
                                <p style={{ margin: 0 }}>
                                    Salary: {record.salary} $
                                </p>
                            )}
                            {record.tution && (
                                <p style={{ margin: 0 }}>
                                    Tution fee: {record.tution} -{" "}
                                    {record.isPaid ? (
                                        <CheckOutlined color="green" />
                                    ) : (
                                        <UndoOutlined color="volcano" />
                                    )}
                                </p>
                            )}
                        </div>
                    </Space>
                ),
            }}
            rowKey={(record: any) => record._id}
        />
    );
};

export default CustomTable;

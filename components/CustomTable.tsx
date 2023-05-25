"use client";

import { CheckOutlined, UndoOutlined } from "@ant-design/icons";
import { Button, Table, Tag, Popconfirm } from "antd";

export default function CustomTable({ data, columns }: any) {
    const teacherColumns = [
        {
            title: "Name",
            dataIndex: "fullName",
            key: "fullName",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Phone number",
            dataIndex: "phoneNumber",
            key: "phoneNumber",
        },
        {
            title: "Age",
            dataIndex: "age",
            key: "age",
        },
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
            render: () => (
                <>
                    <Button type="primary">Edit</Button>
                    <Popconfirm
                        title="Are you sure to delete?"
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button danger>Delete</Button>
                    </Popconfirm>
                </>
            ),
        },
    ];

    const studentColumns = [
        {
            title: "Name",
            dataIndex: "fullName",
            key: "fullName",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Age",
            dataIndex: "age",
            key: "age",
        },
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
            title: "Class",
            dataIndex: "belongToClass",
            key: "belongToClass",
        },
        {
            title: "Actions",
            key: "actions",
            render: () => (
                <>
                    <Button type="primary">Edit</Button>
                    <Popconfirm
                        title="Are you sure to delete?"
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button danger>Delete</Button>
                    </Popconfirm>
                </>
            ),
        },
    ];
    return (
        <div>
            <div className="flex justify-end m-2">
                <Button>Add</Button>
            </div>
            <Table
                dataSource={data}
                columns={
                    columns === "teacher" ? teacherColumns : studentColumns
                }
                expandable={{
                    expandedRowRender: (record) => (
                        <>
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
                        </>
                    ),
                }}
                rowKey={(record) => record._id}
            />
        </div>
    );
}

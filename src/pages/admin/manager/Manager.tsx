import React, { useEffect, useState } from "react";

import { Button, Form, Layout, Menu, MenuProps } from "antd";
import {
    HomeOutlined,
    TeamOutlined,
    UserOutlined,
} from "@ant-design/icons";
import ClassForm from "./ClassForm";
import TeacherForm from "./TeacherForm";
import StudentForm from "./StudentForm";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import {
    setFormType,
    triggerClassForm,
    triggerStudentForm,
    triggerTeacherForm,
} from "../../../redux/commonSlice";
import CustomTable from "../../../components/table/CustomTable";
import CustomBreadcrumb from "../../../components/CustomBreadcrumb";
import { fetchDatas } from "../../../redux/adminSlice";

const { Content, Sider } = Layout;

const AdminManager = () => {
    const [selected, setSelected] = useState("teacher");
    const accessToken = localStorage.getItem("token");
    const [form] = Form.useForm();
    const dispatch = useAppDispatch();
    const { datas } = useAppSelector((state) => state.admin);

    const items: MenuProps["items"] = [
        {
            label: "Teachers",
            key: "teacher",
            icon: <TeamOutlined />,
        },
        {
            label: "Students",
            key: "student",
            icon: <UserOutlined />,
        },
        {
            label: "Classes",
            key: "class",
            icon: <HomeOutlined />,
        },
    ];

    const breads = ["Admin", "Manager", selected];

    const handleChangeTable = (key: string) => {
        switch (key) {
            case "teacher":
                setSelected(key);
                break;
            case "student":
                setSelected(key);
                break;
            case "class":
                setSelected(key);
                break;
            default:
                setSelected(key);
                break;
        }
    };

    const handleOpenForm = (type: "add" | "edit") => {
        dispatch(setFormType(type));
        form.resetFields();
        switch (selected) {
            case "teacher":
                dispatch(triggerTeacherForm());
                break;
            case "student":
                dispatch(triggerStudentForm());
                break;
            case "class":
                dispatch(triggerClassForm());
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        dispatch(fetchDatas({ key: selected, token: accessToken }));
    }, [dispatch, selected, accessToken]);

    return (
        <Layout>
            <Content>
                <Layout
                    style={{
                        padding: "24px 50px",
                        minWidth: "1024px",
                        margin: "auto",
                    }}
                >
                    <Sider style={{ background: "#fff" }} width={200}>
                        <Menu
                            mode="inline"
                            style={{ height: "100%" }}
                            defaultSelectedKeys={[selected]}
                            items={items}
                            onClick={({ key }: any) => handleChangeTable(key)}
                        />
                    </Sider>
                    <Content style={{ padding: "0 24px", minHeight: 280 }}>
                        <CustomBreadcrumb breads={breads} />
                        <div className="m-auto">
                            <div className="flex justify-end m-4">
                                <Button
                                    type="primary"
                                    onClick={() => handleOpenForm("add")}
                                >
                                    Add
                                </Button>
                            </div>
                            {selected === "class" ? (
                                <ClassForm form={form} />
                            ) : selected === "teacher" ? (
                                <TeacherForm form={form} />
                            ) : (
                                <StudentForm form={form} />
                            )}
                            <CustomTable
                                form={form}
                                data={datas}
                                columns={selected}
                            />
                        </div>
                    </Content>
                </Layout>
            </Content>
        </Layout>
    );
};

export default AdminManager;

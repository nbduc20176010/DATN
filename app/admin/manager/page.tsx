"use client";

import { Layout, Menu, MenuProps, Spin } from "antd";
import {
    CalendarOutlined,
    HomeOutlined,
    TeamOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@redux/store";
import { fetchDatas } from "@redux/adminSlice";
import { getCookie } from "cookies-next";
import dynamic from "next/dynamic";
import FormSkeleton from "@components/FormSkeleton";

const { Sider, Content } = Layout;

const Breadcrumbs = dynamic(() => import("@components/CustomBreadscumb"), {
    loading: () => <Spin />,
});

const Tables = dynamic(() => import("@components/CustomTable"), {
    loading: () => <FormSkeleton />,
});

const AdminManagerPage = () => {
    const [selected, setselected] = useState("teacher");
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
        {
            label: "Calendar",
            key: "calendar",
            icon: <CalendarOutlined />,
        },
    ];

    const breads = ["Admin", "Manager", selected];

    const handleChangeTable = (key: string) => {
        switch (key) {
            case "teacher":
                setselected(key);
                break;

            case "student":
                setselected(key);
                break;

            default:
                setselected(key);
                break;
        }
    };

    useEffect(() => {
        dispatch(
            fetchDatas({ key: selected, token: `${getCookie("user-token")}` })
        );
    }, [selected]);

    return (
        <Layout>
            <Content style={{ padding: "0 50px" }}>
                <Layout style={{ padding: "24px 0", background: "#fff" }}>
                    <Sider style={{ background: "#fff" }} width={200}>
                        <Menu
                            mode="inline"
                            style={{ height: "100%" }}
                            defaultSelectedKeys={[selected]}
                            items={items}
                            onClick={({ key }) => handleChangeTable(key)}
                        />
                    </Sider>
                    <Content style={{ padding: "0 24px", minHeight: 280 }}>
                        <Breadcrumbs breads={breads} />
                        <Tables data={datas} columns={selected} />
                    </Content>
                </Layout>
            </Content>
        </Layout>
    );
};

export default AdminManagerPage;

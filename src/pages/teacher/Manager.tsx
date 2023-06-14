import React, { useState } from "react";

import { Layout, Menu, MenuProps } from "antd";
import { ApartmentOutlined, UserOutlined } from "@ant-design/icons";
import Custombreadcrumb from "../../components/CustomBreadcrumb";
import Profile from "./Profile";
import TeacherClass from "./TeacherClassList";

const { Content, Sider } = Layout;

type Props = {};

const TeacherManager = (props: Props) => {
  const [selected, setSelected] = useState("profile");
  const items: MenuProps["items"] = [
    {
      label: "Profile",
      key: "profile",
      icon: <UserOutlined />,
    },
    {
      label: "Classes",
      key: "class",
      icon: <ApartmentOutlined />,
    },
  ];

  const breads = ["Teacher", "Manager", selected];

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
  return (
    <Layout>
      <Content>
        <Layout
          style={{
            padding: "24px 50px",
            width: "1024px",
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
            <Custombreadcrumb breads={breads} />
            {selected === "profile" ? <Profile /> : <TeacherClass />}
          </Content>
        </Layout>
      </Content>
    </Layout>
  );
};

export default TeacherManager;

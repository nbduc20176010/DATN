import React, { useEffect, useState } from "react";

import { Layout, Menu, MenuProps } from "antd";
import { useAppDispatch } from "../../redux/store";
import { fetchStudentSchedule } from "../../redux/studentSlice";
import {
  ApartmentOutlined,
  CalendarOutlined,
  CheckOutlined,
  MailOutlined,
  UserOutlined,
} from "@ant-design/icons";
import StudentSchedule from "./StudentSchedule";
import StudentInformation from "./StudentInformation";
import StudentRequestList from "./RequestList";
import StudentClasses from "./StudentClasses";

const { Content, Sider } = Layout;

type Props = {};

const StudentDashboard = (props: Props) => {
  const [selected, setSelected] = useState("schedule");
  const dispatch = useAppDispatch();
  const accessToken = localStorage.getItem("token");

  const items: MenuProps["items"] = [
    {
      label: "Schedule",
      key: "schedule",
      icon: <CalendarOutlined />,
    },
    {
      label: "Information",
      key: "information",
      icon: <UserOutlined />,
    },
    {
      label: "Requests",
      key: "requests",
      icon: <MailOutlined />,
    },
    {
      label: "Classes",
      key: "classes",
      icon: <ApartmentOutlined />,
    },
  ];

  const handleChangeTable = (key: string) => {
    switch (key) {
      case "schedule":
        setSelected(key);
        break;
      case "student":
        setSelected(key);
        break;
      case "request":
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

  useEffect(() => {
    dispatch(fetchStudentSchedule({ token: accessToken }));
  }, [dispatch, accessToken]);

  return (
    <Layout>
      <Content>
        <Layout>
          <Sider width={200} theme="light" className="bg-white">
            <Menu
              mode="inline"
              style={{ height: "100%" }}
              defaultSelectedKeys={[selected]}
              items={items}
              onClick={({ key }: any) => handleChangeTable(key)}
            />
          </Sider>
          <Content
            style={{ padding: "24px", minHeight: 280, overflowX: "scroll" }}
          >
            {selected === "schedule" ? (
              <StudentSchedule />
            ) : selected === "information" ? (
              <StudentInformation />
            ) : selected === "requests" ? (
              <StudentRequestList />
            ) : selected === "classes" ? (
              <StudentClasses />
            ) : (
              <></>
            )}
          </Content>
        </Layout>
      </Content>
    </Layout>
  );
};

export default StudentDashboard;

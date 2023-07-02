import React, { useEffect, useState } from "react";

import { Button, Layout, Menu, MenuProps, Space, Table, Tag } from "antd";
import Custombreadcrumb from "../../../components/CustomBreadcrumb";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { ColumnsType } from "antd/es/table";
import {
  approveRequest,
  approveStudentRequest,
  declineRequest,
  fetchRequests,
} from "../../../redux/adminSlice";

const { Content, Sider } = Layout;

type Props = {};

type DataType = {
  notes: string;
  status: string;
  body: any;
  sendDate: string;
  sendBy: string;
};

const RequestList = (props: Props) => {
  const [selected, setSelected] = useState("All");
  const { requests } = useAppSelector((state) => state.admin);
  const dispatch = useAppDispatch();
  const accessToken = localStorage.getItem("token");

  const items: MenuProps["items"] = [
    {
      label: "All",
      key: "All",
    },
    {
      label: "Approved",
      key: "Approved",
    },
    {
      label: "Declined",
      key: "Declined",
    },
    {
      label: "Pending",
      key: "Pending",
    },
  ];

  const handleApproveRequest = (request: any) => {
    request.requestFrom === "teacher"
      ? dispatch(approveRequest({ request, token: accessToken }))
      : dispatch(approveStudentRequest({ request, token: accessToken }));
  };

  const handleDecline = (request: any) => {
    dispatch(declineRequest({ id: request._id, token: accessToken }));
  };

  const handleChangeTable = (key: string) => {
    setSelected(key);
  };

  const columns: ColumnsType<DataType> = [
    { title: "Notes", dataIndex: "notes", key: "notes" },
    { title: "Category", dataIndex: "category", key: "category" },
    { title: "Send date", dataIndex: "sendDate", key: "sendDate" },
    { title: "Send by", dataIndex: "sendBy", key: "sendBy" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_, record) => (
        <>
          {" "}
          <Tag
            color={
              record.status === "Pending"
                ? "blue"
                : record.status === "Approved"
                ? "green"
                : "red"
            }
          >
            {record.status}
          </Tag>
        </>
      ),
    },
    {
      title: "Actions",
      render: (_, record) => (
        <Space size="small">
          <Button
            disabled={record.status !== "Pending"}
            type="primary"
            size="small"
            onClick={() => handleApproveRequest(record)}
          >
            Approve
          </Button>
          <Button
            onClick={() => handleDecline(record)}
            disabled={record.status !== "Pending"}
            danger
            size="small"
          >
            Decline
          </Button>
        </Space>
      ),
      key: "actions",
    },
  ];

  useEffect(() => {
    dispatch(fetchRequests({ token: accessToken!, status: selected }));
  }, [accessToken, dispatch, selected]);

  return (
    <Layout className="h-full">
      <Sider
        theme="light"
        className="overflow-hidden rounded-xl my-6"
        width={240}
      >
        <Menu
          mode="inline"
          defaultSelectedKeys={[selected]}
          items={items}
          className="overflow-auto"
          onClick={({ key }: any) => handleChangeTable(key)}
        />
      </Sider>
      <Content className="p-6 min-h-[280px]">
        <Custombreadcrumb breads={["admin", "request"]} />
        <Table
          columns={columns}
          dataSource={requests}
          rowKey="_id"
          className="overflow-auto bg-white"
          expandable={{
            expandedRowRender: (record) => (
              <>
                {Object.keys(record?.body).map((item) => (
                  <p>
                    {item}: {record.body[item]}
                  </p>
                ))}
              </>
            ),
          }}
        />
      </Content>
    </Layout>
  );
};

export default RequestList;

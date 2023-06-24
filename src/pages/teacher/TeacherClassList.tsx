import React, { useEffect } from "react";

import { Layout } from "antd";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import CustomTable from "../../components/table/CustomTable";
import { fetchClasses } from "../../redux/teacherSlice";

const { Content } = Layout;

const TeacherClassList = () => {
  const { datas } = useAppSelector((state) => state.teacher);
  const accessToken = localStorage.getItem("token");
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchClasses(`${accessToken}`));
  }, [dispatch, accessToken]);

  return (
    <div className="m-auto">
      <Layout className="bg-white">
        <Content className="p-10 min-h-400">
          <CustomTable data={datas} columns="class" />
        </Content>
      </Layout>
    </div>
  );
};

export default TeacherClassList;

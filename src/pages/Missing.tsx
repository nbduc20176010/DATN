import React from "react";
import Header from "../components/header/Header";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { LeftOutlined } from "@ant-design/icons";

type Props = {};

const Missing = (props: Props) => {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col">
      <Header currentUser={""} />
      <div className="bg-white w-full grow mx-auto flex relative">
        <div className="absolute top-10 left-10">
          <Button
            type="primary"
            className="flex items-center text-xl font-bold"
            onClick={() => navigate(-1)}
          >
            <LeftOutlined />
            <span className="hover:underline">Back</span>
          </Button>
        </div>
        <div className="bg-[url('./assets/404.jpg')] w-[40rem] h-[40rem] m-auto bg-no-repeat bg-contain"></div>
      </div>
    </div>
  );
};

export default Missing;

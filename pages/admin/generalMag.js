import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Tabs } from "antd";
import {
  EyeOutlined,
  SettingOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import GeneralMagTab2 from "../components/GeneralMagTab2";
import GeneralMagTab1 from "../components/GeneralMagTab1";

export default function GeneralMag() {
  const onChange = (key) => {
    //console.log(key);
  };
  const items = [
    {
      key: "1",
      label: `จัดการข้อมูลสถานประกอบการ`,
      children: <GeneralMagTab1 />,
    },
    {
      key: "2",
      label: `จัดการข้อมูลสาขาวิชา`,
      children: <GeneralMagTab2 />,
    },
  ];

  return (
    <>
      <Navbar />
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            General Management
          </h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 ">
          <Tabs
            key={"1"}
            defaultActiveKey="1"
            items={items}
            onChange={onChange}
          />
        </div>
      </main>
    </>
  );
}

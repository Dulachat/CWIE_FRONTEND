import React from "react";
import { Card, Col, Row } from "antd";
import { UsergroupAddOutlined } from "@ant-design/icons";
import StudentNavbar from "../Components/StudentNavbar";
import FormAddMaps from "../Components/FormAddMaps";
import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axios";

export default function AddMap() {
  const [dataStore, setDataStore] = useState();
  const [data, setData] = useState();
  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored === null) {
      router.push("/auth/login");
      return;
    }
    setDataStore(stored ? JSON.parse(stored) : null);
  }, []);
  useEffect(() => {
    if (dataStore === undefined) return;
    assessment(dataStore.data.id);
  }, [dataStore]);

  const assessment = async (id) => {
    const res = await axiosInstance.get(`/assessment/detail/${id}`);
    setData(res.data);
  };

  return (
    <div>
      <StudentNavbar />
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
          <h3 className=" text-xl font-bold  tracking-tight text-gray-900 inline">
            {" "}
            เพิ่มแผนที่ สำหรับสถานประกอบการ {data?.JoinCompany?.company_name}
          </h3>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <Card>
            <FormAddMaps data={data} />
          </Card>
        </div>
      </main>
    </div>
  );
}

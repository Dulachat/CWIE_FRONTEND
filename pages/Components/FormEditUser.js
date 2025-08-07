import React, { useEffect, useState } from "react";
import {
  Space,
  Table,
  Tag,
  Button,
  Modal,
  Form,
  Input,
  Select,
  message,
} from "antd";
import axiosInstance from "../../utils/axios";
import { useRouter } from "next/router";

const size = "large";
export default function FormEditUser(props) {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState(null);
  const [branchData, setBranchData] = useState([]);
  const [userLevelData, setUserLevel] = useState([]);
  const [companyData, setCompanyData] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [selectChangeBranch, setSelectChangeBranch] = useState();
  const [selectChangeCompany, setSelectChangeCompany] = useState();
  const [item, setItem] = useState([props.data]);

  useEffect(() => {
    setItem(props.data);
  }, [props.data]);
  const optionLevel = item.user_level_id;
  useEffect(() => {
    setSelectedOption(optionLevel);
    if (item.branchJoinUser === null) {
      setSelectChangeBranch("ไม่มีสาขาวิชา");
    }
    if (item.branchJoinUser != null) {
      setSelectChangeBranch(item.branchJoinUser.id);
    }
    if (item.companyJoin === null) {
      setSelectChangeCompany("ไม่มีสถานประกอบการ");
    }
    if (item.companyJoin != null) {
      setSelectChangeCompany(item.companyJoin.company_name);
    }
  }, [optionLevel]);
  const messageError = () => {
    messageApi.open({
      type: "error",
      content: "มีข้อมูลนี้แล้ว",
    });
  };
  const messageSuccess = () => {
    messageApi.open({
      type: "success",
      content: "แก้ไขข้อมูลเรียบร้อย",
    });

    router.push({
      pathname: "/admin/userMag",
      query: { reload: 1 },
    });
  };

  useEffect(() => {
    axiosInstance.get("branch/allBranch").then(function (response) {
      setBranchData(response.data);
    });
  }, []);

  useEffect(() => {
    axiosInstance.get("company/allCompany").then(function (response) {
      setCompanyData(response.data);
    });
  }, []);

  useEffect(() => {
    axiosInstance.get("usersLevel/all").then(function (response) {
      setUserLevel(response.data);
    });
  }, []);

  const handleChange = (value) => {
    if (value === 2) {
      setSelectedOption(value);
    }
    if (value === 3) {
      setSelectedOption(value);
    } else {
      setSelectedOption(value);
    }
  };

  const sendData = (value) => {
    const axios = require("axios");
    let data = JSON.stringify({
      username: value.username,
      fname_TH: value.fname_TH,
      lname_TH: value.lname_TH,
      fname_EN: value.fname_EN,
      lname_EN: value.lname_EN,
      branch_id: value.branch_id,
      company_id: value.company_id,
      user_level_id: value.user_level_id,
    });
    let config = {
      method: "patch",
      maxBodyLength: Infinity,
      url: process.env.NEXT_PUBLIC_API_URL + "users/updateUsers/"+item.id,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    axios
      .request(config)
      .then((response) => {
        if (response.data === "error") {
          {
            messageError();
          }
        }
        if (response.data === "success") {
          {
            messageSuccess();
          }
        }
      })
      .catch((error) => console.log(error));
  };
  return (
    <>
      {contextHolder}
      <Form layout="inline" name="EditUser" onFinish={sendData} key={item.id}>
        <div className="w-full mt-2">
          <label className="block mb-2 text-sm font-medium text-gray-900  dark:text-white">
            {" "}
            Username
            <Form.Item
              name={"username"}
              initialValue={item.username}
              rules={[{ required: true, message: "กรุณากรอก Username" }]}
            >
              <Input
                value={item.username}
                disabled={true}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </Form.Item>
          </label>
        </div>

        <div className=" w-1/2  mt-2 ">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            ชื่อภาษาไทย
            <Form.Item
              initialValue={item.fname_TH}
              name={"fname_TH"}
              rules={[{ required: true, message: "กรุณากรอกชื่อ" }]}
            >
              <Input
                value={item.fname_TH}
                className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </Form.Item>
          </label>
        </div>
        <div className="w-1/2 mt-2 ">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            นามสกุลภาษาไทย
            <Form.Item
              initialValue={item.lname_TH}
              name={"lname_TH"}
              rules={[{ required: true, message: "กรุณากรอกนามสกุล" }]}
            >
              <Input
                value={item.lname_TH}
                className=" justify-self-end bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </Form.Item>
          </label>
        </div>
        <div className=" w-1/2  mt-2 ">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            ชื่อภาษาอังกฤษ
            <Form.Item
              initialValue={item.fname_EN}
              name={"fname_EN"}
              rules={[{ required: true, message: "กรุณากรอกชื่อ" }]}
            >
              <Input
                value={item.fname_TH}
                className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </Form.Item>
          </label>
        </div>
        <div className="w-1/2 mt-2 ">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            นามสกุลภาษาอังกฤษ
            <Form.Item
              initialValue={item.lname_EN}
              name={"lname_EN"}
              rules={[{ required: true, message: "กรุณากรอกนามสกุล" }]}
            >
              <Input
                value={item.lname_TH}
                className=" justify-self-end bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </Form.Item>
          </label>
        </div>
        <div className="w-1/2 mt-2 ">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            ระดับผู้ใช้งาน
            <Form.Item
              name={"user_level_id"}
              initialValue={item.user_level_id}
              rules={[{ required: true, message: "กรุณาเลือกระดับผู้ใช้งาน" }]}
            >
              <Select
                size={size}
                defaultValue={"เลือกระดับผู้ใช้งาน"}
                onChange={handleChange}
              >
                {userLevelData.map((data) => (
                  <Select.Option key={data.id} value={data.id}>
                    {data.level_name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </label>
        </div>
        {selectedOption === 2 && (
          <div className="w-1/2 mt-2 ">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              สาขาวิชา
              <Form.Item
                name={"branch_id"}
                key={selectedOption}
                initialValue={selectChangeBranch}
                rules={[{ required: true, message: "กรุณาเลือกสาขาวิชา" }]}
              >
                <Select size={size} defaultValue={"เลือกสาขาวิชา"}>
                  {branchData.map((data) => (
                    <Select.Option key={data.id} value={data.id}>
                      {data.branch_name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </label>
          </div>
        )}

        {selectedOption === 3 && (
          <div className="w-1/2 mt-2 ">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              สถานประกอบการ
              <Form.Item
                name={"company_id"}
                key={selectedOption}
                initialValue={selectChangeCompany}
                rules={[{ required: true, message: "กรุณาเลือกสถานประกอบการ" }]}
              >
                <Select size={size} defaultValue={"เลือกสถานประกอบการ"}>
                  {companyData.map((data) => (
                    <Select.Option key={data.id} value={data.id}>
                      {data.company_name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </label>
          </div>
        )}
        <div className="w-full mt-5 ">
          <Form.Item>
            <Button
              htmlType="submit"
              className=" text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
              block
              size={size}
            >
              บันทึกข้อมูล
            </Button>
          </Form.Item>
        </div>
      </Form>
    </>
  );
}

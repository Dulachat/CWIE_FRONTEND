import React, { useEffect, useState } from "react";
import { Card, Form, Input, Button, Select, message } from "antd";
import { useRouter } from "next/router";
import axiosInstance from "../../utils/axios";
import Link from "next/link";
function FormRegister() {
  const size = "large";
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();
  const [branchData, setBranchData] = useState([]);

  useEffect(() => {
    axiosInstance.get("branch/allBranch").then(function (response) {
      setBranchData(response.data);
    });
  }, []);
  const sendData = (data) => {
    var axios = require("axios");
    var data = JSON.stringify({
      branch_id: data.branch_id,
      email: data.email,
      fname_TH: data.fname_TH,
      lname_TH: data.lname_TH,
      pwd: data.pwd,
      student_group: data.student_group,
      student_id: data.student_id,
      title_name: data.title_name,
      tel: data.tel,
      username: data.username,
      intern_status: data.intern_status,
      year_class: data.year_class,
    });

    var config = {
      method: "post",
      maxBodyLength: Infinity,
      url: process.env.NEXT_PUBLIC_API_URL + "student/register",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (res) {
        console.log(res);
        if (res.data === "success") {
          messageApi.open({
            type: "success",
            content: "สมัครใช้งานเรียบร้อย",
          });
        } else {
          messageApi.open({
            type: "error",
            content: "มีข้อมูลนี้แล้ว",
          });
        }

        setTimeout(() => {
          router.push({
            pathname: "/auth/login",
          });
        }, 2000);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
      {contextHolder}
      <Form layout="inline" name="registerForm" onFinish={sendData}>
        <div className="w-full mt-2">
          <lable className="block mb-2 text-sm font-medium text-gray-900  dark:text-white">
            {" "}
            Username
            {
              <span className=" text-red-600">{"<อีเมล์มหาวิทยาลัย>"}</span>
            }{" "}
          </lable>
          <Form.Item
            name={"username"}
            rules={[
              { required: true, message: "กรุณากรอก Username" },
              {
                pattern: "^sb[0-9]{10}@lru.ac.th$",
                message: "กรุณากรอกอีเมล์มหาวิทยาลัย",
                min: 22,
              },
            ]}
          >
            <Input
              placeholder="sbรหัสนักศึกษา@lru.ac.th"
              maxLength={22}
              type={"email"}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </Form.Item>
        </div>

        <div className="w-full mt-2 ">
          <lable className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            {" "}
            Password{" "}
          </lable>
          <Form.Item
            name={"pwd"}
            rules={[{ required: true, message: "กรุณากรอก Password" }]}
          >
            <Input.Password size={size} />
          </Form.Item>
        </div>
        <div className="w-full mt-2 ">
          <lable className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            รหัสนักศึกษา
          </lable>
          <Form.Item
            name={"student_id"}
            rules={[
              { required: true, message: "กรุณากรอกรหัสนักศึกษา" },
              {
                pattern: "[0-9]{10}",
                message: "กรอกข้อมูลให้ถูกต้อง",
                min: 10,
              },
            ]}
          >
            <Input
              maxLength={10}
              className="  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </Form.Item>
        </div>
        <div className=" w-1/4  mt-2">
          <lable className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            คำนำหน้าชื่อ
          </lable>
          <Form.Item
            name={"title_name"}
            rules={[{ required: true, message: "กรุณาเลือกคำนำหน้าชื่อ" }]}
          >
            <Select size={size} defaultValue={"เลือกคำนำหน้าชื่อ"}>
              <Select.Option value="นาย">นาย</Select.Option>
              <Select.Option value="นาง">นาง</Select.Option>
              <Select.Option value="นางสาว">นางสาว</Select.Option>
            </Select>
          </Form.Item>
        </div>
        <div className=" w-1/4  mt-2 ">
          <lable className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            ชื่อภาษาไทย
          </lable>
          <Form.Item
            name={"fname_TH"}
            rules={[
              { required: true, message: "กรุณากรอกชื่อ" },
              {
                pattern: "^[ก-๏s]+$",
                message: "กรอกข้อมูลเป็นภาษาไทยเท่านั้น",
              },
            ]}
          >
            <Input
              pattern="^[ก-๏\s]+$"
              className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </Form.Item>
        </div>
        <div className="w-1/2 mt-2 ">
          <lable className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            นามสกุลภาษาไทย
          </lable>
          <Form.Item
            name={"lname_TH"}
            rules={[
              { required: true, message: "กรุณากรอกนามสกุล" },
              {
                pattern: "^[ก-๏s]+$",
                message: "กรอกข้อมูลเป็นภาษาไทยเท่านั้น",
              },
            ]}
          >
            <Input className=" justify-self-end bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
          </Form.Item>
        </div>

        <div className="w-1/4 mt-2 ">
          <lable className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            หมู่เรียน
          </lable>
          <Form.Item
            name={"student_group"}
            rules={[{ required: true, message: "กรุณากรอกหมู่เรียน" }]}
          >
            <Input
              maxLength={8}
              className="  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </Form.Item>
        </div>
        <div className="w-1/4 mt-2 ">
          <lable className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            ชั้นปี
          </lable>
          <Form.Item
            name={"year_class"}
            rules={[{ required: true, message: "กรุณาเลือกชั้นปี" }]}
            initialValue={"1"}
          >
            <Select size={size}>
              <Select.Option value={"1"}>ชั้นปี ที่1</Select.Option>
              <Select.Option value={"2"}>ชั้นปี ที่2</Select.Option>
              <Select.Option value={"3"}>ชั้นปี ที่3</Select.Option>
              <Select.Option value={"4"}>ชั้นปี ที่4</Select.Option>
            </Select>
          </Form.Item>
        </div>
        <div className="w-1/2 mt-2 ">
          <lable className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            สาขาวิชา
          </lable>
          <Form.Item
            name={"branch_id"}
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
        </div>

        <div className="w-1/2 mt-2 ">
          <lable className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            เบอร์โทรศัพท์
          </lable>
          <Form.Item
            name={"tel"}
            rules={[
              { required: true, message: "กรุณากรอกเบอร์โทรศัพท์" },
              { pattern: "[0-9]{10}", message: "กรุณากรอกข้อมูลให้ถูกต้อง" },
            ]}
          >
            <Input className="  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
          </Form.Item>
        </div>
        <div className="w-1/2 mt-2 ">
          <lable className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            อีเมล์
          </lable>
          <Form.Item
            name={"email"}
            rules={[{ required: true, message: "กรุณากรอก E-mail" }]}
          >
            <Input
              type="email"
              className="  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </Form.Item>
        </div>

        <div className="w-full mt-5 ">
          <Form.Item>
            <Button
              className=" text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
              htmlType="submit"
              block
              size={size}
            >
              บันทึกข้อมูล
            </Button>
          </Form.Item>
        </div>
        <div>
          <p>
            ฉันมีบัญชีผู้ใช้แล้ว?{" "}
            <Link className=" font-bold" href="/auth/login">
              {" "}
              เข้าสู่ระบบ
            </Link>
          </p>
        </div>
      </Form>
    </>
  );
}

export default FormRegister;

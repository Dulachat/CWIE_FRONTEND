import React, { useEffect, useState } from "react";
import { Button, Form, Input, Select, message,Image } from "antd";
import { useRouter } from "next/router";
import axiosInstance from "../../utils/axios";
const size = "large";
const FormEditStudent = (props) => {
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();
  const [branchData, setBranchData] = useState([]);
  const [item, setItem] = useState([]);
  const [itemAddress, setItemAddress] = useState([]);
  useEffect(() => {
    setItem(props.data);
    setItemAddress(props.dataAddress);
  }, [props]);

  useEffect(() => {
    axiosInstance.get("branch/allBranch").then(function (response) {
      setBranchData(response.data);
    });
  }, []);
  const messageUp = () => {
    messageApi.open({
      type: "success",
      content: "แก้ไขข้อมูลเรียบร้อย",
    });
    setTimeout(() => {
      router.push({
        pathname: "/admin/studentMag",
        query: { reload: 1 },
      });
    }, 500);
  };
  const sendEdit = (data) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      address_no: data.address_no,
      age: data.age,
      branch_id: data.branch_id,
      dateofbirth: data.dateofbirth,
      district: data.district,
      email: data.email,
      emergency_person_fname: data.emergency_person_fname,
      emergency_person_lname: data.emergency_person_lname,
      emergency_tel: data.emergency_tel,
      expiry_date: data.expiry_date,
      facebook: data.facebook,
      fname_EN: data.fname_EN,
      fname_TH: data.fname_TH,
      id_card: data.id_card,
      issue_at: data.issue_at,
      issue_date: data.issue_date,
      lname_EN: data.lname_EN,
      lname_TH: data.lname_TH,
      moo: data.moo,
      nationality: data.nationality,
      p_height: data.p_height,
      p_weight: data.p_weight,
      postal_code: data.postal_code,
      province: data.province,
      race: data.race,
      religion: data.religion,
      road: data.road,
      sex: data.sex,
      student_group: data.student_group,
      student_id: data.student_id,
      sub_district: data.sub_district,
      tel: data.tel,
      username: data.username,
      year_class: data.year_class,
    });
    var requestOptions = {
      method: "PATCH",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(
      process.env.NEXT_PUBLIC_API_URL + "student/updateStudent/" + item.id,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        messageUp();
      })
      .catch((error) => console.log("error", error));
  };
  return (
    <>
      {contextHolder}
      <Form layout="inline" name="EditUser" onFinish={sendEdit} key={item.id}>
        <div className="w-full mt-2">
          <label className="block mb-2 text-sm font-medium text-gray-900  dark:text-white">
            {" "}
            <div className="flex justify-center items-center">
              <div className="w-1/3 max-w-xs">
                <Image
                  className="rounded-full mx-auto"
                  src={
                    item?.profile_image
                      ? `${process.env.NEXT_PUBLIC_API_URL}api/${item.profile_image}`
                      : `../icon/avatar.jpg`
                  }
                  alt="avatar"
                />
              </div>
            </div>
          </label>
        </div>

        <div className="w-full mt-2">
          <label className="block mb-2 text-sm font-medium text-gray-900  dark:text-white">
            {" "}
            Username
            <Form.Item
              name={"username"}
              rules={[{ required: true, message: "กรุณากรอก Username" }]}
              initialValue={item.username}
            >
              <Input
                readOnly
                value={item.username}
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
                value={item.fname_EN}
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
                value={item.lname_EN}
                className="  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </Form.Item>
          </label>
        </div>
        <div className="w-1/2 mt-2 ">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            รหัสนักศึกษา
            <Form.Item
              initialValue={item.student_id}
              name={"student_id"}
              rules={[
                { required: true, message: "กรุณากรอกรหัสนักศึกษา" },
                { min: 10, message: "กรอกรหัสนักศึกษาให้ครบ" },
                { pattern: "[0-9]", message: "กรอกข้อมูลเป็นตัวเลขเท่านั้น!" },
              ]}
            >
              <Input
                maxLength={10}
                minLength={10}
                value={item.student_id}
                className="  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </Form.Item>
          </label>
        </div>
        <div className="w-1/4 mt-2 ">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            หมู่เรียน
            <Form.Item
              initialValue={item.student_group}
              name={"student_group"}
              rules={[{ required: true, message: "กรุณากรอกหมู่เรียน" }]}
            >
              <Input
                value={item.student_group}
                className="  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </Form.Item>
          </label>
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
              <option value={"1"}>ชั้นปี ที่1</option>
              <option value={"2"}>ชั้นปี ที่2</option>
              <option value={"3"}>ชั้นปี ที่3</option>
              <option value={"4"}>ชั้นปี ที่4</option>
            </Select>
          </Form.Item>
        </div>
        <div className="w-1/2 mt-2 ">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            สาขาวิชา
            <Form.Item
              initialValue={item.branch_id}
              name={"branch_id"}
              rules={[{ required: true, message: "กรุณาเลือกสาขาวิชา" }]}
            >
              <Select size={size}>
                {branchData.map((data) => (
                  <Select.Option key={data.id} value={data.id}>
                    {data.branch_name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </label>
        </div>
        <div className="w-1/2 mt-2 ">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            เบอร์โทรศัพท์
            <Form.Item
              initialValue={item.tel}
              name={"tel"}
              rules={[{ required: true, message: "กรุณากรอกเบอร์โทรศัพท์" }]}
            >
              <Input
                value={item.tel}
                className="  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </Form.Item>
          </label>
        </div>
        <div className="w-1/2 mt-2 ">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            อีเมล์
            <Form.Item
              initialValue={item.email}
              name={"email"}
              rules={[{ required: true, message: "กรุณากรอก E-mail" }]}
            >
              <Input
                type="email"
                value={item.email}
                className="  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </Form.Item>
          </label>
        </div>
        <div className="w-1/2 mt-2 ">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Facebook
            <Form.Item
              initialValue={item.facebook}
              name={"facebook"}
              rules={[{ required: true, message: "กรุณากรอกชื่อ facebook" }]}
            >
              <Input
                value={item.facebook}
                className="  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </Form.Item>
          </label>
        </div>

        <div className="w-1/2 mt-2 ">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            ชื่อบุคคลติดต่อกรณีฉุกเฉิน
            <Form.Item
              initialValue={item.emergency_person_fname}
              name={"emergency_person_fname"}
              rules={[
                {
                  required: true,
                  message: "กรุณากรอก ชื่อบุคคลติดต่อกรณีฉุกเฉิน",
                },
              ]}
            >
              <Input
                value={item.emergency_person_fname}
                className="  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </Form.Item>
          </label>
        </div>
        <div className="w-1/2 mt-2 ">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            นามสกุลบุคคลติดต่อกรณีฉุกเฉิน
            <Form.Item
              initialValue={item.emergency_person_lname}
              name={"emergency_person_lname"}
              rules={[
                {
                  required: true,
                  message: "กรุณากรอก นามสกุลบุคคลติดต่อกรณีฉุกเฉิน",
                },
              ]}
            >
              <Input
                value={item.emergency_person_lname}
                className="  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </Form.Item>
          </label>
        </div>
        <div className="w-1/2 mt-2 ">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            เบอร์โทรบุคคลติดต่อกรณีฉุกเฉิน
            <Form.Item
              initialValue={item.emergency_tel}
              name={"emergency_tel"}
              rules={[
                {
                  required: true,
                  message: "กรุณากรอกเบอร์โทรบุคคลติดต่อกรณีฉุกเฉิน",
                },
              ]}
            >
              <Input
                minLength={10}
                maxLength={10}
                value={item.emergency_tel}
                className="  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </Form.Item>
          </label>
        </div>
        <div className="w-full mt-2 ">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            รหัสบัตรประชาชน
            <Form.Item
              initialValue={item.id_card}
              name={"id_card"}
              rules={[
                { required: true, message: "กรุณากรอกรหัสบัตรประชาชน" },
                { min: 13, message: "กรุณากรอกข้อมูลให้ครบ" },
                { pattern: "[0-9]", message: "กรอกรูปแบบข้อมูลให้ถูกต้อง" },
              ]}
            >
              <Input
                minLength={13}
                maxLength={13}
                value={item.id_card}
                className="  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </Form.Item>
          </label>
        </div>
        <div className="w-1/2 mt-2 ">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            ออกให้ ณ
            <Form.Item
              initialValue={item.issue_at}
              name={"issue_at"}
              rules={[{ required: true, message: "กรุณากรอก สถานที่ออกบัตร" }]}
            >
              <Input
                value={item.issue_at}
                className="  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </Form.Item>
          </label>
        </div>
        <div className="w-1/4 mt-2 ">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            วันออกบัตร
            <Form.Item
              initialValue={item.issue_date}
              name={"issue_date"}
              rules={[{ required: true, message: "กรุณากรอก วันออกบัตร" }]}
            >
              <Input
                type="date"
                value={item.issue_date}
                className="  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </Form.Item>
          </label>
        </div>
        <div className="w-1/4 mt-2 ">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            วันหมดอายุ
            <Form.Item
              initialValue={item.expiry_date}
              name={"expiry_date"}
              rules={[{ required: true, message: "กรุณากรอก วันหมดอายุ" }]}
            >
              <Input
                type="date"
                value={item.expiry_date}
                className="  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </Form.Item>
          </label>
        </div>
        <div className="w-1/4 mt-2 ">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            เชื้อชาติ
            <Form.Item
              initialValue={item.race}
              name={"race"}
              rules={[{ required: true, message: "กรุณากรอก เชื้อชาติ" }]}
            >
              <Input
                value={item.race}
                className="  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </Form.Item>
          </label>
        </div>
        <div className="w-1/4 mt-2 ">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            สัญชาติ
            <Form.Item
              initialValue={item.nationality}
              name={"nationality"}
              rules={[{ required: true, message: "กรุณากรอก สัญชาติ" }]}
            >
              <Input
                value={item.nationality}
                className="  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </Form.Item>
          </label>
        </div>
        <div className="w-1/4 mt-2 ">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            ศาสนา
            <Form.Item
              initialValue={item.religion}
              name={"religion"}
              rules={[{ required: true, message: "กรุณากรอก ศาสนา" }]}
            >
              <Input
                value={item.religion}
                className="  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </Form.Item>
          </label>
        </div>

        <div className="w-1/4 mt-2 ">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            วัน-เดือน-ปีเกิด
            <Form.Item
              initialValue={item.dateofbirth}
              name={"dateofbirth"}
              rules={[
                { required: true, message: "กรุณาเลือก วัน-เดือน-ปีเกิด" },
              ]}
            >
              <Input
                value={item.dateofbirth}
                type="date"
                className="  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </Form.Item>
          </label>
        </div>
        <div className="w-1/4 mt-2 ">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            อายุ
            <Form.Item
              initialValue={item.age}
              name={"age"}
              rules={[{ required: true, message: "กรุณากรอก อายุ" }]}
            >
              <Input
                value={item.age}
                className="  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </Form.Item>
          </label>
        </div>
        <div className="w-1/4 mt-2 ">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            เพศ
            <Form.Item
              initialValue={item.sex}
              name={"sex"}
              rules={[{ required: true, message: "กรุณาเลือกสาขาวิชา" }]}
            >
              <Select size={size}>
                <Select.Option value="male">ชาย</Select.Option>
                <Select.Option value="female">หญิง</Select.Option>
              </Select>
            </Form.Item>
          </label>
        </div>
        <div className="w-1/4 mt-2 ">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            ส่วนสูง
            <Form.Item
              initialValue={item.p_height}
              name={"p_height"}
              rules={[{ required: true, message: "กรุณากรอก ส่วนสูง" }]}
            >
              <Input
                type="number"
                value={item.p_height}
                className="  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </Form.Item>
          </label>
        </div>
        <div className="w-1/4 mt-2 ">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            น้ำหนัก
            <Form.Item
              initialValue={item.p_weight}
              name={"p_weight"}
              rules={[{ required: true, message: "กรุณากรอก น้ำหนัก" }]}
            >
              <Input
                type="number"
                value={item.p_weight}
                className="  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </Form.Item>
          </label>
        </div>
        <div className="w-full mt-5">
          {" "}
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            ที่อยู่ตามบัตรประชาชน{" "}
          </label>
        </div>
        <div className="w-1/12 mt-2 ">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            เลขที่
            <Form.Item
              initialValue={itemAddress.address_no}
              name={"address_no"}
              rules={[{ required: true, message: "กรุณากรอก เลขที่" }]}
            >
              <Input
                value={itemAddress.address_no}
                className="  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </Form.Item>
          </label>
        </div>
        <div className="w-1/12 mt-2 ">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            หมู่ที่
            <Form.Item
              initialValue={itemAddress.moo}
              name={"moo"}
              rules={[{ required: true, message: "กรุณากรอก หมู่ที่" }]}
            >
              <Input
                value={itemAddress.moo}
                className="  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </Form.Item>
          </label>
        </div>
        <div className="w-1/6 mt-2 ">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            ถนน
            <Form.Item
              initialValue={itemAddress.road}
              name={"road"}
              rules={[{ required: true, message: "กรุณากรอก ถนน" }]}
            >
              <Input
                value={itemAddress.road}
                className="  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </Form.Item>
          </label>
        </div>
        <div className="w-1/6 mt-2 ">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            ตำบล/แขวง
            <Form.Item
              initialValue={itemAddress.sub_district}
              name={"sub_district"}
              rules={[{ required: true, message: "กรุณากรอก ตำบล/แขวง" }]}
            >
              <Input
                value={itemAddress.sub_district}
                className="  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </Form.Item>
          </label>
        </div>
        <div className="w-1/6 mt-2 ">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            อำเภอ/เขต
            <Form.Item
              initialValue={itemAddress.district}
              name={"district"}
              rules={[{ required: true, message: "กรุณากรอก อำเภอ/เขต" }]}
            >
              <Input
                value={itemAddress.district}
                className="  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </Form.Item>
          </label>
        </div>
        <div className="w-1/6 mt-2 ">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            จังหวัด
            <Form.Item
              initialValue={itemAddress.province}
              name={"province"}
              rules={[{ required: true, message: "กรุณากรอก อำเภอ/เขต" }]}
            >
              <Input
                value={itemAddress.province}
                className="  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </Form.Item>
          </label>
        </div>
        <div className="w-1/6 mt-2 ">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            รหัสไปรษณีย์
            <Form.Item
              initialValue={itemAddress.postal_code}
              name={"postal_code"}
              rules={[{ required: true, message: "กรุณากรอก รหัสไปรษณีย์" }]}
            >
              <Input
                maxLength={5}
                value={itemAddress.postal_code}
                className="  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </Form.Item>
          </label>
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
      </Form>
    </>
  );
};
export default FormEditStudent;

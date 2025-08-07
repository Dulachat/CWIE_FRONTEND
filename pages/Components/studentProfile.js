import React from "react";
import { Button, Form, Input, Select, message } from "antd";
import { useRouter } from "next/router";

export default function FormEditStudentProfile(props) {
  const size = "large";
  const [messageApi, contextHolder] = message.useMessage();
  const router = useRouter();
  const data = props.data;

  const messageUp = () => {
    messageApi.open({
      type: "success",
      content: "แก้ไขข้อมูลเรียบร้อย",
    });
  };
  const axios = require("axios");

  const sendData = (value) => {
    const rawData = {
      address_no: value.address_no,
      age: value.age,
      dateofbirth: value.dateofbirth,
      district: value.district,
      email: value.email,
      expiry_date: value.expiry_date,
      facebook: value.facebook,
      fname_EN: value.fname_EN,
      fname_TH: value.fname_TH,
      id_card: value.id_card,
      issue_at: value.issue_at,
      issue_date: value.issue_date,
      lname_EN: value.lname_EN,
      lname_TH: value.lname_TH,
      moo: value.moo,
      nationality: value.nationality,
      p_height: value.p_height,
      p_weight: value.p_weight,
      postal_code: value.postal_code,
      province: value.province,
      race: value.race,
      religion: value.religion,
      road: value.road,
      sex: value.sex,
      sub_district: value.sub_district,
      intern_status: value.intern_status,
      tel: value.tel,
      year_class: value.year_class,
    };
    axios
      .patch(
        `${process.env.NEXT_PUBLIC_API_URL}student/updateStudent/${data.id}/${data.uuid}`,
        rawData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response);
        if (response.data.success === true) {
          messageUp();
          setTimeout(() => {
            router.reload();
          }, 1000);
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <>
      {contextHolder}
      {data && (
        <Form
          layout="inline"
          name="studentProfile"
          onFinish={sendData}
          key={data.id}
        >
          <div className=" w-1/2  mt-2 ">
            <lable className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              ประเภทการฝึก
            </lable>
            <Form.Item
              name={"intern_status"}
              rules={[{ required: true, message: "กรุณาเลือกประเภทการฝึก" }]}
              initialValue={data.intern_status}
            >
              <Select size={size}>
                <Select.Option key={"0"} value={"0"}>
                  ฝึกสหกิจศึกษา
                </Select.Option>
                <Select.Option key={"1"} value={"1"}>
                  ฝึกประสบการณ์วิชาชีพ
                </Select.Option>
                <Select.Option key={"2"} value={"2"}>
                  ยังไม่เลือก
                </Select.Option>
              </Select>
            </Form.Item>
          </div>
          <div className="w-full mt-2">
            <label className="block mb-2 text-sm font-medium text-gray-900  dark:text-white">
              {" "}
              Username{" "}
            </label>
            <Form.Item
              name={"username"}
              rules={[
                { required: true, message: "กรุณากรอก Username" },
                {
                  pattern: "^sb[0-9]{10}@lru.ac.th$",
                  message: "กรุณากรอกอีเมล์มหวิทยาลัย",
                  min: 22,
                },
              ]}
              initialValue={data.username}
              readOnly
            >
              <Input
                readOnly
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </Form.Item>
          </div>

          <div className=" w-1/4  mt-2">
            <lable className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              คำนำหน้าชื่อ
              <Form.Item
                name={"title_name"}
                rules={[{ required: true, message: "กรุณาเลือกคำนำหน้าชื่อ" }]}
                initialValue={data.title_name}
              >
                <Select size={size} defaultValue={"เลือกคำนำหน้าชื่อ"}>
                  <Select.Option value="นาย">นาย</Select.Option>
                  <Select.Option value="นาง">นาง</Select.Option>
                  <Select.Option value="นางสาว">นางสาว</Select.Option>
                </Select>
              </Form.Item>
            </lable>
          </div>
          <div className=" w-1/4  mt-2 ">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              ชื่อภาษาไทย
              <Form.Item
                initialValue={data.fname_TH}
                name={"fname_TH"}
                rules={[{ required: true, message: "กรุณากรอกชื่อ" }]}
              >
                <Input className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
              </Form.Item>
            </label>
          </div>
          <div className="w-1/2 mt-2 ">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              นามสกุลภาษาไทย
              <Form.Item
                initialValue={data.lname_TH}
                name={"lname_TH"}
                rules={[{ required: true, message: "กรุณากรอกนามสกุล" }]}
              >
                <Input className=" justify-self-end bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
              </Form.Item>
            </label>
          </div>
          <div className=" w-1/2  mt-2 ">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              ชื่อภาษาอังกฤษ
              <Form.Item
                initialValue={data.fname_EN}
                name={"fname_EN"}
                rules={[
                  {
                    pattern: "^[a-zA-Zs]+$",
                    message: "กรอกข้อมูลเป็นภาษาอังกฤษเท่านั้น",
                  },
                  { required: true, message: "กรุณากรอกชื่อ" },
                ]}
              >
                <Input className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
              </Form.Item>
            </label>
          </div>
          <div className="w-1/2 mt-2 ">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              นามสกุลภาษาอังกฤษ
              <Form.Item
                initialValue={data.lname_EN}
                name={"lname_EN"}
                rules={[
                  {
                    pattern: "^[a-zA-Zs]+$",
                    message: "กรอกข้อมูลเป็นภาษาอังกฤษเท่านั้น",
                  },
                  { required: true, message: "กรุณากรอกนามสกุล" },
                ]}
              >
                <Input className="  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
              </Form.Item>
            </label>
          </div>
          <div className="w-1/2 mt-2 ">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              รหัสนักศึกษา
              <Form.Item
                initialValue={data.student_id}
                name={"student_id"}
                rules={[
                  { required: true, message: "กรุณากรอกรหัสนักศึกษา" },
                  {
                    pattern: "[0-9]",
                    message: "กรอกข้อมูลให้ถูกต้อง",
                    min: 10,
                  },
                ]}
              >
                <Input
                  readOnly
                  minLength={10}
                  maxLength={10}
                  className="  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </Form.Item>
            </label>
          </div>
          <div className="w-1/4 mt-2 ">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              หมู่เรียน
              <Form.Item
                initialValue={data.student_group}
                name={"student_group"}
                rules={[{ required: true, message: "กรุณากรอกหมู่เรียน" }]}
              >
                <Input
                  value={data.student_group}
                  className="  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </Form.Item>
            </label>
          </div>
          <div className="w-1/4 mt-2 ">
            <lable className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              ชั้นปี
              <Form.Item
                name={"year_class"}
                rules={[{ required: true, message: "กรุณาเลือกชั้นปี" }]}
                initialValue={data.year_class}
              >
                <Select size={size}>
                  <option value={"1"}>ชั้นปี ที่1</option>
                  <option value={"2"}>ชั้นปี ที่2</option>
                  <option value={"3"}>ชั้นปี ที่3</option>
                  <option value={"4"}>ชั้นปี ที่4</option>
                </Select>
              </Form.Item>
            </lable>
          </div>
          <div className="w-1/2 mt-2 ">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              เบอร์โทรศัพท์
              <Form.Item
                name={"tel"}
                initialValue={data.tel}
                rules={[
                  { required: true, message: "กรุณากรอกเบอร์โทรศัพท์" },
                  {
                    pattern: "[0-9]{10}",
                    message: "กรุณากรอกข้อมูลให้ถูกต้อง",
                  },
                ]}
              >
                <Input
                  maxLength={10}
                  className="  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </Form.Item>
            </label>
          </div>
          <div className="w-1/2 mt-2 ">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              อีเมล์
              <Form.Item
                name={"email"}
                initialValue={data.email}
                rules={[{ required: true, message: "กรุณากรอก E-mail" }]}
              >
                <Input className="  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
              </Form.Item>
            </label>
          </div>
          <div className="w-1/2 mt-2 ">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Facebook
              <Form.Item
                name={"facebook"}
                rules={[{ required: true, message: "กรุณากรอกชื่อ facebook" }]}
                initialValue={data.facebook}
              >
                <Input className="  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
              </Form.Item>
            </label>
          </div>

          <div className="w-full mt-2 ">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              รหัสบัตรประชาชน
              <Form.Item
                name={"id_card"}
                rules={[
                  { required: true, message: "กรุณากรอกรหัสบัตรประชาชน" },
                  { pattern: "[0-9]{13}", message: "กรอกข้อมูลให้ถูกต้อง" },
                ]}
                initialValue={data.id_card}
              >
                <Input
                  maxLength={13}
                  className="  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </Form.Item>
            </label>
          </div>
          <div className="w-1/2 mt-2 ">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              ออกให้ ณ
              <Form.Item
                name={"issue_at"}
                rules={[
                  { required: true, message: "กรุณากรอก สถานที่ออกบัตร" },
                  {
                    pattern: "^[ก-๏s]+$",
                    message: "กรอกข้อมูลเป็นภาษาไทยเท่านั้น",
                  },
                ]}
                initialValue={data.issue_at}
              >
                <Input className="  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
              </Form.Item>
            </label>
          </div>
          <div className="w-1/4 mt-2 ">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              วันออกบัตร
              <Form.Item
                name={"issue_date"}
                rules={[{ required: true, message: "กรุณากรอก วันออกบัตร" }]}
                initialValue={data.issue_date}
              >
                <Input
                  type="date"
                  className="  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </Form.Item>
            </label>
          </div>
          <div className="w-1/4 mt-2 ">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              วันหมดอายุ
              <Form.Item
                name={"expiry_date"}
                initialValue={data.expiry_date}
                rules={[{ required: true, message: "กรุณากรอก วันหมดอายุ" }]}
              >
                <Input
                  type="date"
                  className="  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </Form.Item>
            </label>
          </div>
          <div className="w-1/4 mt-2 ">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              เชื้อชาติ
              <Form.Item
                name={"race"}
                initialValue={data.race}
                rules={[
                  { required: true, message: "กรุณากรอก เชื้อชาติ" },
                  { pattern: "^[ก-๏s]+$", message: "กรอกข้อมูลให้ถูกต้อง" },
                ]}
              >
                <Input className="  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
              </Form.Item>
            </label>
          </div>
          <div className="w-1/4 mt-2 ">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              สัญชาติ
              <Form.Item
                name={"nationality"}
                initialValue={data.nationality}
                rules={[
                  { required: true, message: "กรุณากรอก สัญชาติ" },
                  { pattern: "^[ก-๏s]+$", message: "กรอกข้อมูลให้ถูกต้อง" },
                ]}
              >
                <Input className="  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
              </Form.Item>
            </label>
          </div>
          <div className="w-1/4 mt-2 ">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              ศาสนา
              <Form.Item
                name={"religion"}
                initialValue={data.religion}
                rules={[
                  { pattern: "^[ก-๏s]+$", message: "กรอกข้อมูลให้ถูกต้อง" },
                ]}
              >
                <Input className="  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
              </Form.Item>
            </label>
          </div>

          <div className="w-1/4 mt-2 ">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              วัน-เดือน-ปีเกิด
              <Form.Item name={"dateofbirth"} initialValue={data.dateofbirth}>
                <Input
                  type="date"
                  className="  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </Form.Item>
            </label>
          </div>
          <div className="w-1/4 mt-2 ">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              อายุ
              <Form.Item name={"age"} initialValue={data.age}>
                <Input
                  type="number"
                  className="  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </Form.Item>
            </label>
          </div>

          <div className="w-1/4 mt-2 ">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              ส่วนสูง
              <Form.Item name={"p_height"} initialValue={data.p_height}>
                <Input
                  type="number"
                  className="  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </Form.Item>
            </label>
          </div>
          <div className="w-1/4 mt-2 ">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              น้ำหนัก
              <Form.Item name={"p_weight"} initialValue={data.p_weight}>
                <Input
                  type="number"
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
                name={"address_no"}
                initialValue={data.address.address_no}
                rules={[{ pattern: "[0-9]", message: "กรอกข้อมูลให้ถูกต้อง" }]}
              >
                <Input className="  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
              </Form.Item>
            </label>
          </div>
          <div className="w-1/12 mt-2 ">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              หมู่ที่
              <Form.Item name={"moo"} initialValue={data.address.moo}>
                <Input className="  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
              </Form.Item>
            </label>
          </div>
          <div className="w-1/6 mt-2 ">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              ถนน
              <Form.Item name={"road"} initialValue={data.address.road}>
                <Input className="  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
              </Form.Item>
            </label>
          </div>
          <div className="w-1/6 mt-2 ">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              ตำบล/แขวง
              <Form.Item
                name={"sub_district"}
                initialValue={data.address.sub_district}
                rules={[
                  {
                    pattern: "^[ก-๏s]+$",
                    message: "กรอกข้อมูลเป็นภาษาไทยเท่านั้น",
                  },
                ]}
              >
                <Input className="  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
              </Form.Item>
            </label>
          </div>
          <div className="w-1/6 mt-2 ">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              อำเภอ/เขต
              <Form.Item
                name={"district"}
                initialValue={data.address.district}
                rules={[
                  {
                    pattern: "^[ก-๏s]+$",
                    message: "กรอกข้อมูลเป็นภาษาไทยเท่านั้น",
                  },
                ]}
              >
                <Input className="  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
              </Form.Item>
            </label>
          </div>
          <div className="w-1/6 mt-2 ">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              จังหวัด
              <Form.Item
                name={"province"}
                initialValue={data.address.province}
                rules={[
                  {
                    pattern: "^[ก-๏s]+$",
                    message: "กรอกข้อมูลเป็นภาษาไทยเท่านั้น",
                  },
                ]}
              >
                <Input className="  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
              </Form.Item>
            </label>
          </div>
          <div className="w-1/6 mt-2 ">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              รหัสไปรษณีย์
              <Form.Item
                name={"postal_code"}
                initialValue={data.address.postal_code}
                rules={[
                  { pattern: "[0-9]", message: "กรอกข้อมูลให้ถูกต้อง", min: 5 },
                ]}
              >
                <Input
                  maxLength={5}
                  className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
      )}
    </>
  );
}

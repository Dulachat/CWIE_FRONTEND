import React from "react";
import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import {
  Space,
  Table,
  Tag,
  Button,
  Modal,
  Form,
  Input,
  Select,
  Tabs,
  message,
} from "antd";
import {
  EyeOutlined,
  SettingOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import axiosInstance from "../../utils/axios";
const size = "large";
export default function InternTabs2() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [companyData, setCompanyData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [studentData, setStudentData] = useState([]);
  const [selectUserData, setSelectUserData] = useState([]);
  const [internData, setInternData] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [dummyState, rerender] = React.useState(1);
  const [dataEdit, setDataEdit] = useState([]);
  const [data, setData] = useState([]);
  const messageError = () => {
    messageApi.open({
      type: "error",
      content: "มีข้อมูลนี้แล้ว",
    });
  };
  const messageSuccess = () => {
    messageApi.open({
      type: "success",
      content: "เพิ่มข้อมูลเรียบร้อย",
    });
    setTimeout(() => {
      setOpenAdd(false);
      rerender(dummyState + 1);
    }, 1000);
  };
  const selectOption = (id) => {
    axiosInstance.get("student/oneStudent/" + id).then(function (response) {
      setSelectUserData(response.data);
    });
  };
  useEffect(() => {
    axiosInstance
      .get("assessment/getOneHead/" + 1) //1 = ON
      .then(function (response) {
        setInternData(response.data);
      });
  }, []);
  useEffect(() => {
    axiosInstance.get("company/allCompany").then(function (response) {
      setCompanyData(response.data);
    });
  }, []);

  useEffect(() => {
    axiosInstance
      .get("users/getSelect/" + selectUserData.branch_id)
      .then(function (response) {
        setUserData(response.data);
      });
  }, [selectUserData]);

  useEffect(() => {
    axiosInstance.get("student/allStudentIntern").then(function (response) {
      setStudentData(response.data);
    });
  }, [dummyState]);

  useEffect(() => {
    axiosInstance
      .get("assessment/getDetail")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, [dummyState]);
  const columns = [
    {
      title: "No.",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "ชื่อ",
      key: "name",
      render: (text) => (
        <span>
          {text.JoinStudent.fname_TH + " " + text.JoinStudent.lname_TH}
        </span>
      ),
    },
    {
      title: "สาขาวิชา",
      key: "branch",
      render: (data) => <span>{data.JoinStudent.branchJoin.branch_name}</span>,
    },
    {
      title: "ชื่ออาจารย์ประจำสาขา",

      key: "user1",
      render: (data) => (
        <span>
          {data.JoinEvaluator1.fname_TH + " " + data.JoinEvaluator1.lname_TH}
        </span>
      ),
    },
    {
      title: "ชื่อสถานประกอบการณ์",
      key: "user2",
      render: (data) => <span>{data.JoinCompany.company_name}</span>,
    },
    {
      title: "Edit",
      key: "actionEdit",
      width: "10%",
      render: (_, record) => (
        <Button
          icon={<SettingOutlined />}
          className={" bg-yellow-300"}
          onClick={(e) => showModalEdit(record)}
          type="primary"
        ></Button>
      ),
    },
    {
      title: "Delete",
      key: "actionDelete",
      width: "10%",

      render: (_, record) => (
        <Button
          icon={<DeleteOutlined />}
          type="primary"
          onClick={(e) => {
            if (window.confirm("ยืนยันการลบข้อมูล")) {
              sendDelete(record.id);
            }
          }}
          className={" bg-red-600 text-white"}
        ></Button>
      ),
    },
  ];
  const showModalAdd = () => {
    setOpenAdd(true);
  };
  const handleOkAdd = () => {
    setOpenAdd(false);
  };
  const handleCancelAdd = () => {
    setOpenAdd(false);
  };
  const showModalEdit = (value) => {
    setDataEdit(value);
    setSelectUserData(value.JoinStudent);
    setOpenEdit(true);
  };
  const handleOkEdit = () => {
    setOpenEdit(false);
  };
  const handleCancelEdit = () => {
    setOpenEdit(false);
  };

  const sendData = (value) => {
    const axios = require("axios");
    let data = JSON.stringify({
      header_id: value.header_id,
      student_id: value.student_id,
      evaluator1_id: value.evaluator1_id,
      company_id: value.company_id,
    });
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: process.env.NEXT_PUBLIC_API_URL + "assessment/addDetail",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    axios
      .request(config)
      .then((response) => {
        if (response.data === "success") {
          {
            messageSuccess();
          }
        }
        if (response.data === "error") {
          {
            messageError();
          }
        }
      })
      .catch((error) => console.log(error));
  };
  const sendEditData = (value) => {
    const axios = require("axios");
    let data = JSON.stringify({
      header_id: value.header_id,
      student_id: value.student_id,
      evaluator1_id: value.evaluator1_id,
      company_id: value.company_id,
    });
    let config = {
      method: "patch",
      maxBodyLength: Infinity,
      url:
        process.env.NEXT_PUBLIC_API_URL +
        "assessment/updateDetail/" +
        dataEdit.id,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    axios
      .request(config)
      .then((response) => {
        messageApi.open({
          type: "success",
          content: "แก้ไขข้อมูลเรียบร้อย",
        });
        setTimeout(() => {
          setOpenEdit(false);
          rerender(dummyState + 1);
        }, 1000);
      })
      .catch((error) => console.log(error));
  };
  const sendDelete = (id) => {
    axiosInstance
      .delete("assessment/deleteDetail/" + id)
      .then(function (response) {
        rerender(dummyState + 1);
        messageApi.open({
          type: "success",
          content: "ลบข้อมูลเรียบร้อย",
        });
      });
  };

  console.log(dataEdit);

  return (
    <div>
      {contextHolder}
      <div key={"undefined3"}>
        <div className="w-full">
          <div className=" float-right">
            <button
              type="button"
              onClick={showModalAdd}
              className="mr-5 text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            >
              จัดการผู้ประเมินนักศึกษา
            </button>
          </div>
          <Table
            rowKey={(obj) => obj.id}
            columns={columns}
            dataSource={data}
            style={{ overflow: "auto" }}
          />
        </div>
        {/* //Add content */}
        <Modal
          width={"90%"}
          open={openAdd}
          title="เพิ่มรายการผู้ประเมินนักศึกษา"
          onOk={handleOkAdd}
          onCancel={handleCancelAdd}
          footer={[]}
        >
          <Form onFinish={sendData}>
            <div className="w-full mt-2">
              <label className="block mb-2 text-sm font-medium text-gray-900  dark:text-white">
                ชื่อรายการออกฝึก
              </label>
              <Form.Item
                name={"header_id"}
                initialValue={internData[0]?.id}
                rules={[{ required: true, message: "กรุณาเลือกการออกฝึก" }]}
              >
                <Select size={size}>
                  {internData?.map((assess) => (
                    <Select.Option value={assess.id} key={`assess` + assess.id}>
                      {assess.assessment_name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
            <div className="w-full ">
              <label className="block mb-2 text-sm font-medium text-gray-900  dark:text-white">
                รายชื่อนักศึกษา
                <Form.Item
                  name={"student_id"}
                  rules={[
                    { required: true, message: "กรุณาเลือกรายชื่อนักศึกษา" },
                  ]}
                >
                  <Select size={size} onChange={selectOption}>
                    {studentData.map((data) => (
                      <Select.Option key={data.id} value={data.id}>
                        {data.fname_TH + " " + data.lname_TH}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </label>
            </div>
            <div className="w-full ">
              <label className="block mb-2 text-sm font-medium text-gray-900  dark:text-white">
                รายชื่ออาจารย์ประจำสาขา
                <Form.Item
                  name={"evaluator1_id"}
                  rules={[
                    {
                      required: true,
                      message: "กรุณาเลือกรายชื่ออาจารย์ประจำสาขา",
                    },
                  ]}
                >
                  <Select size={size}>
                    <Select.Option key={""} value={""}></Select.Option>
                    {userData.map((data) => (
                      <Select.Option key={`eva-${data.id}`} value={data.id}>
                        {data.fname_TH + " " + data.lname_TH}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </label>
            </div>

            <div className="w-full ">
              <label className="block mb-2 text-sm font-medium text-gray-900  dark:text-white">
                เลือกสถานประกอบการณ์
                <Form.Item
                  name={"company_id"}
                  rules={[
                    { required: true, message: "กรุณาเลือกสถานประกอบการณ์" },
                  ]}
                >
                  <Select size={size}>
                    {companyData.map((data) => (
                      <Select.Option key={data.id} value={data.id}>
                        {data.company_name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </label>
            </div>
            <div className="w-full">
              <Button
                className=" text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                htmlType="submit"
                block
                size={size}
              >
                บันทึกข้อมูล
              </Button>
            </div>
          </Form>
        </Modal>

        {/* Edit contents */}

        {openEdit == true && (
          <Modal
            width={"90%"}
            open={openEdit}
            title="แก้ไขรายการผู้ประเมินนักศึกษา"
            onOk={handleOkEdit}
            onCancel={handleCancelEdit}
            key={internData.id}
            footer={[]}
          >
            <Form onFinish={sendEditData}>
              <div className="w-full mt-2">
                <label className="block mb-2 text-sm font-medium text-gray-900  dark:text-white">
                  ชื่อรายการออกฝึก
                </label>
                <Form.Item
                  name={"header_id"}
                  initialValue={dataEdit.header_id}
                  rules={[{ required: true, message: "กรุณาเลือกการออกฝึก" }]}
                >
                  <Select size={size} defaultValue={dataEdit.header_id}>
                    {internData.map((item)=>
                         <Select.Option value={item.id} key={`header_id_`+item.id}>
                         {item.assessment_name}
                       </Select.Option>
                    )}
               
                  </Select>
                </Form.Item>
              </div>
              <div className="w-full ">
                <label className="block mb-2 text-sm font-medium text-gray-900  dark:text-white">
                  รายชื่อนักศึกษา
                  <Form.Item
                    name={"student_id"}
                    rules={[
                      { required: true, message: "กรุณาเลือกรายชื่อนักศึกษา" },
                    ]}
                    initialValue={dataEdit.JoinStudent.id}
                  >
                    <Select size={size} defaultValue={dataEdit.JoinStudent.id} disabled>
                      <Select.Option value={dataEdit.JoinStudent.id}>
                        {dataEdit.JoinStudent.fname_TH +
                          " " +
                          dataEdit.JoinStudent.lname_TH}
                      </Select.Option>
                    </Select>
                  </Form.Item>
                </label>
              </div>
              <div className="w-full ">
                <label className="block mb-2 text-sm font-medium text-gray-900  dark:text-white">
                  รายชื่ออาจารย์ประจำสาขา
                  <Form.Item
                    name={"evaluator1_id"}
                    rules={[
                      {
                        required: true,
                        message: "กรุณาเลือกรายชื่ออาจารย์ประจำสาขา",
                      },
                    ]}
                    initialValue={dataEdit.JoinEvaluator1.id}
                  >
                    <Select
                      size={size}
                      defaultValue={dataEdit.JoinEvaluator1.id}
                    >
                      {userData.map((data) => (
                        <Select.Option key={data.id} value={data.id}>
                          {data.fname_TH + " " + data.lname_TH}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </label>
              </div>

              <div className="w-full ">
                <label className="block mb-2 text-sm font-medium text-gray-900  dark:text-white">
                  เลือกสถานประกอบการณ์
                  <Form.Item
                    name={"company_id"}
                    rules={[
                      { required: true, message: "กรุณาเลือกสถานประกอบการณ์" },
                    ]}
                    initialValue={dataEdit.JoinCompany.id}
                  >
                    <Select size={size} defaultValue={dataEdit.JoinCompany.id}>
                      {companyData.map((data) => (
                        <Select.Option key={data.id} value={data.id}>
                          {data.company_name}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </label>
              </div>
              <div className="w-full">
                <Button
                  className=" text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                  htmlType="submit"
                  block
                  size={size}
                >
                  บันทึกข้อมูล
                </Button>
              </div>
            </Form>
          </Modal>
        )}
      </div>
    </div>
  );
}

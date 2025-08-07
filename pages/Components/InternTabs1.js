import React, { useEffect } from "react";
import { useState } from "react";
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
  Switch,
  message,
} from "antd";
import { format } from "date-fns";
import thLocale from "date-fns/locale/th";
import { EyeOutlined, SettingOutlined } from "@ant-design/icons";
const size = "large";
import axiosInstance from "../../utils/axios";

export default function InternTabs1(key) {
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [switchStatus, setStatus] = useState(false);
  const [data, setData] = useState([]);
  const [dataEdit, setDataEdit] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [dummyState, rerender] = React.useState(1);
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
    rerender(dummyState + 1);
  };
  useEffect(() => {
    axiosInstance
      .get("assessment/getHeader")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, [dummyState]);
  const columns = [
    {
      title: "ชื่อรายการออกฝึก",
      dataIndex: "assessment_name",
      key: "assessment_name",
    },
    {
      title: "ปีการศึกษา",
      dataIndex: "yearTerm",
      key: "yearTerm",
    },
    {
      title: "วันที่เริ่ม",
      dataIndex: "start_at",
      key: "start_at",
      render: (date) => {
        if (!date) return null;
        const thaiDate = new Date(date);
        thaiDate.setFullYear(thaiDate.getFullYear() + 543);
        const formattedDate = format(thaiDate, "dd/MM/yyyy", {
          locale: thLocale, // Use Thai locale
        });
        return <span>{formattedDate}</span>;
      },
    },
    {
      title: "วันสิ้นสุด",
      dataIndex: "end_at",
      key: "end_at",
      render: (date) => {
        if (!date) return null;
        const thaiDate = new Date(date);
        thaiDate.setFullYear(thaiDate.getFullYear() + 543);
        const formattedDate = format(thaiDate, "dd/MM/yyyy", {
          locale: thLocale, // Use Thai locale
        });
        return <span>{formattedDate}</span>;
      },
    },
    {
      title: "สถานะ",
      key: "status",
      render: (_, record) => {
        if (record.status === "1") {
          return <text className=" text-green-400"> ON</text>;
        } else {
          return <text className=" text-red-400"> OFF</text>;
        }
      },
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
        >
          Edit
        </Button>
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

  const showModalEdit = (data) => {
    setDataEdit(data);
    setOpenEdit(true);
    if (data.status === "0") {
      setStatus(false);
    } else {
      setStatus(true);
    }
  };
  const handleOkEdit = () => {
    setOpenEdit(false);
  };
  const handleCancelEdit = () => {
    setOpenEdit(false);
  };

  const sendData = (data) => {
    let raw = JSON.stringify({
      assessment_name: data.assessment_name,
      yearTerm: data.yearTerm,
      start_at: data.start_at,
      end_at: data.end_at,
    });
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      headers: {
        "Content-Type": "application/json",
      },
      data: raw,
    };
    axiosInstance
      .request(`assessment/Head`, config)
      .then((res) => {
        if (res.data === "success") {
          messageSuccess();
          setOpenEdit(false);
        }
        if (res.data === "error") {
          messageError();
        }
      })
      .catch((err) => console.log(err));
  };

  const sendEdit = (value) => {
    let assess_status = 0;
    if (value.status === true) {
      assess_status = 1;
    }
    let raw = JSON.stringify({
      assessment_name: value.assessment_name,
      yearTerm: value.yearTerm,
      start_at: value.start_at,
      end_at: value.end_at,
      status: assess_status,
    });
    let config = {
      method: "patch",
      maxBodyLength: Infinity,
      headers: {
        "Content-Type": "application/json",
      },
      data: raw,
    };
    axiosInstance
      .request(`assessment/updateHeader/${dataEdit.id}`, config)
      .then((res) => {
        if (res.status === 200) {
          messageSuccess();
          setOpenEdit(false);
        } else {
          messageError();
        }
      })
      .catch((err) => console.log(err));
  };
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const years = range(2023, new Date().getFullYear() + 1, 1);
  function range(start, end) {
    return new Array(end - start).fill().map((d, i) => i + start + 543);
  }
  const yearTermOptions = [
    { value: `1/${currentYear + 543}`, label: `1/${currentYear + 543}` },
    { value: `2/${currentYear + 543}`, label: `2/${currentYear + 543}` },
  ];
  const onChange = (checked) => {
    setStatus(checked);
  };

  return (
    <>
      {contextHolder}
      <div className="w-full">
        <div className="float-right">
          <button
            type="button"
            onClick={showModalAdd}
            className="mr-5 text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          >
            เพิ่มการประเมิน
          </button>
        </div>
        <Table
          key={key}
          columns={columns}
          rowKey={(obj) => obj.id}
          dataSource={data}
          style={{ overflow: "auto" }}
        />
      </div>
      {/* //Add content */}
      <Modal
        key={key}
        width={"90%"}
        open={openAdd}
        title="เพิ่มการประเมิน"
        onOk={handleOkAdd}
        onCancel={handleCancelAdd}
        footer={[]}
      >
        <Form key={"add"} onFinish={sendData}>
          <div className="w-full">
            <label className="block mb-2 text-sm font-medium text-gray-900  dark:text-white">
              {" "}
              ชื่อรายการออกฝึก
              <Form.Item
                name={"assessment_name"}
                rules={[
                  { required: true, message: "กรุณากรอก ชื่อรายการออกฝึก" },
                ]}
              >
                <Input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
              </Form.Item>
            </label>
          </div>

          <div className="w-full">
            <label className="block mb-2 text-sm font-medium text-gray-900  dark:text-white">
              ปีการศึกษา
              <Form.Item
                name={"yearTerm"}
                rules={[
                  {
                    required: true,
                    message: "กรุณากรอก ปีการศึกษา",
                    min: 6,
                    max: 6,
                  },
                  {
                    pattern: "\\b[1-3]{1}/\\d{4}\\b",
                    message: "กรุณากรอก ปีการศึกษาให้ถูกต้อง",
                  },
                ]}
              >
                <Input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
              </Form.Item>
            </label>
          </div>
          <div className="w-1/2 inline-block px-1">
            <label className="block mb-2 text-sm font-medium text-gray-900  dark:text-white">
              {" "}
              วันเริ่มต้น
              <Form.Item
                name={"start_at"}
                rules={[{ required: true, message: "กรุณาเลือก วันเริ่มต้น" }]}
              >
                <Input
                  type="date"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </Form.Item>
            </label>
          </div>
          <div className="w-1/2 inline-block px-1">
            <label className="block mb-2 text-sm font-medium text-gray-900  dark:text-white">
              {" "}
              วันสิ้นสุด
              <Form.Item
                name={"end_at"}
                rules={[{ required: true, message: "กรุณาเลือก วันสิ้นสุด" }]}
              >
                <Input
                  type="date"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
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
      <Modal
        width={"90%"}
        open={openEdit}
        title="แก้ไขการประเมิน"
        onOk={handleOkEdit}
        onCancel={handleCancelEdit}
        footer={[]}
        key={`modal-${dataEdit.id}`}
      >
        <Form key={`form-${dataEdit.id}`} onFinish={sendEdit}>
          <div className="w-full">
            <label className="block mb-2 text-sm font-medium text-gray-900  dark:text-white">
              {" "}
              ชื่อรายการออกฝึก
              <Form.Item
                name={"intern_name"}
                rules={[
                  { required: true, message: "กรุณากรอก ชื่อรายการออกฝึก" },
                ]}
                initialValue={dataEdit.assessment_name}
              >
                <Input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
              </Form.Item>
            </label>
          </div>

          <div className="w-full ">
            <label className="block mb-2 text-sm font-medium text-gray-900  dark:text-white">
              ปีการศึกษา
              <Form.Item
                name={"yearTerm"}
                rules={[{ required: true, message: "กรุณาเลือก ปีการศึกษา" }]}
                initialValue={dataEdit.yearTerm}
              >
                <Select key={key} size={size}>
                  {years.map((item) => (
                    <>
                      <Select.Option key={`1/${item}`} value={`1/${item}`}>
                        1/{item}
                      </Select.Option>
                      <Select.Option key={`2/${item}`} value={`2/${item}`}>
                        2/{item}
                      </Select.Option>
                      <Select.Option key={`3/${item}`} value={`3/${item}`}>
                        3/{item}
                      </Select.Option>
                    </>
                  ))}
                </Select>
              </Form.Item>
            </label>
          </div>
          <div className="w-full ">
            <label className="block mb-2 text-sm font-medium text-gray-900  dark:text-white">
              {" "}
              วันเริ่มต้น
              <Form.Item
                name={"start_at"}
                rules={[{ required: true, message: "กรุณาเลือก วันเริ่มต้น" }]}
                initialValue={dataEdit.start_at}
              >
                <Input
                  type="date"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </Form.Item>
            </label>
          </div>
          <div className="w-1/2">
            <label className="block mb-2 text-sm font-medium text-gray-900  dark:text-white">
              {" "}
              วันสิ้นสุด
              <Form.Item
                name={"end_at"}
                rules={[{ required: true, message: "กรุณาเลือก วันสิ้นสุด" }]}
                initialValue={dataEdit.end_at}
              >
                <Input
                  type="date"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </Form.Item>
            </label>
          </div>
          <div className="w-1/4 ">
            <label className="block mb-2 text-sm font-medium text-gray-900  dark:text-white">
              เปิดการใช้งาน
              <Form.Item name={"status"}>
                <Switch
                  defaultChecked={switchStatus}
                  className=" bg-slate-400"
                  onChange={onChange}
                />
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
    </>
  );
}

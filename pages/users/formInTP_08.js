import React, { useEffect, useState } from "react";
import { Space, Table, Form, Input, message } from "antd";
import UserNavbar from "../Components/UserNavbar";
import { useRouter } from "next/router";
import axiosInstance from "../../utils/axios";

export default function FormInTP_08() {
  const [form] = Form.useForm();
  const router = useRouter();
  const student_id = router.query.id;
  const [isLogin, setIsLogin] = useState(false);
  const [dataStore, setDataStore] = useState();
  const [dataUser, setDataUser] = useState();
  const [messageApi, contextHolder] = message.useMessage();
  const [data, setData] = useState();
  const [dummyState, rerender] = React.useState(1);
  const [UserId, setId] = useState();
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
      router.back();
    }, 1000);
  };

  useEffect(() => {
    const stored = localStorage.getItem("user");

    setDataStore(stored ? JSON.parse(stored) : fallbackValue);
  }, []);
  useEffect(() => {
    if (dataStore === undefined) return;
    setDataUser(dataStore.data);
  }, [dataStore]);

  useEffect(() => {
    if (dataUser === undefined) return;
    setIsLogin(true);
    setId(dataUser.id);
  }, [dataUser]);

  useEffect(() => {
    if (UserId === undefined) return;
    axiosInstance
      .get("assessment/getScoreForm08/" + UserId)
      .then(function (response) {
        setData(response.data);
      })
      .catch((err) => console.log(err));
  }, [dummyState, UserId]);

  useEffect(() => {
    rerender(dummyState + 1);
  }, [router]);

  const onFinish = (value) => {
    const axios = require("axios");
    let data = JSON.stringify({
      score1_1: value.score1_1,
      score1_2: value.score1_2,
      score1_3: value.score1_3,
      score1_4: value.score1_4,
      score1_5: value.score1_5,
      score2_1: value.score2_1,
      score2_2: value.score2_2,
      score2_3: value.score2_3,
      score2_4: value.score2_4,
      score2_5: value.score2_5,
      comment: value.comment,
    });

    let config = {
      method: "patch",
      maxBodyLength: Infinity,
      url: process.env.NEXT_PUBLIC_API_URL + "form/form08/" + student_id,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    axios
      .request(config)
      .then((response) => {
        {
          messageSuccess();
        }
      })
      .catch((error) => {
        messageError();
      });
  };

  const dataName = [
    {
      key: "1",
      columnName: "1.คุณลักษณะในการปฏิบัติงาน",
    },
    {
      key: "score1_1",
      columnName: "1.1 ความตรงต่อเวลา",
    },
    {
      key: "score1_2",
      columnName: "1.2 ความรู้ในงานที่ปฏิบัติ",
    },
    {
      key: "score1_3",
      columnName: "1.3 ความรับผิดชอบต่องานที่ปฏิบัติ",
    },
    {
      key: "score1_4",
      columnName: "1.4 ความสามารถในการพัฒนาตนเองและงาน",
    },
    {
      key: "score1_5",
      columnName: "1.5 ความสม่ำเสมอของการบันทึกการปฏิบัติงาน",
    },
    {
      key: "2",
      columnName: "2. บุคลิกภาพ",
    },
    {
      key: "score2_1",
      columnName: "2.1 ความเหมาะสมของการแต่งกาย",
    },
    {
      key: "score2_2",
      columnName: "2.2 กริยาวาจาเหมะสมกับกาลเทศะ",
    },
    {
      key: "score2_3",
      columnName: "2.3 มนุษย์สัมพันธ์ต่อบุคลากรในหน่วยงาน",
    },
    {
      key: "score2_4",
      columnName: "2.4 การวางตัวเหมาะสมกับสถานภาพและหน้าที่",
    },
    {
      key: "score2_5",
      columnName: "2.5 ความมีระเบียบวินัยตามกติกาของหน่วยงาน",
    },
  ];
  const columns = [
    {
      title: "เกณฑ์การประเมิน",
      dataIndex: "columnName",
      rowSpan: 2,
      onCell: (_, index) => ({
        colSpan: index === 0 ? 6 : 1,
        colSpan: index === 6 ? 6 : 1,
      }),
    },
    {
      title: "ระดับคะแนน",
      children: [
        {
          title: "5",

          render: (text) => (
            <Form.Item name={text.key}>
              <Space size="middle">
                <input type={"radio"} name={text.key} value={5} />
              </Space>
            </Form.Item>
          ),
          onCell: (_, index) => {
            if (index === 6) {
              return {
                colSpan: 0,
              };
            }
            if (index === 0) {
              return {
                colSpan: 0,
              };
            }
            return {};
          },
        },
        {
          title: "4",
          render: (text) => (
            <Form.Item name={text.key} key={text.key}>
              <Space size="middle">
                <input type={"radio"} name={text.key} value={4} />
              </Space>
            </Form.Item>
          ),
          onCell: (_, index) => {
            if (index === 6) {
              return {
                colSpan: 0,
              };
            }
            if (index === 0) {
              return {
                colSpan: 0,
              };
            }
            return {};
          },
        },
        {
          title: "3",

          render: (text) => (
            <Form.Item name={text.key}>
              <Space size="middle">
                <input type={"radio"} name={text.key} value={3} />
              </Space>
            </Form.Item>
          ),
          onCell: (_, index) => {
            if (index === 6) {
              return {
                colSpan: 0,
              };
            }
            if (index === 0) {
              return {
                colSpan: 0,
              };
            }
            return {};
          },
        },
        {
          title: "2",

          render: (text) => (
            <Form.Item name={text.key}>
              <Space size="middle">
                <input type={"radio"} name={text.key} value={2} />
              </Space>
            </Form.Item>
          ),
          onCell: (_, index) => {
            if (index === 6) {
              return {
                colSpan: 0,
              };
            }
            if (index === 0) {
              return {
                colSpan: 0,
              };
            }
            return {};
          },
        },
        {
          title: "1",
          render: (text) => (
            <Form.Item name={text.key}>
              <Space size="middle">
                <input type={"radio"} name={text.key} value={1} />
              </Space>
            </Form.Item>
          ),
          onCell: (_, index) => {
            if (index === 6) {
              return {
                colSpan: 0,
              };
            }
            if (index === 0) {
              return {
                colSpan: 0,
              };
            }
            return {};
          },
        },
      ],
    },
  ];

  const onReset = () => {
    form.resetFields();
  };
  return (
    <>
      <div>
        {contextHolder}
        <UserNavbar />
        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
            <h3 className=" text-xl font-bold  tracking-tight text-gray-900 inline">
              แบบประเมินผลการนิเทศก์ของอาจารย์
            </h3>
            <p className=" text-blue-700 inline"></p>
          </div>
        </header>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <Form form={form} onFinish={onFinish} name="basic">
            <Table
              dataSource={dataName}
              columns={columns}
              pagination={false}
            ></Table>
            <Form.Item name={"comment"} className="mt-3" rules={[{ required: true, message: "กรุณากรอกข้อมูล" }]}>
              <label><span className="text-red-600">*</span>ข้อเสนอแนะเกี่ยวกับหลักสูตรเพื่อการพัฒนา</label>
              <Input.TextArea
                name={"comment"}
                onChange={(e) => form.setFieldValue("comment", e.target.value)}
                rows={5}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </Form.Item>
            <div className="w-full mt-2">
              <button
                htmlType="button"
                onClick={onReset}
                className="w-full text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
              >
                รีเซ็ต
              </button>
            </div>
            <div className="w-full mt-2">
              <button
                htmlType="submit"
                className="w-full text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
              >
                บันทึกข้อมูล
              </button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}

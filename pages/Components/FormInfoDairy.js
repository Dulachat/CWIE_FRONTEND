import { Form, Input, message, Upload, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import MyEditorInfo from "./QuillEditorInfo";
import { useRouter } from "next/router";

export default function FormInfoDiary(props) {
  const [messageApi, contextHolder] = message.useMessage();
  const [dataStore, setDataStore] = useState();
  const [disableComment, setComment] = useState(true);
  const [disableComment2, setComment2] = useState(true);
  const router = useRouter();
  const messageSuccess = () => {
    messageApi.open({
      type: "success",
      content: "แก้ไขข้อมูลเรียบร้อย",
    });

    setTimeout(() => {
      router.reload();
    }, 1500);
  };
  useEffect(() => {
    const stored = localStorage.getItem("user");
    setDataStore(stored ? JSON.parse(stored) : null);
  }, []);
  const [data, setData] = useState();
  useEffect(() => {
    setData(props.data);
  }, [props]);

  const sendData = (value) => {
    const axios = require("axios");
    let raw = JSON.stringify({
      diary_comment: value.diary_comment,
      diary_comment2: value.diary_comment2,
    });
    let config = {
      method: "patch",
      maxBodyLength: Infinity,
      url:
        process.env.NEXT_PUBLIC_API_URL +
        `Diary/updateDairy/${data.diary_date}/${data.student_id}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: raw,
    };
    axios
      .request(config)
      .then((response) => {
        {
          messageSuccess();
        }
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    if (dataStore?.data?.userLevelJoin?.level_name !== undefined) {
      if (dataStore?.data?.userLevelJoin?.level_name === "อาจารย์") {
        setComment(false);
      } else if (dataStore?.data?.userLevelJoin?.level_name === "พี่เลี้ยง") {
        setComment2(false);
      
      }
    }
  }, [dataStore]);

  return (
    <>
      {contextHolder}
      {data !== undefined && (
        <div className="w-full">
          <Form
            layout="inline"
            name="AddDiary"
            onFinish={sendData}
            key={data.id}
          >
            <div className="w-full  mt-2">
              <label className="block mb-2 text-sm font-medium text-gray-900  dark:text-white">
                รายการปฏิบัติงานประจำวันที่{" "}
              </label>
              <Form.Item
                name={"diary_date"}
                rules={[{ required: true, message: "เลือกวันที่" }]}
                initialValue={data?.diary_date}
              >
                <Input
                  type="date"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  disabled
                />
              </Form.Item>
            </div>

            <div className="w-full mt-2">
              <label className="block mb-2 text-sm font-medium text-gray-900  dark:text-white">
                {" "}
                เวลาเข้างาน{" "}
              </label>
              <Form.Item
                name={"time_in"}
                rules={[{ required: true, message: "กรอกเวลาเข้างาน" }]}
                initialValue={data?.time_in}
              >
                <Input
                  type="time"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  disabled
                />
              </Form.Item>
            </div>
            <div className=" w-full mt-2">
              <label className="block mb-2 text-sm font-medium text-gray-900  dark:text-white">
                {" "}
                เวลาออกงาน{" "}
              </label>
              <Form.Item
                name={"time_out"}
                rules={[{ required: true, message: "กรอกเวลาออกงาน" }]}
                initialValue={data?.time_out}
              >
                <Input
                  type="time"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  disabled
                />
              </Form.Item>
            </div>
            <div className="w-full">
              <label className="block mb-2 text-sm font-medium text-gray-900  dark:text-white">
                {" "}
                สรุปรายละเอียดการทำงาน{" "}
              </label>
              <Form.Item
                name={"diary_detail"}
                initialValue={data?.diary_detail}
              >
                <Input.TextArea style={{ height: 100 }} disabled />
              </Form.Item>
            </div>

            <div className="w-full">
              <label className="block mb-2 text-sm font-medium text-gray-900  dark:text-white">
                {" "}
                คำแนะนำจากอาจารย์{" "}
              </label>
              <Form.Item
                name={"diary_comment"}
                initialValue={data?.diary_comment}
              >
                <Input.TextArea
                  style={{ height: 100 }}
                  disabled={disableComment}
                />
              </Form.Item>
            </div>
            <div className="w-full">
              <label className="block mb-2 text-sm font-medium text-gray-900  dark:text-white">
                {" "}
                คำแนะนำจากพี่เลี้ยง{" "}
              </label>
              <Form.Item
                name={"diary_comment2"}
                initialValue={data?.diary_comment2}
              >
                <Input.TextArea
                  style={{ height: 100 }}
                  disabled={disableComment2}
                />
              </Form.Item>
            </div>
            <div className="w-full mt-2">
              <label className="block mb-2 text-sm font-medium text-gray-900  dark:text-white">
                {" "}
                รายละเอียด{" "}
              </label>
              <MyEditorInfo data={props.data.Detail.detail_text} />
            </div>
          </Form>
        </div>
      )}
    </>
  );
}

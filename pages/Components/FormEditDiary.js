import { Form, Input, message, Upload, Modal } from "antd";
import React, { useState, useEffect, useMemo } from "react";
import MyEditorEdit from "./QuillEditorEdit";
import { useCookies } from "react-cookie";
import axiosInstance from "../../utils/axios";
import { useRouter } from "next/router";

export default function FormEditDiary(props) {

  const router = useRouter();
  const items =props.data
  const [isLogin, setIsLogin] = useState(false);
  const [data, setData] = useState(undefined);
  const [dateUpdate, setDate] = useState(null);
  const [detail_text, setDetailText] = useState();
  const [messageApi, contextHolder] = message.useMessage();
  const [dataStore, setDataStore] = useState();
  const [dataUser, setDataUser] = useState();
  let dataObj = {};
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

    setTimeout(() => {
      router.push({
        pathname: "/student/calendarDiary",
        query: { reload: 1 },
      });
    }, 500);
  };

  useEffect(() => {
    const stored = localStorage.getItem("user");
    setDataStore(stored ? JSON.parse(stored) : fallbackValue);
  }, []);
  useEffect(() => {
    if (dataStore === undefined) return;
    setData(dataStore.data);
    setDataUser(dataStore.data);
  }, [dataStore]);
  useEffect(() => {
    if (dataUser === undefined) return;
    if (data.userLevelJoin === undefined) {
      setIsLogin(true);
    } else {
      router.back();
    }
  }, [dataUser]);

  useEffect(() => {
    if (items && data) {   
      axiosInstance
        .get(`Diary/oneDiaryId/${items.id}/${data.id}`)
        .then((res) => {
          setDetailText(res.data?.Detail?.detail_text);
          setDate(items.diary_date);
          dataObj = {
            status: 200,
            message: "success",
          };
        })
        .catch(
          (error) =>
            (dataObj = {
              status: 400,
              message: error,
            })
        );
    }
  }, [items, data]);

  const onSelectDate = (date) => {
    const axios = require("axios");
    let raw = JSON.stringify({
      diary_date: date,
      student_id: data.id,
    });
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: process.env.NEXT_PUBLIC_API_URL + "Diary/addDiary",
      headers: {
        "Content-Type": "application/json",
      },
      data: raw,
    };
    axios
      .request(config)
      .then((response) => {
        setDate(response.data.diary_date);
      })
      .catch((error) => console.log(error));
  };

  const onFinish = (value) => {
    //updateDairy/:date
    const dataTest = document.getElementsByClassName("ql-editor");
    const axios = require("axios");
    let raw = JSON.stringify({
      time_in: value.time_in,
      time_out: value.time_out,
      detail_text: dataTest[0].innerHTML,
    });
    let config = {
      method: "patch",
      maxBodyLength: Infinity,
      url:`${process.env.NEXT_PUBLIC_API_URL}Diary/updateDairy/${dateUpdate}/${dataUser.id}`,
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
  const handleSaveOriginalPath = (path) => {
    // Implement the logic to save originalPath here
    console.log("Original Path:", path);
  };

  return (
    <>
      {contextHolder}
      {items && 
       <Form layout="inline" onFinish={onFinish} key={items?.id}>
       {items?.diary_comment !== "" && (
        <>
           <div className="w-full mt-2">
           <label className="block mb-2 text-sm font-medium text-gray-900  dark:text-white">
             {" "}
             คำแนะนำจากอาจารย์ <span className="text-red-600">*</span>
           </label>
           <Form.Item
             name={"diary_comment"}
             initialValue={items?.diary_comment}
           >
             <Input.TextArea readOnly style={{ height: 50 }} />
           </Form.Item>
         </div>
          <div className="w-full mt-2">
          <label className="block mb-2 text-sm font-medium text-gray-900  dark:text-white">
            {" "}
            คำแนะนำจากพี่เลี้ยง <span className="text-red-600">*</span>
          </label>
          <Form.Item
            name={"diary_comment"}
            initialValue={items?.diary_comment2}
          >
            <Input.TextArea readOnly style={{ height: 50 }} />
          </Form.Item>
        </div>
        </>
      
       )}
       <div className="w-full mt-2">
         <label className="block mb-2 text-sm font-medium text-gray-900  dark:text-white">
           รายการปฏิบัติงานประจำวันที่
           <Form.Item
             name={"diary_date"}
             rules={[{ required: true, message: "เลือกวันที่" }]}
             initialValue={items?.diary_date}
           >
             <Input
               onChange={(e) => onSelectDate(e.target.value)}
               type="date"
               readOnly
               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
             />
           </Form.Item>
         </label>
       </div>

       <div className="w-full mt-2">
         <label className="block mb-2 text-sm font-medium text-gray-900  dark:text-white">
           {" "}
           เวลาเข้างาน
           <Form.Item
             name={"time_in"}
             rules={[{ required: true, message: "กรอกเวลาเข้างาน" }]}
             initialValue={items?.time_in}
           >
             <Input
               type="time"
               value={items?.time_in}
               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
             />
           </Form.Item>
         </label>
       </div>
       <div className=" w-full mt-2">
         <label className="block mb-2 text-sm font-medium text-gray-900  dark:text-white">
           {" "}
           เวลาออกงาน
           <Form.Item
             name={"time_out"}
             rules={[{ required: true, message: "กรอกเวลาออกงาน" }]}
             initialValue={items?.time_out}
           >
             <Input
               type="time"
               value={items?.time_out}
               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
             />
           </Form.Item>
         </label>
       </div>
       <div className="w-full">
         <label className="block mb-2 text-sm font-medium text-gray-900  dark:text-white">
           {" "}
           สรุปรายละเอียดการทำงาน{" "}
         </label>
         <MyEditorEdit data={detail_text}  onSaveOriginalPath={handleSaveOriginalPath} />
       </div>
     </Form>
      }
     
    </>
  );
}

import React, { useEffect } from "react";
import { Button, Form, Input, Row, message } from "antd";
import { useRouter } from "next/router";
import { useState } from "react";

const FormEditBranch = (item) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [dataEdit, setData] = useState([]);
  const size = "large";
  const router = useRouter();
  useEffect(() => {
    setData(item.data);
  }, [item]);
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
      pathname: "/admin/generalMag",
      query: { reload: 1 },
    });
  };
  const sendEditData = (value) => {
    const axios = require("axios");
    let data = JSON.stringify({
      branch_name: value.branch_name,
    });
    let config = {
      method: "patch",
      maxBodyLength: Infinity,
      url:
        `${process.env.NEXT_PUBLIC_API_URL}` +
        "branch/updateBranch/" +
        dataEdit.id,
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

      <div className="w-full">
        <Form name="editBranch" onFinish={sendEditData} key={dataEdit.id}>
          <Row>
            <div className="w-full mt-1 px-1" key={"branch_name"}>
              <label>ชื่อสถานประกอบการ </label>
              <Form.Item
                name="branch_name"
                initialValue={dataEdit.branch_name}
                noStyle
              >
                <Input
                  value={dataEdit.branch_name}
                  className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </Form.Item>
              {/* <span>description</span> */}
            </div>
          </Row>
          <div className="w-full mt-2">
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
      </div>
    </>
  );
};

export default FormEditBranch;

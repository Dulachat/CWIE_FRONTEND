import React, { useState } from "react";
import { Form, Input, message, Upload, Button, Image } from "antd";
import { InboxOutlined, AuditOutlined } from "@ant-design/icons";
import axiosInstance from "../../utils/axios";
import { useEffect } from "react";

export default function FormAddMaps(prop) {
  const size = "large";
  const { Dragger } = Upload;
  const [previewImg, setImg] = useState();
  useEffect(() => {
    if (prop?.data === undefined) return; // Add this condition

    if (prop?.data?.JoinCompany?.maps_img !== null) {
      setImg({
        response: {
          url: `${process.env.NEXT_PUBLIC_API_URL}company/companyImg/${prop?.data?.JoinCompany?.maps_img}`,
          fileName: prop?.data?.JoinCompany?.maps_img,
        },
      });
    }
  }, [prop.data]);
  const props = {
    name: "file",
    maxCount: 1,
    action: `${process.env.NEXT_PUBLIC_API_URL}company/upload`,
    onChange(info) {
      const { status } = info.file;
      if (status === "done") {
        setImg(info.file);
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      } else if (status === "removed") {
        setImg(undefined);
        handleFileRemoval(info.file);
      }
    },
  };
  const handleFileRemoval = (removedFile) => {
    // Send an API request to delete the removed file
    axiosInstance
      .delete(
        `${process.env.NEXT_PUBLIC_API_URL}company/delete/${removedFile.name}`
      )
      .then((response) => {
        if (response.status === 200) {
          message.success(`File "${removedFile.name}" has been deleted.`);
        } else {
          message.error(`Failed to delete file "${removedFile.name}".`);
        }
      })
      .catch((error) => {
        console.error("Error deleting file:", error);
        message.error(`Error deleting file "${removedFile.name}".`);
      });
  };


  const handleUpload = (file) => {
    const maxSize = 5 * 1024 * 1024; // 5MB limit
    if (file.size > maxSize) {
      message.error("Image size must be less than 5MB.");
      return false; // Prevent upload
    }
    return true; // Allow upload
  };

  const sendForm = async (event) => {
    const raw = {
      maps_url: event.url_maps,
      maps_img: previewImg.response.fileName,
      maps_detail: event.maps_detail,
    };
    const res = await axiosInstance.patch(
      `company/updateCompany/${prop?.data?.JoinCompany?.id}`,
      raw
    );
    if (res.data === "success") {
      message.success(`เพิ่มข้อมูลสำเร็จ`);
    } else {
      message.error("มีข้อผิดพลาด");
    }
  };

  if (prop?.data === "" || prop?.data === undefined) {
    return (
      <div className="w-full mt-2 ">
        <div className="flex justify-center">
          <AuditOutlined style={{ fontSize: "64px", color: "#08c" }} />
        </div>
        <div className="flex justify-center mt-5">
          กรุณาเลือกสถานประกอบการณ์
        </div>
      </div>
    );
  }

  return (
    <Form onFinish={sendForm}>
      <div className="w-full mt-2">
        <label className="block mb-2 text-sm font-medium text-gray-900  dark:text-white">
          URL MAPS
          <Form.Item
            name={"url_maps"}
            rules={[{ required: true, message: "กรอก URL MAPS" }]}
            initialValue={prop?.data?.JoinCompany?.maps_url}
          >
            <Input
              placeholder={"https://goo.gl/maps/svyxk9cpkXHgdtht8"}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </Form.Item>
        </label>
      </div>
      <div className="w-full mt-2">
        <label className="block mb-2 text-sm font-medium text-gray-900  dark:text-white">
          แนบรูปภาพ
          <Form.Item
            name={"maps_img"}
            rules={[{ required: true, message: "แนบรูปภาพ" }]}
          >
            {previewImg ? (
              <>
                <div className="flex justify-center ">
                  {" "}
                  <Image width={200} src={previewImg?.response?.url} />{" "}
                </div>
                <div className="mt-2 flex justify-center">
                  <Button
                    size="large"
                    onClick={() => setImg(undefined)}
                    type="default"
                  >
                    Remove image
                  </Button>
                </div>
              </>
            ) : (
              <Dragger
                beforeUpload={handleUpload}
                {...props}
                showUploadList={false}
              >
                <>
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">
                    Click or drag file to this area to upload
                  </p>
                </>
              </Dragger>
            )}
          </Form.Item>
        </label>
      </div>
      <div className="w-full mt-2">
        <label className="block mb-2 text-sm font-medium text-gray-900  dark:text-white">
          รายละเอียดอื่นๆ
          <Form.Item
            name={"maps_detail"}
            initialValue={prop?.data?.JoinCompany?.maps_detail || ""}
          >
            <Input.TextArea
              value={prop?.data?.JoinCompany?.maps_detail || ""}
              rows={5}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
  );
}

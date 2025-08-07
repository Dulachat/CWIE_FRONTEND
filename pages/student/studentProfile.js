import React, { useEffect, useState } from "react";
import { Card, Image, Button, Input, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import FormEditStudentProfile from "../components/studentProfile";
import axiosInstance from "../../utils/axios";

export default function StudentProfile() {
  const size = "large";
  const router = useRouter();
  const [data, setData] = useState();
  const [uuid, setUUid] = useState();
  const [loading, setLoading] = useState(false);
  const [changeStage, setChangeStage] = useState(0);
  useEffect(() => {
    setUUid(router.query.uuid);
  }, [router]);

  useEffect(() => {
    if (uuid === undefined) return;
    console.log("uuid", uuid);
    axiosInstance.get("student/oneStudentUid/" + uuid).then((res) => {
      console.log("res", res);
      setData(res.data);
      localStorage.setItem("user", JSON.stringify(res));
    });
  }, [uuid, changeStage]);
  const props = {
    maxCount: 1,
    name: "file",
    showUploadList: false,
    action: `${process.env.NEXT_PUBLIC_API_URL}api/profile/upload/${uuid}/student`,
    onChange(info) {
      const { status } = info.file;
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
        setTimeout(() => {
          setChangeStage(changeStage + 1);
        }, 1500);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      } else if (status === "removed") {
        handleFileRemoval(info.file);
      }
    },
  };
  const handleFileRemoval = (removedFile) => {
    // Send an API request to delete the removed file
    axiosInstance
      .delete(
        `${process.env.NEXT_PUBLIC_API_URL}api/profile/remove/${removedFile.name}/${uuid}/student`
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
  if (data === undefined) {
    return <></>;
  }
  return (
    <div>
      <header className="bg-gradient-to-r  from-rose-600  via-red-400 to-pink-500 ... shadow">
        <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
          <h3 className=" text-xl font-bold   tracking-tight  text-white inline">
            แก้ไขข้อมูลส่วนตัว
          </h3>
        </div>
      </header>
      <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
        <div className=" justify-center">
          <button
            onClick={() => router.back()}
            className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800"
          >
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              ย้อนกลับ
            </span>
          </button>
          <Upload
            {...props}
            className=" inline-flex float-right justify-end items-end"
          >
            <Button className="" size={size} icon={<UploadOutlined />}>
              Upload
            </Button>
          </Upload>

          <Card>
            <div className="flex justify-center items-center">
              <div className="w-1/3 max-w-xs">
                <Image
                  className="rounded-full mx-auto"
                  src={
                    data?.profile_image
                      ? `${process.env.NEXT_PUBLIC_API_URL}api/${data.profile_image}`
                      : `../icon/avatar.jpg`
                  }
                  alt="avatar"
                />
              </div>
            </div>

            <FormEditStudentProfile data={data} user={uuid} />
          </Card>
        </div>
      </div>
    </div>
  );
}

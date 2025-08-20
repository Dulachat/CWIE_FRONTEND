import React, { useEffect, useState } from "react";
import { Card, Col, Input, Modal, Row } from "antd";
import { Button } from "antd";
import {
  ContainerTwoTone,
  SlidersTwoTone,
  ContactsTwoTone,
  AppstoreTwoTone,
} from "@ant-design/icons";
import Navbar from "../Components/Navbar";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import Link from "next/link";
import StudentNavbar from "../Components/StudentNavbar";
import axiosInstance from "../../utils/axios";
import { message } from "antd";

export default function StudentIndex() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(false);
  const [dataStore, setDataStore] = useState();
  const [data, setData] = useState();
  const [open, setOpen] = useState(false);
  const [documentLink, setDocumentLink] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored === null) {
      router.push("/auth/login");
      return;
    }
    setDataStore(stored ? JSON.parse(stored) : null);
  }, []);
  useEffect(() => {
    if (dataStore === undefined) return;
    setData(dataStore.data);
  }, [dataStore]);
  useEffect(() => {
    if (data === undefined) return;
    if (data.userLevelJoin === undefined) {
      setIsLogin(true);
    } else {
      router.back();
    }
  }, [data]);

  const handleUpload = () => {
    axiosInstance.patch('assessment/updateDocument/' + data.id, {
      documentLink: documentLink
    })
      .then(response => {
        messageApi.open({
          type: "success",
          content: "แนบลิ้งค์เอกสารการออกฝึกเรียบร้อย",
        });
        setOpen(false);
        setDocumentLink("");
      })
      .catch(error => {
        messageApi.open({
          type: "error",
          content: "แนบลิ้งค์เอกสารการออกฝึกไม่สำเร็จ",
        });
      })
  }

  return (
    <>
      {contextHolder}
      {isLogin === true && (
        <div>
          <StudentNavbar />
          <header className="bg-white shadow">
            <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
              <h3 className=" text-xl font-bold  tracking-tight text-gray-900 inline">
                {data?.title_name + data?.fname_TH + " " + data?.lname_TH}
              </h3>
            </div>
          </header>

          <main>
            <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
              <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                <div className="w-full ">
                  <Link href="/student/calendarDiary">
                    <div className="w-full px-10">
                      <Card className="mx-2  h-16 bg-gradient-to-tr from-yellow-300 to-pink-500  hover:bg-gradient-to-bl"></Card>
                    </div>
                    <div className=" w-full -mt-7">
                      <Card className=" mx-auto w-11/12 h-20  border-red-400  hover:bg-slate-200 ">
                        <div>
                          <p className=" text-lg text-center font-bold">
                            {" "}
                            <SlidersTwoTone style={{ fontSize: "30px" }} />{" "}
                            ปฏิทินการลงเวลา
                          </p>
                        </div>
                      </Card>
                    </div>
                  </Link>
                </div>
                <div className="w-full mt-2 ">
                  <Link href="/student/addInternDetail">
                    <div className="w-full px-10">
                      <Card className="mx-2  h-16 bg-gradient-to-tr from-yellow-300 to-pink-500  hover:bg-gradient-to-bl"></Card>
                    </div>
                    <div className=" w-full -mt-7">
                      <Card className=" mx-auto w-11/12 h-20  border-red-400  hover:bg-slate-200 ">
                        <div>
                          <p className=" text-lg text-center font-bold">
                            {" "}
                            <SlidersTwoTone style={{ fontSize: "30px" }} />
                            เพิ่มข้อมูลการออกฝึก
                          </p>
                        </div>
                      </Card>
                    </div>
                  </Link>
                </div>
                <div className="w-full mt-2 " onClick={() => setOpen(true)}>

                  <div className="w-full px-10">
                    <Card className="mx-2  h-16 bg-gradient-to-tr from-yellow-300 to-pink-500  hover:bg-gradient-to-bl"></Card>
                  </div>
                  <div className=" w-full -mt-7">
                    <Card className=" mx-auto w-11/12 h-20  border-red-400  hover:bg-slate-200 ">
                      <div>
                        <p className=" text-lg text-center font-bold">
                          {" "}
                          <SlidersTwoTone style={{ fontSize: "30px" }} />
                          แนบลิ้งค์เอกสารการออกฝึก
                        </p>
                      </div>
                    </Card>
                  </div>

                </div>
              </div>
            </div>
          </main>
          <Modal
            open={open}
            onCancel={() => setOpen(false)}
            footer={null}
            title="แนบลิ้งค์เอกสารการออกฝึก"
          >
            <div className="mt-4 flex flex-col">
              <Input type="text" size="large" placeholder="ลิ้งค์" value={documentLink} onChange={(e) => setDocumentLink(e.target.value)} />
              <Button onClick={handleUpload} disabled={documentLink === ""} type="primary" className="mt-4 bg-indigo-600 hover:bg-indigo-700">แนบ</Button>
            </div>
          </Modal>
        </div>

      )}
    </>
  );
}

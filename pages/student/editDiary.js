import { Button, Card, message } from "antd";
import React, { useEffect, useState } from "react";
import StudentNavbar from "../Components/StudentNavbar";
import { useRouter } from "next/router";
import axiosInstance from "../../utils/axios";
import FormEditDiary from "../Components/FormEditDiary";

export default function EditDiary() {
  const router = useRouter();
  const [data, setData] = useState();
  const [dataStore, setDataStore] = useState();
  const [messageApi, contextHolder] = message.useMessage();

  const messageError = () => {
    messageApi.open({
      type: "error",
      content: "ลบข้อมูลไม่สำเร็จ!",
    });
  };
  const messageSuccess = () => {
    messageApi.open({
      type: "success",
      content: "ลบข้อมูลเรียบร้อย!",
    });
  }

  useEffect(() => {
    const stored = localStorage.getItem("user");
    setDataStore(stored ? JSON.parse(stored) : fallbackValue);
  }, []);
  let dataObj = {};
  useEffect(() => {
    if (dataStore) {
      axiosInstance
        .get(`Diary/oneDiaryId/${router.query.id}/${dataStore?.data?.id}`)
        .then((res) => {
          dataObj = {
            status: 200,
            message: "success",
          };
          setData(res.data);
        })
        .catch((error) => {
          dataObj = {
            status: 404,
            message: "error",
            detail: error,
          };
        });
    }
  }, [router, dataStore]);
  const removeDiary = async (data) => {
    const deleteDiary = await axiosInstance.delete(`Diary/removeDiary/${data.diaryId}/${data.detailId}`)
    if (deleteDiary.status === 200) {
      messageSuccess()
      setTimeout(() => {
        router.back()
      }, 1500)
    } else {
      messageError()
    }

  };
  return (
    <>
      {contextHolder}
      {data && (
        <>

          <StudentNavbar />
          <header className="bg-white shadow">
            <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
              <h3 className=" text-xl font-bold  tracking-tight text-gray-900 inline">
                {dataStore?.data?.title_name +
                  dataStore?.data?.fname_TH +
                  " " +
                  dataStore?.data?.lname_TH}
              </h3>
            </div>
          </header>
          <main>
            <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
              <Card style={{ width: "90%" }} title={"บันทึกประจำวัน"}>
                <FormEditDiary data={data} />
                <Button
                  htmlType="submit"
                  onClick={(e) => {
                    if (window.confirm("ยืนยันการลบข้อมูล")) {
                      removeDiary({ diaryId: data.id, detailId: data.Detail.id });
                    }
                  }}
                  className="w-full text-white bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-white-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm  text-center"
                >
                  ลบบันทึกประจำวัน
                </Button>
              </Card>
            </div>
          </main>
        </>
      )}
    </>
  );
}

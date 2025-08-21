import React, { useState, useEffect } from "react";
import UserNavbar from "../Components/UserNavbar";
import { Table, Button, Modal, Input } from "antd";
import { useRouter } from "next/router";
import axiosInstance from "../../utils/axios";
import { useCookies } from "react-cookie";
import { DiffFilled, CommentOutlined } from "@ant-design/icons";
export default function FormListStudent09() {
  const router = useRouter();
  const [data, setData] = useState();
  const [dummyState, rerender] = React.useState(1);
  const [searchText, setsearchText] = useState("");
  const [cookies, setCookie] = useCookies(["jwt"]);
  const [UserId, setId] = useState();
  const [isLogin, setIsLogin] = useState(false);
  const [dataStore, setDataStore] = useState();
  const [dataUser, setDataUser] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [commentModal, setCommentModal] = useState();
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
      .get("assessment/getScoreForm09/" + UserId)
      .then(function (response) {
        setData(response.data);
      })
      .catch((err) => console.log(err));
  }, [dummyState, UserId]);

  useEffect(() => {
    rerender(dummyState + 1);
  }, [router]);

  const openComment = (value) => {
    console.log(value);
    setOpenModal(true);
    setCommentModal(value);
  };
  const closeComment = () => {
    setOpenModal(false);
  };

  const columns = [
    {
      title: "ชื่อ-นามสกุล",
      key: "name",
      sorter: true,
      render: (_, record) => {
        return (
          <p>
            {record.JoinStudent.fname_TH + " " + record.JoinStudent.lname_TH}
          </p>
        );
      },
      filteredValue: [searchText],
      onFilter: (value, record) => {
        return (
          String(record.JoinStudent.fname_TH)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.JoinStudent.lname_TH)
            .toLowerCase()
            .includes(value.toLowerCase())
        );
      },
    },
    {
      title: "หมู่เรียน",
      key: "age",
      responsive: ["lg"],
      render: (_, record) => {
        return <p>{record.JoinStudent.student_group}</p>;
      },
    },
    {
      title: "คะแนนจากอาจารย์",
      key: "branch",
      align: "center",
      width: "10%",
      responsive: ["md", "sm"],
      render: (_, record) => {
        let sumScore08 =
          parseInt(record.JoinForm08.score1_1) +
          parseInt(record.JoinForm08.score1_2) +
          parseInt(record.JoinForm08.score1_3) +
          parseInt(record.JoinForm08.score1_4) +
          parseInt(record.JoinForm08.score1_5) +
          parseInt(record.JoinForm08.score2_1) +
          parseInt(record.JoinForm08.score2_2) +
          parseInt(record.JoinForm08.score2_3) +
          parseInt(record.JoinForm08.score2_4) +
          parseInt(record.JoinForm08.score2_5);
        return <text>{isNaN(sumScore08) ? 0 : sumScore08 * 2}</text>;
      },
    },
    {
      title: "คะแนนจากพี่เลี้ยง",
      key: "branch",
      align: "center",
      width: "10%",
      responsive: ["md", "sm"],
      render: (_, record) => {
        const sumScore09 =
          parseInt(record.JoinForm09.score1_1) +
          parseInt(record.JoinForm09.score1_2) +
          parseInt(record.JoinForm09.score1_3) +
          parseInt(record.JoinForm09.score1_4) +
          parseInt(record.JoinForm09.score1_5) +
          parseInt(record.JoinForm09.score1_6) +
          parseInt(record.JoinForm09.score1_7) +
          parseInt(record.JoinForm09.score2_1) +
          parseInt(record.JoinForm09.score2_2) +
          parseInt(record.JoinForm09.score2_3) +
          parseInt(record.JoinForm09.score3_1) +
          parseInt(record.JoinForm09.score3_2) +
          parseInt(record.JoinForm09.score3_3) +
          parseInt(record.JoinForm09.score3_4) +
          parseInt(record.JoinForm09.score3_5) +
          parseInt(record.JoinForm09.score4_1) +
          parseInt(record.JoinForm09.score4_2) +
          parseInt(record.JoinForm09.score4_3) +
          parseInt(record.JoinForm09.score4_4) +
          parseInt(record.JoinForm09.score4_5);
        return <text>{isNaN(sumScore09) ? 0 : sumScore09}</text>;
      },
    },
    {
      title: "คะแนนรวม",
      key: "branch",
      align: "center",
      width: "10%",
      responsive: ["xs", "sm", "md"],
      render: (_, record) => {
        const sumScore08 =
          (parseInt(record.JoinForm08.score1_1) +
            parseInt(record.JoinForm08.score1_2) +
            parseInt(record.JoinForm08.score1_3) +
            parseInt(record.JoinForm08.score1_4) +
            parseInt(record.JoinForm08.score1_5) +
            parseInt(record.JoinForm08.score2_1) +
            parseInt(record.JoinForm08.score2_2) +
            parseInt(record.JoinForm08.score2_3) +
            parseInt(record.JoinForm08.score2_4) +
            parseInt(record.JoinForm08.score2_5)) *
          2 || 0;

        const sumScore09 =
          parseInt(record.JoinForm09.score1_1) +
          parseInt(record.JoinForm09.score1_2) +
          parseInt(record.JoinForm09.score1_3) +
          parseInt(record.JoinForm09.score1_4) +
          parseInt(record.JoinForm09.score1_5) +
          parseInt(record.JoinForm09.score1_6) +
          parseInt(record.JoinForm09.score1_7) +
          parseInt(record.JoinForm09.score2_1) +
          parseInt(record.JoinForm09.score2_2) +
          parseInt(record.JoinForm09.score2_3) +
          parseInt(record.JoinForm09.score3_1) +
          parseInt(record.JoinForm09.score3_2) +
          parseInt(record.JoinForm09.score3_3) +
          parseInt(record.JoinForm09.score3_4) +
          parseInt(record.JoinForm09.score3_5) +
          parseInt(record.JoinForm09.score4_1) +
          parseInt(record.JoinForm09.score4_2) +
          parseInt(record.JoinForm09.score4_3) +
          parseInt(record.JoinForm09.score4_4) +
          parseInt(record.JoinForm09.score4_5) || 0;

        return sumScore08 + sumScore09;
      },
    },
    {
      title: "คำแนะนำ",
      key: "branch",
      align: "center",
      width: "10%",
      responsive: ["xs", "sm", "md"],
      render: (_, record) => (
        <Button
          icon={<CommentOutlined style={{ fontSize: "20px" }} />}
          onClick={() =>
            openComment({
              commentForm08: record.JoinForm08.comment,
              commentForm09: record.JoinForm09.comment,
            })
          }
          className={" bg-blue-300"}
          type="primary"
        ></Button>
      ),
    },
    {
      title: "ลงคะแนน",
      key: "actionEdit",
      width: "10%",
      align: "center",
      responsive: ["xs", "sm", "md"],
      render: (_, record) => (
        <Button
          icon={<DiffFilled style={{ fontSize: "20px" }} />}
          onClick={() => ToForm(record.JoinStudent.id)}
          className={" bg-yellow-300"}
          type="primary"
        ></Button>
      ),
    },
  ];

  const ToForm = (student_id) => {
    router.push({
      pathname: "formInTP_09",
      query: {
        id: student_id,
      },
    });
  };
  return (
    <>
      <div>
        <UserNavbar />
        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
            <h3 className=" text-xl font-bold  tracking-tight text-gray-900 inline">
              คะแนนการประเมิน แบบประเมินผลการปฏิบัติงานของผู้นิเทศประจำหน่วยงาน
            </h3>
            <p className=" text-blue-700 inline"></p>
          </div>
        </header>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <Table
            dataSource={data}
            rowKey={(obj) => obj.id}
            columns={columns}
            style={{ overflow: "auto" }}
          />
        </div>
      </div>
      <Modal open={openModal} footer={() => []} onCancel={closeComment}>
        <>
          <label className="mt-3">คำแนะนำจากอาจารย์</label>
          <Input.TextArea value={commentModal?.commentForm08} readOnly />
          <label className="mt-3">คำแนะนำจากพี่เลี้ยง</label>
          <Input.TextArea value={commentModal?.commentForm09} readOnly />
        </>
      </Modal>
    </>
  );
}

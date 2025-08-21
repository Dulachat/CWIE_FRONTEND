import React, { useEffect, useState } from "react";
import { Space, Table, Tag, Button, Modal, Form, Input, Select } from "antd";
import { EyeOutlined, SettingOutlined } from "@ant-design/icons";
import UserNavbar from "../Components/UserNavbar";
import FormInfoDiary from "../Components/FormInfoDairy";
import { useRouter } from "next/router";
import axiosInstance from "../../utils/axios";
import { useCookies } from "react-cookie";
export default function ListDiary() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [UserId, setUserId] = useState();
  const [companyId, setCompanyId] = useState();
  const [isLogin, setIsLogin] = useState(false);
  const [dataStore, setDataStore] = useState();
  const [dataUser, setDataUser] = useState();
  const [data, setData] = useState();
  const [headerSelection, setHeaderSelection] = useState();
  const [headerData, setHeader] = useState(undefined);
  useEffect(() => {
    const stored = localStorage.getItem("user");
    setDataStore(stored ? JSON.parse(stored) : null);
  }, []);
  useEffect(() => {
    if (dataStore === undefined) return;
    setDataUser(dataStore.data);
  }, [dataStore]);
  useEffect(() => {
    if (dataUser === undefined) return;
    if (dataUser.userLevelJoin.level_name === "พี่เลี้ยง") {
      setIsLogin(true);
      setCompanyId(dataUser.company_id);
      setUserId(dataUser.id);
    } else if (dataUser.userLevelJoin.level_name === "อาจารย์") {
      setIsLogin(true);
      setCompanyId(dataUser.branch_id);
      setUserId(dataUser.id);
    } else {
      router.push("/auth/login");
    }
  }, [dataUser]);
  useEffect(() => {
    if (UserId === undefined) return;
    axiosInstance
      .get(
        `/student/getByBranch/${UserId}/${companyId}/${dataUser.userLevelJoin.level_name}?header=${headerSelection}`
      )
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => console.error(error));
  }, [UserId, companyId, headerSelection]);

  const toDetail = (value) => {
    router.push({
      pathname: "/users/listDiaryDetail",
      query: {
        id: value.student_id,
      },
    });
  };
  const columns = [
    {
      title: "Name",
      key: "name",
      render: (text) => (
        <a>{text.JoinStudent.fname_TH + " " + text.JoinStudent.lname_TH}</a>
      ),
    },
    {
      title: "Company",
      key: "company",
      render: (text) => <a>{text.JoinCompany.company_name}</a>,
    },
    {
      title: "Branch",
      key: "branch",
      render: (text) => <a>{text.JoinStudent.branchJoin.branch_name}</a>,
    },
    {
      title: "ดูข้อมูล",
      key: "actionInfo",
      width: "10%",
      render: (_, record) => (
        <Button
          icon={<EyeOutlined />}
          className={" bg-sky-500"}
          onClick={() => toDetail(record)}
          type="primary"
        >
          Info
        </Button>
      ),
    },
  ];
  const years = range(2023, new Date().getFullYear() + 1, 1);
  function range(start, end) {
    return new Array(end - start).fill().map((d, i) => i + start + 543);
  }
  const selectYear = (term) => {
    axiosInstance
      .get(`assessment/getHeader?status=1&term=${term}`)
      .then((res) => {
        if (res.data.length > 0) {
          setHeader(res.data);
          setHeaderSelection(res?.data[0]?.id);
        } else {
          setHeader();
          setHeaderSelection();
        }
      })
      .catch((err) => console.log(err));
  };

  const handleOk = () => {
    setOpen(false);
  };
  const handleCancel = () => {
    setOpen(false);
  };
  if (!data) {
    return <></>;
  }
  return (
    <>
      <UserNavbar />
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
          <h3 className=" text-xl font-bold  tracking-tight text-gray-900 inline">
            {" "}
            รายการบันทึกการปฎิบัติงานประจำวัน
          </h3>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <div className="w-full">
            <div className=" float-left">
              <label className="mr-2">ปีการศึกษา :</label>
              <Select
                size="large"
                defaultValue={`1/${years[0]}`}
                className="mr-5 mb-2"
                onChange={(e) => selectYear(e)}
              >
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
            </div>
            {headerData && (
              <div className=" float-left">
                <label className="mr-2">รายการออกฝึก :</label>
                <Select
                  size="large"
                  defaultValue={headerData[0].id}
                  className="mr-5 mb-2"
                  onChange={(e) => setHeaderSelection(e)}
                >
                  {headerData.map((item) => (
                    <Select.Option
                      key={`${item.assessment_name}`}
                      value={item.id}
                    >
                      {item.assessment_name}
                    </Select.Option>
                  ))}
                </Select>
              </div>
            )}
            <Table
              columns={columns}
              rowKey={(obj) => obj.id}
              dataSource={data}
              style={{ overflow: "auto" }}
            />
          </div>
        </div>
      </main>

      {/* //Info content */}
      <Modal
        width={"90%"}
        open={open}
        title="Information"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[]}
      >
        <FormInfoDiary />
      </Modal>
    </>
  );
}

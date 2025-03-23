import React, { useEffect, useState } from 'react'
import { Space, Table, Tag, Button, Modal, Form, Input, Select } from 'antd';
import { EyeOutlined, SettingOutlined } from '@ant-design/icons';
import UserNavbar from '../components/UserNavbar';
import FormInfoDiary from '../components/FormInfoDairy';
import { useRouter } from 'next/router';
import axiosInstance from '../../utils/axios';
import { useCookies } from 'react-cookie';
export default function ListDiary() {

  const router = useRouter();
  const size = "large"

  const [open, setOpen] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [UserId, setUserId] = useState();
  const [companyId, setCompanyId] = useState();
  const [isLogin, setIsLogin] = useState(false)
  const [dataStore, setDataStore] = useState()
  const [dataUser, setDataUser] = useState()
  const [data, setData] = useState()
  useEffect(() => {
    const stored = localStorage.getItem('user');
    setDataStore(stored ? JSON.parse(stored) : fallbackValue);
  }, [])
  useEffect(() => {
    if (dataStore === undefined) return
    setDataUser(dataStore.data)
  }, [dataStore])
  useEffect(() => {
    if (dataUser === undefined) return
    if (dataUser.userLevelJoin.level_name === "พี่เลี้ยง") {
      setIsLogin(true);
      setCompanyId(dataUser.company_id)
      setUserId(dataUser.id)
    }
    else if (dataUser.userLevelJoin.level_name === "อาจารย์") {
      setIsLogin(true);
      setCompanyId(dataUser.branch_id)
      setUserId(dataUser.id)
    }
    else {
      router.push('/auth/login')
    }
  }, [dataUser])
  useEffect(() => {
    if (UserId === undefined) return
    axiosInstance.get('/student/getByBranch/'+UserId+"/"+companyId)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => console.error(error));
  }, [UserId, companyId])
  const handleChange = (value) => {
    setSelectedOption(value);
  };

  const toDetail = (value) => {
    
    router.push(
      {
        pathname: "/users/listDiaryDetail",
        query:{
          id:value.student_id
        }
      }
    )
  }
  const columns = [
    {
      title: 'Name',
      key: 'name',
      render: (text) => <a>{text.JoinStudent.fname_TH + " " + text.JoinStudent.lname_TH}</a>,
    },
    {
      title: 'Company',
      key: 'company',
      render: (text) => <a>{text.JoinCompany.company_name}</a>,
    },
    {
      title: 'Branch',
      key: 'branch',
      render: (text) => <a>{text.JoinStudent.branchJoin.branch_name}</a>,
    },
    {
      title: 'ดูข้อมูล',
      key: 'actionInfo',
      width: "10%",
      render: (_, record) => (

        <Button icon={<EyeOutlined />} className={' bg-sky-500'} onClick={()=>toDetail(record)} type="primary">
          Info
        </Button>

      ),
    },

  ];

  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    // setLoading(true);
    // setTimeout(() => {
    //     setLoading(false);
    //     setOpen(false);
    // }, 3000);
    setOpen(false);
  };
  const handleCancel = () => {
    setOpen(false);
  };


  const showModal2 = () => {
    setOpenAdd(true);
  };
  const handleOkAdd = () => {

    setOpenAdd(false);
  };
  const handleCancelAdd = () => {
    setOpenAdd(false);
  };

  const showModalEdit = () => {
    setOpenEdit(true);
  };
  const handleOkEdit = () => {

    setOpenEdit(false);
  };
  const handleCancelEdit = () => {
    setOpenEdit(false);
  };

  return (
    <>
      <UserNavbar />
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
          <h3 className=" text-xl font-bold  tracking-tight text-gray-900 inline"> รายการบันทึกการปฎิบัติงานประจำวัน</h3>

        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <div className='w-full'>

            <Table columns={columns} rowKey={obj => obj.id} dataSource={data} style={{ overflow: "auto" }} />
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
        footer={[



        ]}
      >
        <FormInfoDiary />
      </Modal>



    </>
  )
}

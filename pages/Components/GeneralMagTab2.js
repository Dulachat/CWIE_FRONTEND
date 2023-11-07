import React, { useEffect, useState } from 'react'
import { Space, Table, Tag, Button, Modal, Form, Input, Select, Tabs, Row, message } from 'antd';
import { EyeOutlined, SettingOutlined, DeleteOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import axiosInstance from '../../utils/axios'
import FormEditBranch from './FormEditBranch';

export default function GeneralMagTab2() {
  const size = "large";
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();
  const [data, setData] = useState([]);
  const [dataEdit, setEditData] = useState([null]);
  const [dummyState, rerender] = React.useState(1);
  const [id, setId] = useState(null);
  useEffect(() => {
    axiosInstance.get('branch/allBranch')
      .then(function (response) {
        setData(response.data)
      })
  }, [dummyState])

  
  useEffect(() => {
    rerender(dummyState + 1);
    setOpen(false);
    setOpenEdit(false);
  }, [router])

  useEffect(() => {
    axiosInstance.get('branch/oneBranch/'+id)
      .then(function (response) {
  
        setEditData(response.data)
      })
  }, [setId, id])


  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    messageApi.open({
      type: 'success',
      content: 'เพิ่มข้อมูลเรียบร้อย',
    });
    rerender(dummyState + 1);
    setOpen(false);
  };
  const handleCancel = () => {
    setOpen(false);
  };

  const showModalEdit = (id) => {
    setId(id);
    setOpenEdit(true);
  };
  const handleOkEdit = () => {
    rerender(dummyState + 1);
    // setTimeout(() => {
    //     setLoading(false);
    //     setOpen(false);
    // }, 3000);
    setOpenEdit(false);
  };
  const handleCancelEdit = () => {
    setOpenEdit(false);
  };

  const onDelete = (id) => {
    axiosInstance.delete('company/deleteCompany/' + id)
      .then(function (response) {
        messageApi.open({
          type: 'success',
          content: 'ลบข้อมูลเรียบร้อย',
        });
      })
    rerender(dummyState + 1);
  };

  const columns = [
    {
      title: 'สาขาวิชา',
      dataIndex: 'branch_name',
      key: 'branch_name',
    },

    {
      title: 'แก้ไข',
      key: 'actionEdit',
      width: "10%",
      render: (_, record) => (

        <Button icon={<SettingOutlined />} className={' bg-yellow-300'} onClick={()=>showModalEdit(record.id)} type="primary">
          Edit
        </Button>

      ),
    },
  
  ];


  const sendData = (value) => {
    const axios = require('axios');
    let data = JSON.stringify({
      "branch_name": value.branch_name
    });
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: process.env.NEXT_PUBLIC_API_URL + "branch/createBranch",
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };
    axios.request(config)
      .then((response) => {
        if (response.data === "error") {
          { handleCancel() }
        }
        if (response.data === "success") {
          { handleOk() }
        }
      })
      .catch((error) => {
        console.log(error);
      });

  }
  return (
    <>
      {contextHolder}
      <div className='w-full '>
        <div className='mr-5 float-right'>
          <button type="button" onClick={showModal} className="  text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
            เพิ่มสาขาวิชา
          </button>
        </div>
        <div className='w-full'>
          <label>รายชื่อสาขาวิชา</label>
          <Table columns={columns}  dataSource={data} pagination={5} style={{ overflow: "auto" }} />
        </div>
      </div  >

      {/* //Add content */}
      <Modal
        width={"90%"}
        open={open}
        title="เพิ่มข้อมูลสาขาวิชา"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[

        ]}
      >
        <Form name='addBranch' onFinish={sendData}>
          <Row>
            <div className='w-full mt-1 px-1'>
              <Form.Item >
                <label>ชื่อสาขาวิชา</label>
                <Form.Item name="branch_name" noStyle><Input className=' bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' /></Form.Item>
                {/* <span>description</span> */}
              </Form.Item>
            </div>
          </Row>
          <div className='w-full mt-2'>
            <Button className=" text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2" htmlType='submit' block size={size}>
              บันทึกข้อมูล
            </Button>
          </div>

        </Form>
      </Modal>

      {/* Edit contents */}
      <Modal
        width={"90%"}
        open={openEdit}
        title="แก้ไขสาขาวิชา"
        onOk={handleOkEdit}
        onCancel={handleCancelEdit}
        footer={[

        ]}
      >
        <FormEditBranch  data={dataEdit}/>
       
      </Modal>
    </>



  )
}


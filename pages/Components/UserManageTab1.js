import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';
import { Space, Table, Tag, Button, Modal, Form, Input, Select, message } from 'antd';
import { EyeOutlined, SettingOutlined, DeleteOutlined } from '@ant-design/icons';

import { useRouter } from 'next/router';
import axiosInstance from '../../utils/axios'

import FormAddUser from '../Components/FormAddUser';
import FormEditUser from '../Components/FormEditUser';

const size = "large"
export default function UserManageTab1() {
    const router = useRouter();
    const [openAdd, setOpenAdd] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [data, setData] = useState([]);
    const [dataEdit, setDataEdit] = useState([]);
    const [dummyState, rerender] = React.useState(1);
    const [messageApi, contextHolder] = message.useMessage();
    const [searchText, setsearchText] = useState("");
    useEffect(() => {
        axiosInstance.get('users/allUsers')
            .then(function (response) {
                setData(response.data)
            })
    }, [dummyState])

    useEffect(() => {
        rerender(dummyState + 1);
        setOpenEdit(false);
        setOpenAdd(false);
    }, [router])

    const showModal2 = () => {
        setOpenAdd(true);
    };
    const handleOkAdd = () => {
        setOpenAdd(false);
    };
    const handleCancelAdd = () => {
        setOpenAdd(false);
    };

    const showModalEdit = (data) => {
        setDataEdit(data)
        rerender(dummyState + 1);
        setOpenEdit(true);
    };
    const handleOkEdit = () => {
        setOpenEdit(false);
    };
    const handleCancelEdit = () => {
        setOpenEdit(false);
    };

    const columns = [
        {
            title: 'ชื่อ-นามสกุล',
            key: 'name',
            sorter: true,
            render: (_, record) => {
                return <p>{record.fname_TH + " " + record.lname_TH}</p>
            },
            filteredValue: [searchText],
            onFilter: (value, record) => {
                return (

                    String(record.fname_TH)
                        .toLowerCase()
                        .includes(value.toLowerCase()) ||
                    String(record.lname_TH)
                        .toLowerCase()
                        .includes(value.toLowerCase())

                );

            },
        },
        {
            title: 'ระดับผู้ใช้งาน',
            key: 'userLevel',
            render: (text) =>
                <p>{text.userLevelJoin.level_name}</p>
            ,
        },
        {
            title: 'แก้ไข',
            key: 'actionEdit',
            width: "10%",
            render: (_, record) => (

                <Button icon={<SettingOutlined />} className={' bg-yellow-300'} onClick={(e) => showModalEdit(record)} type="primary">
                    Edit
                </Button>

            ),
        },
        {
            title: 'ลบ',
            key: 'actionDelete',
            width: "10%",
            render: (_, record) => (

                <Button icon={<DeleteOutlined />} onClick={(e) => { if (window.confirm("ยืนยันการลบข้อมูล")) { sendDelete(record.id) } }} className={'bg-red-600'} type="primary">
                    Delete
                </Button>

            ),
        },
    ];

    const sendDelete = (id) => {
        axiosInstance.delete('users/deleteUsers/' + id)
            .then(function (response) {
                messageApi.open({
                    type: 'success',
                    content: 'ลบข้อมูลเรียบร้อย',
                });
            })
        rerender(dummyState + 1);
    }

    return (
        <>{contextHolder}
            {/* <Navbar /> */}

            <main>
                <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                    <div className='mr-5 float-right'>
                        <button type="button" onClick={showModal2} className="  text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                            เพิ่มผู้ใช้งาน
                        </button>
                    </div>
                    <div className='w-full px-2 my-3'>
                        <Input
                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                            placeholder="ค้นหารายชื่อผู้ใช้งาน"
                            size={size}
                            onChange={(e) => {
                                setsearchText(e.target.value);
                            }}
                            onPressEnter={(e) => {
                                setsearchText(e.target.value);
                            }}
                        />
                    </div>
                    <Table columns={columns} rowKey={obj => obj.id} dataSource={data} style={{ overflow: "auto" }} />
                </div>
            </main>

            {/* //Info content */}
            {/* <Modal
                width={"90%"}
                open={open}
                title="Title"
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[

                

                ]}
            >
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal> */}

            {/* //Add content */}
            <Modal
                width={"90%"}
                open={openAdd}
                title="เพิ่มข้อมูลผู้ใช้งาน"
                onOk={handleOkAdd}
                onCancel={handleCancelAdd}
                footer={[

                ]}
            >
                <FormAddUser />
            </Modal>

            {/* Edit contents */}
            <Modal
                width={"90%"}
                open={openEdit}
                title="แก้ไขข้อมูลผู้ใช้งาน"
                onOk={handleOkEdit}
                onCancel={handleCancelEdit}
                footer={[

                ]}
            >
                <FormEditUser data={dataEdit} />
            </Modal>

        </>

    )
}

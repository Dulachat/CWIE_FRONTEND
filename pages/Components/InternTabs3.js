import React from 'react'
import { useState } from 'react';
import Navbar from './Navbar';
import { Space, Table, Tag, Button, Modal, Form, Input, Select, Tabs } from 'antd';
import { EyeOutlined, SettingOutlined } from '@ant-design/icons';
const size = "large"
export default function InternTabs3() {


    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [openAdd, setOpenAdd] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const columns = [
        {
            title: 'No.',
            dataIndex: 'no',
            key: 'no',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'ชื่อ',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'สาขาวิชา',
            dataIndex: 'branch',
            key: 'branch',
        },
        {
            title: 'ชื่ออาจารย์ประจำสาขา',
            dataIndex: 'user1',
            key: 'user1',
        },
        {
            title: 'ชื่ออาจารย์นิเทศก์',
            dataIndex: 'user2',
            key: 'user2',
        },
        {
            title: 'ชื่อพี่เลี้ยง',
            dataIndex: 'user3',
            key: 'user3',
        },
        {
            title: 'Edit',
            key: 'actionEdit',
            width: "10%",
            render: (_, record) => (

                <Button icon={<SettingOutlined />} className={' bg-yellow-300'} onClick={showModalEdit} type="primary">
                    Edit
                </Button>

            ),
        },
        {
            title: 'Delete',
            key: 'actionDelete',
            width: "10%",
            render: (_, record) => (

                <Button icon={<SettingOutlined />} className={' bg-red-600 text-white'} onClick={showModalEdit} >
                    Edit
                </Button>

            ),
        },
    ];
    const data = [  //Make data
        {
            no: '1',
            name: 'อัฐพล พลฤทธิ์',
            branch: "วิทยาการคอมพิวเตอร์",
            user1: 'ดุลชาติ ศิริวัลภ',
            user2: 'ดุลชาติ ศิริวัลภ',
            user3: 'ดุลชาติ ศิริวัลภ'
        },

    ];


    const showModalAdd = () => {
        setOpenAdd(true);
    };
    const handleOkAdd = () => {
        // setLoading(true);
        // setTimeout(() => {
        //     setLoading(false);
        //     setOpen(false);
        // }, 3000);
        setOpenAdd(false);
    };
    const handleCancelAdd = () => {
        setOpenAdd(false);
    };

    const showModalEdit = () => {
        setOpenEdit(true);
    };
    const handleOkEdit = () => {
        // setLoading(true);
        // setTimeout(() => {
        //     setLoading(false);
        //     setOpen(false);
        // }, 3000);
        setOpenEdit(false);
    };
    const handleCancelEdit = () => {
        setOpenEdit(false);
    };

    const companyOptions = [
        { value: '1', label: 'Advice' }
    ]

    const internOptions = [
        { value: '1', label: 'นิเทศก์ฝึกประสบการณ์ครั้งที่1' }
    ]

    const studentOptions = [

        { value: '1', label: 'อัฐพล พลฤทธิ์' },
        { value: '2', label: 'สมศักดิ์ สมหมาย' },
        { value: '3', label: 'ชานนท์ แก้วพรหรม' },
        { value: '4', label: 'ชัชชัย ศรีสวัสดิ์' },
    ]

    return (
        <div>
            <div key={"undefined3"}>
                <div className='w-full'>
                    <div className=' float-right'>
                        <button type="button" onClick={showModalAdd} className="mr-5 text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                            จัดการผู้ประเมินนักศึกษา
                        </button>
                    </div>
                    <Table columns={columns} dataSource={data} style={{ overflow: "auto" }} />
                </div>
                {/* //Add content */}
                <Modal
                    width={"90%"}
                    open={openAdd}
                    title="เพิ่มรายการผู้ประเมินนักศึกษา"
                    onOk={handleOkAdd}
                    onCancel={handleCancelAdd}
                    footer={[
                    ]}
                >
                     <Form>
                        {/* <div className='w-full mt-2'>
                            <label className="block mb-2 text-sm font-medium text-gray-900  dark:text-white">ชื่อรายการออกฝึก</label>
                            <Form.Item
                                name={"intern_id"}

                            >
                                <Select options={internOptions} size={size} disabled>

                                </Select>
                            </Form.Item>
                        </div> */}
                        <div className='w-full '>
                            <label className="block mb-2 text-sm font-medium text-gray-900  dark:text-white">รายชื่อนักศึกษา
                            <Form.Item
                                name={"student_id"}

                            >
                                <Select options={studentOptions} size={size} >

                                </Select>
                            </Form.Item>
                            </label>
                        </div>
                        <div className='w-full '>
                            <label className="block mb-2 text-sm font-medium text-gray-900  dark:text-white">รายชื่ออาจารย์ประจำสาขา
                            <Form.Item
                                name={"user_id1"}

                            >
                                <Select options={studentOptions} size={size}>

                                </Select>
                            </Form.Item>
                            </label>
                        </div>
                        <div className='w-full '>
                            <label className="block mb-2 text-sm font-medium text-gray-900  dark:text-white">รายชื่ออาจารย์นิเทศก์
                            <Form.Item
                                name={"user_id2"}

                            >
                                <Select options={studentOptions} size={size}>

                                </Select>
                            </Form.Item>
                            </label>
                        </div>
                        <div className='w-full '>
                            <label className="block mb-2 text-sm font-medium text-gray-900  dark:text-white">รายชื่อพี่เลี้ยง
                            <Form.Item
                                name={"user_id3"}

                            >
                                <Select options={studentOptions} size={size}>

                                </Select>
                            </Form.Item>
                            </label>
                        </div>
                        <div className='w-full'>
                            <Button className=" text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2" htmlType="submit" block size={size}>
                                บันทึกข้อมูล
                            </Button>
                        </div>
                    </Form>

                </Modal>

                {/* Edit contents */}
                <Modal
                    width={"90%"}
                    open={openEdit}
                    title="แก้ไขรายการผู้ประเมินนักศึกษา"
                    onOk={handleOkEdit}
                    onCancel={handleCancelEdit}
                    footer={[

                    ]}
                >
                    <Form>
                        {/* <div className='w-full mt-2'>
                            <label className="block mb-2 text-sm font-medium text-gray-900  dark:text-white">ชื่อรายการออกฝึก</label>
                            <Form.Item
                                name={"intern_id"}

                            >
                                <Select options={internOptions} size={size} disabled>

                                </Select>
                            </Form.Item>
                        </div> */}
                        <div className='w-full '>
                            <label className="block mb-2 text-sm font-medium text-gray-900  dark:text-white">รายชื่อนักศึกษา
                            <Form.Item
                                name={"student_id"}

                            >
                                <Select options={studentOptions} size={size} disabled>

                                </Select>
                            </Form.Item>
                            </label>
                        </div>
                        <div className='w-full '>
                            <label className="block mb-2 text-sm font-medium text-gray-900  dark:text-white">รายชื่ออาจารย์ประจำสาขา
                            <Form.Item
                                name={"user_id1"}

                            >
                                <Select options={studentOptions} size={size}>

                                </Select>
                            </Form.Item>
                            </label>
                        </div>
                        <div className='w-full '>
                            <label className="block mb-2 text-sm font-medium text-gray-900  dark:text-white">รายชื่ออาจารย์นิเทศก์
                            <Form.Item
                                name={"user_id2"}

                            >
                                <Select options={studentOptions} size={size}>

                                </Select>
                            </Form.Item>
                            </label>
                        </div>
                        <div className='w-full '>
                            <label className="block mb-2 text-sm font-medium text-gray-900  dark:text-white">รายชื่อพี่เลี้ยง
                            <Form.Item
                                name={"user_id3"}

                            >
                                <Select options={studentOptions} size={size}>

                                </Select>
                            </Form.Item>
                            </label>
                        </div>
                        <div className='w-full'>
                            <Button className=" text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2" htmlType="submit" block size={size}>
                                บันทึกข้อมูล
                            </Button>
                        </div>
                    </Form>
                </Modal>
            </div>
        </div>

    )
}

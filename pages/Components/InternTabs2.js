import React from 'react'
import { useState } from 'react';
import Navbar from './Navbar';
import { Space, Table, Tag, Button, Modal, Form, Input, Select, Tabs } from 'antd';
import { EyeOutlined, SettingOutlined } from '@ant-design/icons';
const size = "large"
export default function InternTabs2() {


    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [openAdd, setOpenAdd] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const columns = [
        {
            title: 'No.',
            dataIndex: 'key',
            key: 'key',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'ชื่อนักศึกษา',
            dataIndex: 'student_name',
            key: 'student_name',
        },
        {
            title: 'ชื่อสถานประกอบการณ์',
            dataIndex: 'company',
            key: 'company',
        },
        {
            title: 'Edit',
            key: 'actionEdit',
            width: "10%",
            render: (_, record) => (

                <Button icon={<SettingOutlined />} className={' bg-yellow-300 text-white'} onClick={showModalEdit} >
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
            key: '1',
            student_name: 'อัฐพล พลฤทธิ์',
            company: 'Advice Services'
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
            <div key={"undefined2"}>
                <div className='w-full'>
                    <div className=' float-right'>
                        <button type="button" onClick={showModalAdd} className="mr-5 text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                            จัดการรายการออกฝึก
                        </button>
                    </div>
                    <Table columns={columns} dataSource={data} style={{ overflow: "auto" }} />
                </div>
                {/* //Add content */}
                <Modal
                    width={"90%"}
                    open={openAdd}
                    title="เพิ่มรายการออกฝึก"
                    onOk={handleOkAdd}
                    onCancel={handleCancelAdd}
                    footer={[
                    ]}
                >
                    <Form>
                        <div className='w-full mt-2'>
                            <label className="block mb-2 text-sm font-medium text-gray-900  dark:text-white">ชื่อรายการออกฝึก</label>
                            <Form.Item
                                name={"intern_id"}

                            >
                                <Select defaultValue={"1"} options={internOptions} size={size}>

                                </Select>
                            </Form.Item>
                        </div>
                        <div className='w-full '>
                            <label className="block mb-2 text-sm font-medium text-gray-900  dark:text-white">รายชื่อนักศึกษา</label>
                            <Form.Item
                                name={"student_id"}

                            >
                                <Select options={studentOptions} size={size}>

                                </Select>
                            </Form.Item>
                        </div>
                        <div className='w-full '>
                            <label className="block mb-2 text-sm font-medium text-gray-900  dark:text-white">รายชื่อสถานประกอบการณ์</label>
                            <Form.Item
                                name={"company"}

                            >
                                <Select options={companyOptions} size={size}>

                                </Select>
                            </Form.Item>
                        </div>
                     
                        <div className='w-full'>
                            <Button onClick={handleOkAdd} className=" text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2" htmlType="submit" block size={size}>
                                บันทึกข้อมูล
                            </Button>
                        </div>
                    </Form>

                </Modal>

                {/* Edit contents */}
                <Modal
                    width={"90%"}
                    open={openEdit}
                    title="แก้ไขรายการออกฝึก"
                    onOk={handleOkEdit}
                    onCancel={handleCancelEdit}
                    footer={[

                    ]}
                >
                   <Form>
                        <div className='w-full mt-2'>
                            <label className="block mb-2 text-sm font-medium text-gray-900  dark:text-white">ชื่อรายการออกฝึก
                            <Form.Item
                                name={"intern_id"}

                            >
                                <Select defaultValue={"1"} options={internOptions} size={size}>

                                </Select>
                            </Form.Item>
                            </label>
                        </div>
                        <div className='w-full '>
                            <label className="block mb-2 text-sm font-medium text-gray-900  dark:text-white">รายชื่อนักศึกษา
                            <Form.Item
                                name={"student_id"}

                            >
                                <Select options={studentOptions} size={size}>

                                </Select>
                            </Form.Item>
                            </label>
                        </div>
                        <div className='w-full '>
                            <label className="block mb-2 text-sm font-medium text-gray-900  dark:text-white">รายชื่อสถานประกอบการณ์
                            <Form.Item
                                name={"company"}

                            >
                                <Select options={companyOptions} size={size}>

                                </Select>
                            </Form.Item>
                            </label>
                        </div>
                     
                        <div className='w-full'>
                            <Button onClick={handleOkEdit} className=" text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2" htmlType="submit" block size={size}>
                                บันทึกข้อมูล
                            </Button>
                        </div>
                    </Form>
                </Modal>
            </div>
        </div>
    )
}

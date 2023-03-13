import React from 'react'
import { useState } from 'react';
import Navbar from './Navbar';
import { Space, Table, Tag, Button, Modal, Form, Input, Select, Tabs } from 'antd';
import { EyeOutlined, SettingOutlined } from '@ant-design/icons';
const size = "large"
export default function InternTabs1(key) {


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
            title: 'ชื่อรายการออกฝึก',
            dataIndex: 'internshipName',
            key: 'internshipName',
        },
        {
            title: 'ปีการศึกษา',
            dataIndex: 'year',
            key: 'year',
        },
        {
            title: 'วันที่เริ่ม',
            dataIndex: 'start_date',
            key: 'start_date',
        },
        {
            title: 'วันที่เริ่ม',
            dataIndex: 'end_date',
            key: 'end_date',
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
    ];
    const data = [  //Make data
        {
            key: '1',
            internshipName: 'นิเทศนักศึกษาปีการศึกษา 2565',
            year: "2565/2",
            start_date: '12/2/2565',
            end_date: '12/2/2565'
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



    const yearTermOptions = [

        { value: '1', label: '2/2565' },
        { value: '2', label: '1/2566' },
    ]


    return (
        <>
            <div className='w-full'>
                <div className='float-right'>
                    <button type="button" onClick={showModalAdd} className="mr-5 text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                        เพิ่มการประเมิน
                    </button>
                </div>
                <Table key={key} columns={columns} dataSource={data} style={{ overflow: "auto" }} />
            </div>
            {/* //Add content */}
            <Modal
                key={key}
                width={"90%"}
                open={openAdd}
                title="เพิ่มการประเมิน"
                onOk={handleOkAdd}
                onCancel={handleCancelAdd}
                footer={[
                ]}
            >
                <Form key={"add"}>
                    <div className='w-full'>
                        <label className="block mb-2 text-sm font-medium text-gray-900  dark:text-white"> ชื่อรายการออกฝึก
                            <Form.Item
                                name={"intern_name"}
                                rules={[{ required: true, message: "กรุณากรอก ชื่อรายการออกฝึก" }]}
                            >
                                <Input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                            </Form.Item>
                        </label>
                    </div>


                    <div className='w-full'>
                        <label className="block mb-2 text-sm font-medium text-gray-900  dark:text-white">ปีการศึกษา
                            <Form.Item
                                name={"yearTerm"}
                                rules={[{ required: true, message: "กรุณาเลือก ปีการศึกษา" }]}
                            >
                                <Select options={yearTermOptions} key={key} size={size} />
                            </Form.Item>
                        </label>
                    </div>
                    <div className='w-1/2 inline-block px-1'>

                        <label className="block mb-2 text-sm font-medium text-gray-900  dark:text-white"> วันเริ่มต้น
                            <Form.Item
                                name={"start_date"}
                                rules={[{ required: true, message: "กรุณาเลือก วันเริ่มต้น" }]}
                            >
                                <Input type='date' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                            </Form.Item>
                        </label>
                    </div>
                    <div className='w-1/2 inline-block px-1'>
                        <label className="block mb-2 text-sm font-medium text-gray-900  dark:text-white"> วันสิ้นสุด
                            <Form.Item
                                name={"end_date"}
                                rules={[{ required: true, message: "กรุณาเลือก วันสิ้นสุด" }]}
                            >
                                <Input type='date' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
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
                title="แก้ไขการประเมิน"
                onOk={handleOkEdit}
                onCancel={handleCancelEdit}
                footer={[

                ]}
            >
                <Form key={"edit"}>
                    <div className='w-full'>
                        <label className="block mb-2 text-sm font-medium text-gray-900  dark:text-white"> ชื่อรายการออกฝึก
                            <Form.Item
                                name={"intern_name"}
                                rules={[{ required: true, message: "กรุณากรอก ชื่อรายการออกฝึก" }]}
                            >
                                <Input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                            </Form.Item>
                        </label>
                    </div>


                    <div className='w-full '>
                        <label className="block mb-2 text-sm font-medium text-gray-900  dark:text-white">ปีการศึกษา
                            <Form.Item
                                name={"yearTerm"}
                                rules={[{ required: true, message: "กรุณาเลือก ปีการศึกษา" }]}
                            >
                                <Select options={yearTermOptions} key={key} size={size} />
                            </Form.Item>
                        </label>
                    </div>
                    <div className='w-full '>
                        <label className="block mb-2 text-sm font-medium text-gray-900  dark:text-white"> วันเริ่มต้น
                            <Form.Item
                                name={"start_date"}
                                rules={[{ required: true, message: "กรุณาเลือก วันเริ่มต้น" }]}
                            >
                                <Input type='date' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                            </Form.Item>
                        </label>
                    </div>
                    <div className='w-1/2'>
                        <label className="block mb-2 text-sm font-medium text-gray-900  dark:text-white"> วันสิ้นสุด
                            <Form.Item
                                name={"end_date"}
                                rules={[{ required: true, message: "กรุณาเลือก วันสิ้นสุด" }]}
                            >
                                <Input type='date' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
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

        </>
    )
}

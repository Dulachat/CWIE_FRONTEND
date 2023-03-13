import { Table, Select, Button, Input, Modal } from 'antd';
import React from 'react'
import StudentNavbar from '../components/StudentNavbar'
import { EyeOutlined, SettingOutlined } from '@ant-design/icons';
import { useState } from 'react';
import FormAddDiary from '../components/FormAddDiary';


export default function studentIndex() {
    const [open, setOpen] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openAdd, setOpenAdd] = useState(false);
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


    const data = [  //Make data
        {
            no: '1',
            name: 'John Brown',
            age: 22,
            branch: 'Computer Science',

        },

    ];



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
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
       
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
          
        },
        {
            title: 'branch',
            dataIndex: 'branch',
            key: 'branch',
         
            
        },
        {
            title: 'ดูข้อมูล',
            key: 'actionInfo',
            width: "10%",
           
            render: (_, record) => (
                <Button icon={<EyeOutlined />} onClick={showModal} className={' bg-sky-500'} type="primary">
                    Info
                </Button>
            ),
        },
        {
            title: 'แก้ไข',
            key: 'actionEdit',
            width: "10%",
            render: (_, record) => (

                <Button icon={<SettingOutlined />} onClick={showModalEdit} className={' bg-yellow-300'} >
                    Edit
                </Button>

            ),
        },

    ];

    return (
        <>
            <StudentNavbar />
            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
                    <h3 className=" text-xl font-bold  tracking-tight text-gray-900 inline"> อัฐพล พลฤทธิ์</h3>
                    <p className=' text-blue-700 inline'> บริษัท วันม็อบบี้ จำกัด</p>
                </div>
            </header>
            <main>
                <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                    <div className=' float-right'>
                        <button type="button" onClick={showModalAdd} className=" mr-5 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                            ลงบันทึกประจำวัน
                        </button>
                    </div>
                    <Table columns={columns} dataSource={data} style={{ overflow:"auto" }} />
                </div>
            </main>
            {/* Info */}
            <Modal
                width={"90%"}
                open={open}
                title="Title"
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[

                    <button onClick={handleCancel} type="button" className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                        Cancel
                    </button>,
                    <button onClick={handleOk} type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                        Submit
                    </button>

                ]}
            >
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
            {/* Edit */}
            <Modal
                width={"90%"}
                open={openEdit}
                title="Title"
                onOk={handleOkEdit}
                onCancel={handleCancelEdit}
                footer={[

                    <button onClick={handleCancelEdit} type="button" className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                        Cancel
                    </button>,
                    <button onClick={handleOkEdit} type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                        Submit
                    </button>

                ]}
            >
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
            {/* Add */}
            <Modal
                width={"90%"}
                open={openAdd}
                title="บันทึกประจำวัน"
                onOk={handleOkAdd}
                onCancel={handleCancelAdd}
                footer={[

                ]}
            >
              <FormAddDiary/>
            </Modal>
        </>
    )
}

import { useState } from 'react';
import Navbar from '../Components/Navbar';
import { Space, Table, Tag, Button, Modal, Form, Input, Select } from 'antd';
import { EyeOutlined, SettingOutlined ,DeleteOutlined} from '@ant-design/icons';
import FormAddUser from '../Components/FormAddUser';
import FormEditUser from '../Components/FormEditUser';

const size = "large"
export default function studentMag() {
    const iconSize = "large"
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [openAdd, setOpenAdd] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
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

                <Button icon={<EyeOutlined />} className={' bg-sky-500'} onClick={showModal} type="primary">
                    Info
                </Button>

            ),
        },
        {
            title: 'แก้ไข',
            key: 'actionEdit',
            width: "10%",
            render: (_, record) => (

                <Button icon={<SettingOutlined />} className={' bg-yellow-300'} onClick={showModalEdit} type="primary">
                    Edit
                </Button>

            ),
        },
        {
            title: 'ลบ',
            key: 'actionDelete',
            width: "10%",
            render: (_, record) => (

                <Button icon={<DeleteOutlined />} className={'bg-red-600'} type="primary">
                    Delete
                </Button>

            ),
        },
    ];
    const data = [  //Make data
        {
            key: '1',
            name: 'John Brown',
            age: 22,
            branch: 'Computer Science',

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

    return (
        <>
            <Navbar />
            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">User Management</h1>
                </div>
            </header>
            <main>
                <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                    <div className=' float-right'>
                        <button type="button" onClick={showModal2} className=" mr-5 text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                            เพิ่มผู้ใช้งาน
                        </button>
                    </div>
                    <Table columns={columns} dataSource={data} style={{ overflow: "auto" }} />
                </div>
            </main>

            {/* //Info content */}
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

            {/* //Add content */}
            <Modal
                width={"90%"}
                open={openAdd}
                title="เพิ่มข้อมูลผู้ใช้งาน"
                onOk={handleOkAdd}
                onCancel={handleCancelAdd}
                footer={[

                    <button onClick={handleCancelAdd} type="button" className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                        Cancel
                    </button>
                ]}
            >
                <FormAddUser/>
            </Modal>

            {/* Edit contents */}
            <Modal
                width={"90%"}
                open={openEdit}
                title="แก้ไขข้อมูลผู้ใช้งาน"
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
              <FormEditUser/>
            </Modal>

        </>

    )
}

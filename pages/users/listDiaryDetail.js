import React, { useEffect, useState } from 'react'
import { Space, Table, Tag, Button, Modal, Form, Input, Select } from 'antd';
import { EyeOutlined, SettingOutlined } from '@ant-design/icons';
import UserNavbar from '../components/UserNavbar';
import FormInfoDiary from '../components/FormInfoDairy';
import axiosInstance from '../../utils/axios';
import { useRouter } from 'next/router';


export default function ListDiaryDetail() {
    const size = "large"
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [openAdd, setOpenAdd] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [id, setId] = useState();
    const [selectedOption, setSelectedOption] = useState(null);
    const [data, setData] = useState();
    const [dataDiary, setDataDiary] = useState();
    const [searchText , setSearchText] =useState("")
    useEffect(() => {
        setId(router.query.id)
    }, [router])

    useEffect(() => {
        if (id === undefined) return
        axiosInstance.get('Diary/ListDiary/' + id)
            .then((res) => {
                setData(res.data)

            })
            .catch((error) => console.log(error))
    }, [id])

    const columns = [
        {
            title: 'ชื่อ-นามสกุล',
            key: 'name',
            render: (_, record) => (
                <p>{record.StudentDiary.fname_TH + " " + record.StudentDiary.lname_TH}</p>
            )
        },
        {
            title: 'วันที่',
            dataIndex: 'diary_date',
            key: 'date',
            filteredValue: [searchText],
            onFilter: (value, record) => {
                return (
                    String(record.diary_date)
                        .toLowerCase()
                        .includes(value.toLowerCase()) ||
                    String(record.diary_date)
                        .toLowerCase()
                        .includes(value.toLowerCase())

                );

            },
        },

        {
            title: 'เวลาเข้างาน',
            dataIndex: 'time_in',
            key: 'time_in',
        },
        {
            title: 'เวลาเลิกงาน',
            dataIndex: 'time_out',
            key: 'time_out',
        },
        {
            title: 'ดูข้อมูล',
            key: 'actionInfo',
            width: "10%",
            render: (_, record) => (

                <Button icon={<EyeOutlined />} className={' bg-sky-500'} onClick={(e) => showModal(record)} type="primary">
                    Info
                </Button>

            ),
        },

    ];

    const showModal = (value) => {
        setDataDiary(value)
        setOpen(true);
    };
    const handleOk = () => {
        setOpen(false);
    };
    const handleCancel = () => {
        setOpen(false);
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
                        <div className='w-1/4 float-right'>
                            <Input onChange={(e) => {
                                setSearchText(e.target.value);
                            }} type='date' className=' bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />

                        </div>

                    </div>
                    <Table columns={columns} rowKey={obj => obj.id} dataSource={data} style={{ overflow: "auto" }} />
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
                <FormInfoDiary data={dataDiary} />
            </Modal>



        </>
    )
}

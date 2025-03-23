import React, { useState, useEffect, useMemo } from 'react'
import UserNavbar from '../components/UserNavbar'
import { Table, Button } from 'antd';
import { useRouter } from 'next/router';
import axiosInstance from '../../utils/axios'
import { useCookies } from 'react-cookie';
import { DiffFilled } from '@ant-design/icons';
export default function FormListStudent08() {
    const router = useRouter();
    const [data, setData] = useState([]);
    const [dummyState, rerender] = React.useState(1);
    const [searchText, setsearchText] = useState("");
    const [cookies, setCookie] = useCookies(['jwt']);
    const [UserId, setId] = useState()
    const axios = require('axios');
    const [isLogin, setIsLogin] = useState(false)
    const [dataStore, setDataStore] = useState()
    const [dataUser, setDataUser] = useState()
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
            setIsLogin(true)
            setId(dataUser.id)  
    }, [dataUser])

    useEffect(() => {
        if(UserId === undefined) return
        axiosInstance.get('assessment/getScoreForm08/'+ UserId)
            .then(function (response) {
        
                setData(response.data)
            }).catch((err) => console.log(err))
    }, [dummyState, UserId])

    useEffect(() => {
        rerender(dummyState + 1);
    }, [router])

    const ToForm = (student_id) => {
        router.push({
            pathname: 'formInTP_08',
            query: { id: student_id }
        })
    }

    const columns = [

        {
            title: 'ชื่อ-นามสกุล',
            key: 'name',
            sorter: true,
            render: (_, record) => {
                return <text>{record.JoinStudent.fname_TH + " " + record.JoinStudent.lname_TH}</text>
            },
            filteredValue: [searchText],
            onFilter: (value, record) => {
                return (

                    String(record.JoinStudent.fname_TH)
                        .toLowerCase()
                        .includes(value.toLowerCase()) ||
                    String(record.JoinStudent.lname_TH)
                        .toLowerCase()
                        .includes(value.toLowerCase())

                );

            },
        },
        {
            title: 'หมู่เรียน',
            key: 'age',
            responsive: ['lg'],
            render: (_, record) => {
                return <text>{record.JoinStudent.student_group}</text>
            }
        },
        {
            title: 'คะแนนจากอาจารย์',
            key: 'branch',
            align: "center",
            width: "10%",
            responsive: ['md', 'sm'],
            render: (_, record) => {

                const sumScore08 = parseInt(record.JoinForm08.score1_1) + parseInt(record.JoinForm08.score1_2) + parseInt(record.JoinForm08.score1_3) + parseInt(record.JoinForm08.score1_4) + parseInt(record.JoinForm08.score1_5)
                    + parseInt(record.JoinForm08.score2_1) + parseInt(record.JoinForm08.score2_2) + parseInt(record.JoinForm08.score2_3) + parseInt(record.JoinForm08.score2_4) + parseInt(record.JoinForm08.score2_5);
                return <text>{sumScore08}</text>
            }
        },
        {
            title: 'คะแนนจากพี่เลี้ยง',
            key: 'branch',
            align: "center",
            width: "10%",
            responsive: ['md', 'sm'],
            render: (_, record) => {

                let sumScore09 = parseInt(record.JoinForm09.score1_1) + parseInt(record.JoinForm09.score1_2) + parseInt(record.JoinForm09.score1_3) + parseInt(record.JoinForm09.score1_4) + parseInt(record.JoinForm09.score1_5)
                    + parseInt(record.JoinForm09.score1_6) + parseInt(record.JoinForm09.score1_7) + parseInt(record.JoinForm09.score2_1) + parseInt(record.JoinForm09.score2_2) + parseInt(record.JoinForm09.score2_3);
                return <text>{sumScore09}</text>
            }

        },
        {
            title: 'คะแนนรวม',
            key: 'branch',
            align: "center",
            width: "10%",
            responsive: ['xs', 'sm', 'md'],
            render: (_, record) => {
                let sumScore08 = parseInt(record.JoinForm08.score1_1) + parseInt(record.JoinForm08.score1_2) + parseInt(record.JoinForm08.score1_3) + parseInt(record.JoinForm08.score1_4) + parseInt(record.JoinForm08.score1_5)
                    + parseInt(record.JoinForm08.score2_1) + parseInt(record.JoinForm08.score2_2) + parseInt(record.JoinForm08.score2_3) + parseInt(record.JoinForm08.score2_4) + parseInt(record.JoinForm08.score2_5);

                let sumScore09 = parseInt(record.JoinForm09.score1_1) + parseInt(record.JoinForm09.score1_2) + parseInt(record.JoinForm09.score1_3) + parseInt(record.JoinForm09.score1_4) + parseInt(record.JoinForm09.score1_5)
                    + parseInt(record.JoinForm09.score1_6) + parseInt(record.JoinForm09.score1_7) + parseInt(record.JoinForm09.score2_1) + parseInt(record.JoinForm09.score2_2) + parseInt(record.JoinForm09.score2_3);

                return sumScore08 + sumScore09
            }

        },

        {
            title: 'ลงคะแนน',
            key: 'actionEdit',
            width: "10%",
            align: "center",
            responsive: ['xs', "sm", 'md'],
            render: (_, record) => (

                <Button icon={<DiffFilled style={{ fontSize: "20px" }} />} onClick={() => ToForm(record.JoinStudent.id)} className={' bg-yellow-300'} type="primary">

                </Button>



            ),
        },

    ];
    return (
        <>
            <div>
                <UserNavbar />
                <header className="bg-white shadow">
                    <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
                        <h3 className=" text-xl font-bold  tracking-tight text-gray-900 inline">คะแนนการประเมิน IN-TP08</h3>
                        <p className=' text-blue-700 inline'></p>
                    </div>
                </header>
                <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">

                    <Table dataSource={data} rowKey={obj => obj.id} columns={columns} style={{ overflow: "auto" }} />;

                </div>
            </div>
        </>
    )
}

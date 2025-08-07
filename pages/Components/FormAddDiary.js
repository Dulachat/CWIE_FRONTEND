import { Form, Input,message } from 'antd'
import React, { useState, useEffect } from 'react'

import MyEditor from './QuillEditor';
import { useRouter } from 'next/router';
import axiosInstance from '../../utils/axios';

export default function FormAddDiary() {
    const [dateUpdate, setDate] = useState('');
    const router = useRouter();
    const [dataStore, setDataStore] = useState()
    const [data, setData] = useState()
    const [messageApi, contextHolder] = message.useMessage();
    const messageSuccess = () => {
        messageApi.open({
            type: 'success',
            content: 'เพิ่มข้อมูลเรียบร้อย',
        });
        setTimeout(() => {
            router.push({
                pathname: "/student/calendarDiary",
                query: { reload: 1 }
            })
        }, 1500)

    }
    useEffect(() => {
        const stored = localStorage.getItem('user');
        setDataStore(stored ? JSON.parse(stored) : fallbackValue);
    }, [])
    useEffect(() => {
        if (dataStore === undefined) return
        setData(dataStore.data)
    }, [dataStore])


    const onSelectDate = (date) => {
        const axios = require('axios');
        let raw = JSON.stringify({
            "diary_date": date,
            "student_id": data.id,
        });
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: process.env.NEXT_PUBLIC_API_URL+`Diary/addDiary/${data.id}`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: raw
        };
       axios.request(config)
            .then((response) => {
                setDate(response.data.diary_date)})
            .catch((error) => console.log(error));

    }
    const onFinish = (value) => {  //updateDairy/:date
        const dataTest = document.getElementsByClassName('ql-editor')
        const axios = require('axios');
        let raw = JSON.stringify({
            "time_in": value.time_in,
            "time_out": value.time_out,
            "detail_text": dataTest[0].innerHTML
        });
        let config = {
            method: 'patch',
            maxBodyLength: Infinity,
            url: process.env.NEXT_PUBLIC_API_URL + `Diary/updateDairy/${dateUpdate}/${data.id}`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: raw
        };
        axios.request(config)
            .then((response) => messageSuccess())
            .catch((error) => console.log(error));

    }

    return (
        <>{contextHolder}
            <Form
                layout="inline"
                name='AddDiary'
                onFinish={onFinish}>
              
                <div className='w-full mt-2'>
                    <label className="block mb-2 text-sm font-medium text-gray-900  dark:text-white">รายการปฏิบัติงานประจำวันที่
                        <Form.Item

                            name={"diary_date"}
                            rules={[{ required: true, message: "เลือกวันที่" }]}>

                            <Input onChange={(e) => onSelectDate(e.target.value)} type='date' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                        </Form.Item>
                    </label>
                </div>

                <div className='w-full mt-2'>
                    <label className="block mb-2 text-sm font-medium text-gray-900  dark:text-white"> เวลาเข้างาน
                        <Form.Item
                            name={"time_in"}
                            rules={[{ required: true, message: "กรอกเวลาเข้างาน" }]}>

                            <Input type='time' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                        </Form.Item>
                    </label>
                </div>
                <div className=' w-full mt-2'>
                    <label className="block mb-2 text-sm font-medium text-gray-900  dark:text-white"> เวลาออกงาน
                        <Form.Item
                            name={"time_out"}
                            rules={[{ required: true, message: "กรอกเวลาออกงาน" }]}>

                            <Input type='time' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                        </Form.Item>
                    </label>
                </div>
                <div className='w-full'>
                    <label className="block mb-2 text-sm font-medium text-gray-900  dark:text-white"> สรุปรายละเอียดการทำงาน </label>
                    <MyEditor />
                </div>
            </Form>
        </>
    )
}

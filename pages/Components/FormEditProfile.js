import React, { useState, useEffect } from 'react'
import { Button, Form, Input, Select,message } from 'antd';
import { useRouter } from 'next/router';
import axiosInstance from '../../utils/axios';

const size = "large"
export default function FormEditProfile(props) {
    const router = useRouter();
    const [data, setData] = useState();
    const [messageApi, contextHolder] = message.useMessage();
    const messageError = () => {
        messageApi.open({
            type: 'error',
            content: 'มีข้อมูลนี้แล้ว',
        });
    }
    const messageSuccess = () => {
        messageApi.open({
            type: 'success',
            content: 'แก้ไขข้อมูลเรียบร้อย',
        });
    }

    useEffect(() => {
        
        setData(props.data)
    }, [props])
  console.log(props)
    const sendData = (value) => {
        const axios = require('axios');
        let raw = JSON.stringify({
            "username": value.username,
            "fname_TH": value.fname_TH,
            "lname_TH": value.lname_TH,
            "fname_EN": value.fname_EN,
            "lname_EN": value.lname_EN,
            "email":value.email,
            "tel":value.tel
        });
        let config = {
            method: 'patch',
            maxBodyLength: Infinity,
            url: process.env.NEXT_PUBLIC_API_URL + "users/updateUsers/" + data.id,
            headers: {
                'Content-Type': 'application/json'
            },
            data: raw
        };
        axios.request(config)
            .then((response) => {
             
                if (response.data === "error") {
                    { messageError() }
                }
                if (response.data === "success") {
                    localStorage.setItem("user", JSON.stringify(response));
                    { messageSuccess() }
                }
            }
            )
            .catch((error) => console.log(error));
    }

    return (
        <>{contextHolder}
            {data !== undefined &&
                <Form
                    layout="inline"
                    name='AddUser'
                    // action={sendData}
                    onFinish={sendData}
                    key={data.id}
                >

                    <div className='w-full mt-2'>
                        <label className="block mb-2 text-sm font-medium text-gray-900  dark:text-white"> Username
                            <Form.Item
                                name={"username"}
                                
                                rules={[{ required: true, message: "กรุณากรอก Username" }]}
                                initialValue={data.username}
                            >
                                <Input  readOnly className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                            </Form.Item>
                        </label>
                    </div>


                    <div className=' w-1/2  mt-2 '>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ชื่อภาษาไทย
                            <Form.Item
                                initialValue={data.fname_TH}
                                name={"fname_TH"}
                                rules={[{ required: true, message: "กรุณากรอกชื่อ" }]}
                            >
                                <Input className=' bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                            </Form.Item>
                        </label>
                    </div>
                    <div className="w-1/2 mt-2 ">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">นามสกุลภาษาไทย
                            <Form.Item
                                initialValue={data.lname_TH}
                                name={"lname_TH"}
                                rules={[{ required: true, message: "กรุณากรอกนามสกุล" }]}
                            >
                                <Input className=' justify-self-end bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                            </Form.Item>
                        </label>
                    </div>
                    <div className=' w-1/2  mt-2 '>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ชื่อภาษาอังกฤษ
                            <Form.Item
                                initialValue={data.fname_EN}
                                name={"fname_EN"}
                                rules={[{ required: true, message: "กรุณากรอกชื่อ" }]}
                            >
                                <Input className=' bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                            </Form.Item>
                        </label>
                    </div>
                    <div className="w-1/2 mt-2 ">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">นามสกุลภาษาอังกฤษ
                            <Form.Item
                                initialValue={data.lname_EN}
                                name={"lname_EN"}
                                rules={[{ required: true, message: "กรุณากรอกนามสกุล" }]}
                            >
                                <Input className=' justify-self-end bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                            </Form.Item>
                        </label>
                    </div>
                    <div className=' w-1/2  mt-2 '>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">อีเมล์
                            <Form.Item
                                initialValue={data.email}
                                name={"email"}
                             
                            >
                                <Input className=' bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                            </Form.Item>
                        </label>
                    </div>
                    <div className="w-1/2 mt-2 ">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">เบอร์โทรศัพท์
                            <Form.Item
                                initialValue={data.tel}
                                name={"tel"}
                          
                            >
                                <Input className=' justify-self-end bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                            </Form.Item>
                        </label>
                    </div>






                    <div className="w-full mt-5 ">
                        <Form.Item  >
                            <Button htmlType="submit" className=" text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2" block size={size}>
                                บันทึกข้อมูล
                            </Button>
                        </Form.Item>
                    </div>
                </Form>
            }


        </>
    )
}

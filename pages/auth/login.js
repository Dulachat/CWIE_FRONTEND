import React, { useState, useEffect } from 'react'
import { LockClosedIcon } from '@heroicons/react/20/solid'
import { Card, Row, Col, Image, Form, Button, Input, Switch } from 'antd'
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';
import { message } from 'antd'
const axios = require('axios');
import Link from 'next/link';

export default function Login() {
    const [cookies, setCookie, removeCookie] = useCookies(['jwt', 'UID', "UUID"]);
    const [loading, setLoading] = useState();
    const [typeLogin, setTypeLogin] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const router = useRouter();
    const [switchMessage, setSwitchMessage] = useState('');
    const [showSwitchMessage, setShowSwitchMessage] = useState(false);

    const messageSuccess = () => {
        messageApi.open({
            type: 'success',
            content: 'เข้าสู่ระบบสำเร็จ',
        });
    }
    const messageError = () => {
        messageApi.open({
            type: 'error',
            content: 'เข้าสู่ระบบล้มเหลว กรุณากรอกชื่อผู้ใช้และรหัสผ่าน ให้ถูกต้อง ',
        });
    }

    const handleToggleLoginType = () => {
        setTypeLogin((prev) => {
            const next = !prev;
            const content = next ? 'โหมดเข้าสู่ระบบ: ผู้ใช้งานสถานประกอบการ' : 'โหมดเข้าสู่ระบบ: ผู้ใช้งานทั่วไป';
            // messageApi.open({ type: 'info', content });
            setSwitchMessage(content);
            setShowSwitchMessage(true);
            setTimeout(() => setShowSwitchMessage(false), 1800);
            return next;
        });
    }


    const authLogin = async (value) => {
        const axios = require('axios');
        let data = JSON.stringify({
            "username": value.username,
            "pwd": value.pwd,
            "type": typeLogin ? "company" : "user"
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: process.env.NEXT_PUBLIC_API_URL + 'auth/login',
            headers: {
                'Content-Type': 'application/json',
            },
            data: data
        };

        axios.request(config)
            .then((res) => {
                { messageSuccess() }
                localStorage.setItem('user', JSON.stringify(res))
                setTimeout(() => {
                    router.push('/')
                }, 2000)
            })
            .catch((error) => { { messageError() } console.error(error) });
    }


    return (

        <>
            {contextHolder}
            <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">

                <div className="w-full max-w-md space-y-8">

                    <div>
                        <img
                            className="mx-auto h-12 w-auto"
                            src="/logo.png"
                        />
                        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                            เข้าสู่ระบบ
                        </h2>

                        <h4 className=" font-bold text-red-800 text-center">ระบบสารสนเทศ คณะเทคโนโลยีอุตสาหกรรม</h4>
                        <p className="text-center  text-rose-600 relative">มหาวิทยาลัยราชภัฎเลย</p>

                    </div>


                    <div className='w-full '>

                        <div className='w-full px-5'>
                            <Card className='mx-2 h-36 bg-gradient-to-tr from-yellow-300 to-pink-500  hover:bg-gradient-to-bl transform transition-all duration-500 ease-out hover:scale-105 hover:shadow-xl'>
                            </Card>
                        </div>
                        <div className=' w-full -mt-28'>
                            <Card className=' mx-auto w-11/12   border-red-400 transform transition-transform duration-300 ease-out hover:shadow-lg hover:scale-[1.01] ' >
                                <div className='flex justify-center'>
                                    <Switch className='flex-center bg-gray-300 transform transition-transform duration-300 ease-out hover:scale-105 active:scale-95' checked={typeLogin} onChange={handleToggleLoginType} />
                                </div>
                                <div className='text-center mt-2'>
                                    {typeLogin ? "ผู้ใช้งานสถานประกอบการ" : "ผู้ใช้งานทั่วไป"}
                                </div>
                                <div className={`text-center text-sm text-indigo-600 mt-1 transition-all duration-300 ease-out ${showSwitchMessage ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1'}`}>
                                    {switchMessage}
                                </div>
                                <Form className="mt-8 space-y-6" onFinish={authLogin}  >
                                    <Form.Item name={"username"}>
                                        <div>
                                            <label htmlFor="username" className="sr-only">
                                                Email address
                                            </label>
                                            <Input

                                                id="username"
                                                name="username"
                                                type="text"
                                                autoComplete="username"
                                                required
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 transition-colors duration-200 focus:shadow-md"
                                                placeholder="Username"
                                            />
                                        </div>
                                    </Form.Item>
                                    <Form.Item name={"pwd"} >
                                        <div>
                                            <label htmlFor="password" className="sr-only">
                                                Password
                                            </label>
                                            <Input

                                                id="password"
                                                name="pwd"
                                                type="password"
                                                autoComplete="current-password"
                                                required
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 transition-colors duration-200 focus:shadow-md"
                                                placeholder="Password"
                                            />
                                        </div>
                                    </Form.Item>
                                    {!typeLogin && <div className='flex w-full justify-center'>
                                        <Link href="/register" className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors duration-200">
                                            ลงทะเบียนใช้งาน
                                        </Link>
                                    </div>}
                                    <div>
                                        <Button
                                            size='large'
                                            htmlType="submit"
                                            className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transform transition duration-200 ease-out hover:-translate-y-0.5 active:translate-y-0"
                                        >
                                            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                                <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400 mt-2 transition-colors duration-200" aria-hidden="true" />
                                            </span>
                                            เข้าสู่ระบบ
                                        </Button>
                                        {!typeLogin && <div className='mt-1 text-center underline font-medium '> <Link href={"/auth/resetPassword"} className="transition-colors duration-200 hover:text-indigo-600">ลืมรหัสผ่าน</Link></div>}

                                    </div>

                                </Form>
                            </Card>
                        </div>

                    </div>

                </div>

            </div>


        </>

    )
}

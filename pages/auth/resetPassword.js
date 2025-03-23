'use client'
import React, { useState, useEffect } from 'react'
import { LockClosedIcon } from '@heroicons/react/20/solid'
import { Card, Row, Col, Image, Form, Button, Input } from 'antd'
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';
import { message } from 'antd'
import Link from 'next/link';
import axiosInstance from '../../utils/axios'

function ResetPassword() {
    const router = useRouter()
    const [messageApi, contextHolder] = message.useMessage();
    const onFinish = async (values) => {
        const raw = {
            username: values.username,
            email: values.email
        }

        const res = await axiosInstance.post('auth/verified-password/', raw)
        if (res.data.status === 200) {
            messageApi.open({ type: 'error', content: "Username or Email ไม่ถูกต้อง" })
        } else if (res.data.token) {
            messageApi.open({ type: 'success', content: "ข้อมูลถูกต้อง" })
            setTimeout(() => {
                router.push({
                    pathname: '/auth/newPassword',
                    query: {
                        passReq: res.data.token,
                        uuid:res.data.uuid,
                        type:res.data.type
                    }
                })
            }, 1000)
        }else{
            throw new Error()
        }
    };
    return (
        <>
            {contextHolder}
            <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">

                <div className="w-full max-w-md space-y-8">

                    <div>
                        <img
                            className="mx-auto h-12 w-auto"
                            src={"https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"}
                            alt="Your Company"
                        />
                        <h2 className=" text-center text-3xl font-bold tracking-tight text-gray-900">
                            Reset Password
                        </h2>

                        <h4 className=" font-bold text-red-800 text-center">ระบบสารสนเทศ คณะเทคโนโลยีอุตสาหกรรม</h4>
                        <p className="text-center  text-rose-600 relative">มหาวิทยาลัยราชภัฎเลย</p>

                    </div>
                    <div className='w-full '>

                        <div className='w-full px-5'>
                            <Card className='mx-2 h-36 bg-gradient-to-tr from-yellow-300 to-pink-500  hover:bg-gradient-to-bl'>
                            </Card>
                        </div>
                        <div className=' w-full -mt-28'>
                            <Card className=' mx-auto w-11/12   border-red-400  ' >
                                <Form className=" space-y-6" onFinish={onFinish}  >
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
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                placeholder="Username"
                                            />
                                        </div>
                                    </Form.Item>
                                    <Form.Item name={"email"}>
                                        <div>
                                            <label htmlFor="email" className="sr-only">
                                                Email
                                            </label>
                                            <Input

                                                id="email"
                                                name="email"
                                                type="email"
                                                autoComplete="email"
                                                required
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                placeholder="Email"
                                            />
                                        </div>
                                    </Form.Item>

                                    <div>
                                        <Button
                                            size='large'
                                            htmlType="submit"
                                            className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                        >
                                            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                                <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400 mt-2" aria-hidden="true" />
                                            </span>
                                            ยืนยัน
                                        </Button>
                                    </div>
                                </Form>
                            </Card>
                        </div>

                    </div>

                </div>

            </div>
        </>

    );
}

export default ResetPassword;

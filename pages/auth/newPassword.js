'use client'
import React, { useState, useEffect } from 'react'
import { LockClosedIcon } from '@heroicons/react/20/solid'
import { Card, Row, Col, Image, Form, Button, Input } from 'antd'
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';
import { message } from 'antd'
import Link from 'next/link';
import axiosInstance from '../../utils/axios'

function NewPassword() {
    const router = useRouter()
    const [messageApi, contextHolder] = message.useMessage();
    const [token, setToken] = useState(router.query.passReq)
    const [UUID, setUUID] = useState(router.query.uuid)
    const [type, setType] = useState(router.query.type)
    const onFinish = async (values) => {
        const raw = {
            password: values.newPassword,
            uuid: UUID,
            type: type,
            token: token
        }
        const res = await axiosInstance.post('auth/reset-password/', raw)
    if(res.data === 'success'){
        messageApi.open({
            type: 'success',
            content:"บันทึกสำเร็จ"
        })
       setTimeout(()=>{
        router.push('/auth/login')
       },1000)
    }else{
        messageApi.open({
            type: 'error',
            content:"มีข้อผิดพลาด"
        })
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
                            New Password
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
                                    <Form.Item
                                        name={"newPassword"}

                                        rules={[{ required: true, message: "กรุณากรอกรหัสผ่าน" }]} hasFeedback={false}>
                                        <div>
                                            <label htmlFor="newPassword" className="sr-only">
                                                New password
                                            </label>
                                            <Input.Password
                                                id="newPassword"
                                                name="newPassword"
                                                required
                                                size='large'
                                                placeholder="New password"
                                            />
                                        </div>
                                    </Form.Item>
                                    <Form.Item name={"confirmPassword"}

                                        rules={[
                                            {
                                                required: true,
                                                message: 'กรุณายืนยันรหัสผ่าน!',
                                            },
                                            ({ getFieldValue }) => ({
                                                validator(_, value) {
                                                    if (!value || getFieldValue('newPassword') === value) {
                                                        return Promise.resolve();
                                                    }
                                                    return Promise.reject(new Error('รหัสผ่านไม่ตรงกัน!'));
                                                },
                                            }),
                                        ]}
                                        hasFeedback={false}
                                    >
                                        <div>
                                            <label htmlFor="confirmPassword" className="sr-only">
                                                Again password
                                            </label>
                                            <Input.Password
                                                id="confirmPassword"
                                                name="confirmPassword"
                                                required
                                                size='large'
                                                placeholder="Confirm password"
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

export default NewPassword;

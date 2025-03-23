import { Card, Form, Input, Button, Select } from 'antd'
import React, { useState,useEffect } from 'react'
import FormRegister from './components/FormRegister'
export default function register() {
    const size = "large"
    return (
        <>
            <div className="justify-items-center mt-3 mr-5 flex ml-5 ">
                <Card style={{ width: "100%", height: "200px" }} className="bg-gradient-to-r  from-rose-600  via-red-400 to-pink-500 ..." >
                    <div>
                        <img
                            className="mx-auto h-12 w-auto"
                            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                            alt="Your Company"
                        />
                        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-white">
                            ลงทะเบียนใช้งาน
                        </h2>
                        <p className="text-lead text-center text-white">นักศึกษาสามารถลงทะเบียนเพื่อใช้งานระบบ โดยกรอกข้อมูลด้านล่างให้ครบ
                        </p>

                    </div>
                </Card>
            </div>
            <div className='border-gray-200'>

            </div>
            <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <Card style={{ width: "90%" }}>
                  <FormRegister/>
                </Card>
            </div>
        </>
    )
}

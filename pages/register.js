import { Card, Form, Input, Button, Select } from 'antd'
import React from 'react'
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
                    <Form
                        layout="inline"
                        name='registerForm'
                        action='#'
                    >

                        <div className='w-full mt-2'>

                            <lable className="block mb-2 text-sm font-medium text-gray-900  dark:text-white"> Username</lable>
                            <Form.Item
                                name={"username"}
                                rules={[{ required: true, message: "กรุณากรอก Username" }]}

                            >
                                <Input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                            </Form.Item>
                        </div>
                        <div className='w-full mt-2 '>
                            <lable className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Password</lable>
                            <Form.Item

                                name={"password"}
                                rules={[{ required: true, message: "กรุณากรอก Password" }]}
                            >
                                <Input type='password' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                            </Form.Item>
                        </div>

                        <div className=' w-1/2  mt-2 '>
                            <lable className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ชื่อภาษาไทย</lable>
                            <Form.Item

                                name={"fname_TH"}
                                rules={[{ required: true, message: "กรุณากรอกชื่อ" }]}
                            >
                                <Input className=' bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                            </Form.Item>
                        </div>
                        <div className="w-1/2 mt-2 ">
                            <lable className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">นามสกุลภาษาไทย</lable>
                            <Form.Item

                                name={"lname_TH"}
                                rules={[{ required: true, message: "กรุณากรอกนามสกุล" }]}
                            >
                                <Input className=' justify-self-end bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                            </Form.Item>
                        </div>
                        <div className=' w-1/2  mt-2 '>
                            <lable className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ชื่อภาษาอังกฤษ</lable>
                            <Form.Item

                                name={"fname_EN"}
                                rules={[{ required: true, message: "กรุณากรอกชื่อ" }]}
                            >
                                <Input className=' bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                            </Form.Item>
                        </div>
                        <div className="w-1/2 mt-2 ">
                            <lable className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">นามสกุลภาษาอังกฤษ</lable>
                            <Form.Item

                                name={"lname_EN"}
                                rules={[{ required: true, message: "กรุณากรอกนามสกุล" }]}
                            >
                                <Input className='  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                            </Form.Item>
                        </div>
                        <div className="w-1/2 mt-2 ">
                            <lable className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">รหัสนักศึกษา</lable>
                            <Form.Item
                                name={"student_id"}
                                rules={[{ required: true, message: "กรุณากรอกรหัสนักศึกษา" }]}
                            >
                                <Input className='  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                            </Form.Item>
                        </div>
                        <div className="w-1/4 mt-2 ">
                            <lable className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">หมู่เรียน</lable>
                            <Form.Item
                                name={"student_group"}
                                rules={[{ required: true, message: "กรุณากรอกหมู่เรียน" }]}
                            >
                                <Input className='  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                            </Form.Item>
                        </div>
                        <div className="w-1/4 mt-2 ">
                            <lable className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">สาขาวิชา</lable>
                            <Form.Item
                                name={"branch_id"}
                                rules={[{ required: true, message: "กรุณาเลือกสาขาวิชา" }]}
                            >
                                <Select  size={ size }>
                                    <Select.Option  value="demo">Demo</Select.Option>
                                </Select>
                            </Form.Item>
                        </div>
                        <div className="w-1/2 mt-2 ">
                            <lable className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">เบอร์โทรศัพท์</lable>
                            <Form.Item
                                name={"tel"}
                                rules={[{ required: true, message: "กรุณากรอกเบอร์โทรศัพท์" }]}
                            >
                                <Input className='  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                            </Form.Item>
                        </div>
                        <div className="w-1/2 mt-2 ">
                            <lable className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">อีเมล์</lable>
                            <Form.Item
                                name={"tel"}
                                rules={[{ required: true, message: "กรุณากรอก E-mail" }]}
                            >
                                <Input className='  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                            </Form.Item>
                        </div>
                        <div className="w-full mt-2 ">
                            <lable className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Facebook</lable>
                            <Form.Item
                                name={"facebook"}
                                rules={[{ required: true, message: "กรุณากรอกชื่อ facebook" }]}
                            >
                                <Input className='  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                            </Form.Item>
                        </div>
                        
                        <div className="w-1/2 mt-2 ">
                            <lable className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ชื่อบุคคลติดต่อกรณีฉุกเฉิน</lable>
                            <Form.Item
                                name={"emergency_person_fname"}
                                rules={[{ required: true, message: "กรุณากรอก ชื่อบุคคลติดต่อกรณีฉุกเฉิน" }]}
                            >
                                <Input className='  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                            </Form.Item>
                        </div>
                        <div className="w-1/2 mt-2 ">
                            <lable className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">นามสกุลบุคคลติดต่อกรณีฉุกเฉิน</lable>
                            <Form.Item
                                name={"emergency_person_lname"}
                                rules={[{ required: true, message: "กรุณากรอก นามสกุลบุคคลติดต่อกรณีฉุกเฉิน" }]}
                            >
                                <Input className='  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                            </Form.Item>
                        </div>
                        <div className="w-1/2 mt-2 ">
                            <lable className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">เบอร์โทรบุคคลติดต่อกรณีฉุกเฉิน</lable>
                            <Form.Item
                                name={"emergency_tel"}
                                rules={[{ required: true, message: "กรุณากรอกเบอร์โทรบุคคลติดต่อกรณีฉุกเฉิน" }]}
                            >
                                <Input className='  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                            </Form.Item>
                        </div>
                        <div className="w-full mt-2 ">
                            <lable className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">รหัสบัตรประชาชน</lable>
                            <Form.Item
                                name={"identification_card_id"}
                                rules={[{ required: true, message: "กรุณากรอกรหัสบัตรประชาชน" }]}
                            >
                                <Input className='  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                            </Form.Item>
                        </div>
                        <div className="w-1/2 mt-2 ">
                            <lable className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ออกให้ ณ</lable>
                            <Form.Item
                                name={"issue_at"}
                                rules={[{ required: true, message: "กรุณากรอก สถานที่ออกบัตร" }]}
                            >
                                <Input className='  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                            </Form.Item>
                        </div>
                        <div className="w-1/4 mt-2 ">
                            <lable className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">วันออกบัตร</lable>
                            <Form.Item
                                name={"issue_date"}
                                rules={[{ required: true, message: "กรุณากรอก วันออกบัตร" }]}
                            >
                                <Input className='  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                            </Form.Item>
                        </div>
                        <div className="w-1/4 mt-2 ">
                            <lable className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">วันหมดอายุ</lable>
                            <Form.Item
                                name={"expiry_date"}
                                rules={[{ required: true, message: "กรุณากรอก วันหมดอายุ" }]}
                            >
                                <Input className='  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                            </Form.Item>
                        </div>
                        <div className="w-1/4 mt-2 ">
                            <lable className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">เชื้อชาติ</lable>
                            <Form.Item
                                name={"race"}
                                rules={[{ required: true, message: "กรุณากรอก เชื้อชาติ" }]}
                            >
                                <Input className='  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                            </Form.Item>
                        </div>
                        <div className="w-1/4 mt-2 ">
                            <lable className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">สัญชาติ</lable>
                            <Form.Item
                                name={"nationality"}
                                rules={[{ required: true, message: "กรุณากรอก สัญชาติ" }]}
                            >
                                <Input className='  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                            </Form.Item>
                        </div>
                        <div className="w-1/4 mt-2 ">
                            <lable className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ศาสนา</lable>
                            <Form.Item
                                name={"religion"}
                                rules={[{ required: true, message: "กรุณากรอก ศาสนา" }]}
                            >
                                <Input className='  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                            </Form.Item>
                        </div>
                    
                        <div className="w-1/4 mt-2 ">
                            <lable className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">วัน-เดือน-ปีเกิด</lable>
                            <Form.Item
                                name={"dateofbirth"}
                               
                                rules={[{ required: true, message: "กรุณาเลือก วัน-เดือน-ปีเกิด" }]}
                            >
                                <Input type='date' className='  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                            </Form.Item>
                        </div>
                        <div className="w-1/4 mt-2 ">
                            <lable className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">อายุ</lable>
                            <Form.Item
                                name={"age"}  
                                rules={[{ required: true, message: "กรุณากรอก อายุ" }]}
                            >
                                <Input  className='  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                            </Form.Item>
                        </div>
                        <div className="w-1/4 mt-2 ">
                            <lable className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">เพศ</lable>
                            <Form.Item
                                name={"sex"}
                                rules={[{ required: true, message: "กรุณาเลือกสาขาวิชา" }]}
                            >
                                <Select  size={ size } >
                                    <Select.Option  value="male">ชาย</Select.Option>
                                    <Select.Option  value="female">หญิง</Select.Option>
                                </Select>
                            </Form.Item>
                        </div>
                        <div className="w-1/4 mt-2 ">
                            <lable className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ส่วนสูง</lable>
                            <Form.Item
                                name={"p_height"}  
                                rules={[{ required: true, message: "กรุณากรอก ส่วนสูง" }]}
                            >
                                <Input  className='  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                            </Form.Item>
                        </div>
                        <div className="w-1/4 mt-2 ">
                            <lable className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">น้ำหนัก</lable>
                            <Form.Item
                                name={"p_weight"}  
                                rules={[{ required: true, message: "กรุณากรอก น้ำหนัก" }]}
                            >
                                <Input  className='  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                            </Form.Item>
                        </div>
                        <div className='w-full mt-5'> <lable className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ที่อยู่ตามบัตรประชาชน </lable></div>
                        <div className="w-1/12 mt-2 ">
                            <lable className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">เลขที่</lable>
                            <Form.Item
                                name={"address_no"}  
                                rules={[{ required: true, message: "กรุณากรอก เลขที่" }]}
                            >
                                <Input  className='  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                            </Form.Item>
                        </div>
                        <div className="w-1/12 mt-2 ">
                            <lable className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">หมู่ที่</lable>
                            <Form.Item
                                name={"moo"}  
                                rules={[{ required: true, message: "กรุณากรอก หมู่ที่" }]}
                            >
                                <Input  className='  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                            </Form.Item>
                        </div>
                        <div className="w-1/6 mt-2 ">
                            <lable className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ถนน</lable>
                            <Form.Item
                                name={"road"}  
                                rules={[{ required: true, message: "กรุณากรอก ถนน" }]}
                            >
                                <Input  className='  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                            </Form.Item>
                        </div>
                        <div className="w-1/6 mt-2 ">
                            <lable className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ตำบล/แขวง</lable>
                            <Form.Item
                                name={"sub_district"}  
                                rules={[{ required: true, message: "กรุณากรอก ตำบล/แขวง" }]}
                            >
                                <Input  className='  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                            </Form.Item>
                        </div>
                        <div className="w-1/6 mt-2 ">
                            <lable className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">อำเภอ/เขต</lable>
                            <Form.Item
                                name={"district"}  
                                rules={[{ required: true, message: "กรุณากรอก อำเภอ/เขต" }]}
                            >
                                <Input  className='  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                            </Form.Item>
                        </div>
                        <div className="w-1/6 mt-2 ">
                            <lable className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">จังหวัด</lable>
                            <Form.Item
                                name={"province"}  
                                rules={[{ required: true, message: "กรุณากรอก อำเภอ/เขต" }]}
                            >
                                <Input  className='  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                            </Form.Item>
                        </div>
                        <div className="w-1/6 mt-2 ">
                            <lable className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">รหัสไปรษณีย์</lable>
                            <Form.Item
                                name={"postal_code"}  
                                rules={[{ required: true, message: "กรุณากรอก รหัสไปรษณีย์" }]}
                            >
                                <Input  className='  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                            </Form.Item>
                        </div>
                        <div className="w-full mt-5 ">
                            <Form.Item  >
                                <Button className=" text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2" htmlType="submit" block size={size}>
                                    บันทึกข้อมูล
                                </Button>
                            </Form.Item>
                        </div>
                        <div>
                            <p>ฉันมีบัญชีผู้ใช้แล้ว? <a className=' font-bold' href='/login'> เข้าสู่ระบบ</a></p>
                        </div>

                    </Form>
                </Card>
            </div>
        </>
    )
}

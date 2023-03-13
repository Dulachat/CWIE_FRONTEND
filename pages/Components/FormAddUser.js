import React, { useState } from 'react'
import { Space, Table, Tag, Button, Modal, Form, Input, Select } from 'antd';


const size = "large"
export default function FormAddUser() {
    const [selectedOption, setSelectedOption] = useState(null);
    const [selectedBranch, setSelectedBranch] = useState(null);
    const handleChange = (value) => {
        console.log(value)
        setSelectedOption(value);
    };
    const handleChangeBranch = (value) => {
        console.log(value)
        setSelectedBranch(value);
    };


    const statusOptions =[
        {value:"1",label:"แอดมิน"  },
        {value:"2",label:"อาจารย์"  },
        {value:"3",label:"พี่เลี้ยง"  }
    ]
    const branchOptions =[
        {value:"0",label:"เลือกสาขาวิชา"  },
        {value:"1",label:"วิทยาการคอมพิวเตอร์"  },
        {value:"2",label:"เคมี"  },
        {value:"3",label:"ไอที"  }
    ]

    const sendData =(value)=>{
        console.log(value);
    }
    return (
        <>
            <Form
                layout="inline"
                name='AddUser'
                // action={sendData}
                onFinish={sendData}
            >

                <div className='w-full mt-2'>

                    <label className="block mb-2 text-sm font-medium text-gray-900  dark:text-white"> Username
                    <Form.Item
                        name={"username"}
                        rules={[{ required: true, message: "กรุณากรอก Username" }]}

                    >
                        <Input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                    </Form.Item>
                    </label>
                </div>
                <div className='w-full mt-2 '>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Password
                    <Form.Item

                        name={"password"}
                        rules={[{ required: true, message: "กรุณากรอก Password" }]}
                    >
                        <Input type='password' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                    </Form.Item>
                    </label>
                </div>

                <div className=' w-1/2  mt-2 '>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ชื่อภาษาไทย
                    <Form.Item

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

                        name={"lname_TH"}
                        rules={[{ required: true, message: "กรุณากรอกนามสกุล" }]}
                    >
                        <Input className=' justify-self-end bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                    </Form.Item>
                    </label>
                </div>
             
                <div className="w-1/2 mt-2 ">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">สาขาวิชา
                    <Form.Item
                        name={"branch_id"}
                        rules={[{ required: true, message: "กรุณากรอกสาขาวิชา" }]}
                    >

                        <Select name={"branch_id"}
                            size={size}
                            value={selectedBranch}
                            onChange={handleChangeBranch}
                            options={branchOptions}
                            defaultValue="0"
                            >
                        </Select>
                    </Form.Item>
                    </label>
                </div>
                <div className="w-1/2 mt-2 ">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ระดับผู้ใช้งาน
                    <Form.Item
                        name={"status"}
                        rules={[{ required: true, message: "กรุณาเลือก ระดับผู้ใช้งาน" }]}
                    >

                        <Select name={"status"}
                            size={size}
                            value={selectedOption}
                            onChange={handleChange}
                            options={statusOptions}
                            >      
                                             
                        </Select>
                    </Form.Item>
                    </label>
                </div>

                <div className="w-full mt-5 ">
                    <Form.Item  >
                        <Button htmlType="submit" className=" text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2" htmlType="submit" block size={size}>
                            บันทึกข้อมูล
                        </Button>
                    </Form.Item>
                </div>

            </Form>
        </>
    )
}

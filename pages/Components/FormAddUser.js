import React, { useEffect, useState } from 'react'
import {  Button, Form, Input, Select, message } from 'antd';
import axiosInstance from '../../utils/axios'
import { useRouter } from 'next/router';

const size = "large"
export default function FormAddUser() {
    const router = useRouter();
    const [selectedOption, setSelectedOption] = useState(null);
    const [selectedBranch, setSelectedBranch] = useState(null);
    const [branchData, setBranchData] = useState([]);
    const [userLevelData, setUserLevel] = useState([]);
    const [companyData, setCompanyData] = useState([]);
    const [dummyState, rerender] = React.useState(1);
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

        setTimeout(() => {
            router.push({
                pathname: "/admin/userMag",
                query: { reload: 1 }
            })
        }, 500)
    }

    useEffect(() => {
        axiosInstance.get('users/allUsers')
            .then(function (response) {
              
                setBranchData(response.data)
         
            })
    }, [dummyState])

    useEffect(() => {
        axiosInstance.get('branch/allBranch')
            .then(function (response) {      
                setBranchData(response.data)
            })
    }, [])

    useEffect(() => {
        axiosInstance.get('company/allCompany')
            .then(function (response) {
                setCompanyData(response.data)
            })
    }, [])

    useEffect(() => {
        axiosInstance.get('usersLevel/all')
            .then(function (response) {
                setUserLevel(response.data)    
            })
    }, [])
 

    const label = `${selectedOption ? "2" : "3"}`;
    const handleChange = (value) => {
        if (value === 2) {
            setSelectedOption(value);
        }
        if (value === 3) {
            setSelectedOption(value);
        }
        else  {
            setSelectedOption(value);
        }

    };
    const handleChangeBranch = (value) => {
  
        setSelectedBranch(value);
    };



    const sendData = (value) => {
      
        const axios = require('axios');
        let data = JSON.stringify({
            "username": value.username,
            "pwd": value.pwd,
            "fname_TH": value.fname_TH,
            "lname_TH": value.lname_TH,
            "branch_id": value.branch_id,
            "company_id": value.company_id,
            "user_level_id": value.user_level_id

        });
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: process.env.NEXT_PUBLIC_API_URL + "users/createUsers",
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };
        axios.request(config)
            .then((response) => {
                if (response.data === "error") {
                    { messageError() }
                }
                if (response.data === "success") {
                    { messageSuccess() }
                }
            }
            )
            .catch((error) => console.log(error));
    }
    return (
        <>{contextHolder}
            <Form
                layout="inline"
                name='AddUser'
                // action={sendData}
                onFinish={sendData}
                key={'addUser'}
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

                            name={"pwd"}
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
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ระดับผู้ใช้งาน
                        <Form.Item
                            name={"user_level_id"}
                            rules={[{ required: true, message: "กรุณาเลือกระดับผู้ใช้งาน" }]}
                        >
                            <Select size={size} defaultValue={"เลือกระดับผู้ใช้งาน"} onChange={handleChange}>
                                {userLevelData.map((data) => (
                                    <Select.Option key={data.id} value={data.id}>{data.level_name}</Select.Option>))}
                            </Select>
                        </Form.Item>
                    </label>
                </div>
                {selectedOption === 2 && <div className="w-1/2 mt-2 ">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">สาขาวิชา
                        <Form.Item
                            name={"branch_id"}
                            rules={[{ required: true, message: "กรุณาเลือกสาขาวิชา" }]}
                        >
                            <Select size={size} defaultValue={"เลือกสาขาวิชา"}>
                                {branchData.map((data) => (
                                    <Select.Option key={data.branch_name} value={data.id}>{data.branch_name}</Select.Option>))}
                            </Select>
                        </Form.Item>
                    </label>
                </div>}
               
                {selectedOption === 3 &&
                    <div className="w-1/2 mt-2 ">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">สถานประกอบการณ์
                            <Form.Item
                                name={"company_id"}
                                rules={[{ required: true, message: "กรุณาเลือกสถานประกอบการณ์" }]}
                            >
                                <Select size={size} defaultValue={"เลือกสถานประกอบการณ์"}>
                                    {companyData.map((data) => (
                                        <Select.Option key={data.id} value={data.id}>{data.company_name}</Select.Option>))}
                                </Select>
                            </Form.Item>
                        </label>
                    </div>}



                <div className="w-full mt-5 ">
                    <Form.Item  >
                        <Button htmlType="submit" className=" text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2" block size={size}>
                            บันทึกข้อมูล
                        </Button>
                    </Form.Item>
                </div>
            </Form>
        </>
    )
}

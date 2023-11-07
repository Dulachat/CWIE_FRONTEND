import React, { useEffect, useState } from 'react'
import { Button, Form, Input, message } from 'antd';
import { useRouter } from 'next/router';

const FormEditCompany = (item) => {
    const [dataEdit, setData] = useState([]);
    const [messageApi, contextHolder] = message.useMessage();
    const size = "large";
    const router = useRouter();
    useEffect(() => {
        setData(item.data)
    }, [item])
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

        router.push({
            pathname: "/admin/generalMag",
            query: { reload: 1 }
        })
    }
    const sendEditData = (value) => {
        const axios = require('axios');
        let data = JSON.stringify({
            "company_name": value.company_name,
            "company_email": value.company_email,
            "company_tel": value.company_tel,
            "company_address": value.company_address
        });
        let config = {
            method: 'patch',
            maxBodyLength: Infinity,
            url: process.env.NEXT_PUBLIC_API_URL + "company/updateCompany/" + dataEdit.id,
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
            <div className='w-full'>
                <Form name='editCompany' layout='inline' onFinish={sendEditData} key={dataEdit.id}>
                    <div className='w-full'>
                        <label>ชื่อสถานประกอบการณ์</label>
                        <Form.Item name="company_name" initialValue={dataEdit.company_name}
                            rules={[{ require: true, message: "กรอกข้อมูลให้ครบ" }]}
                        >
                            <Input value={dataEdit.company_name} className=' bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                        </Form.Item>
                    </div>
                    <div className='w-1/2'>
                        <label>เบอร์โทรศัพท์</label>
                        <Form.Item name="company_tel" initialValue={dataEdit.company_tel}
                            rules={[{ require: true, message: "กรอกข้อมูลให้ครบ" }]} >
                            <Input value={dataEdit.company_tel} className=' bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                        </Form.Item>
                    </div>
                    <div className='w-1/2'>
                        <label>e-mail</label>
                        <Form.Item name="company_email" initialValue={dataEdit.company_email}
                            rules={[{ require: true, message: "กรอกข้อมูลให้ครบ" }]}>
                            <Input value={dataEdit.company_email} type='email' className=' bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                        </Form.Item>
                    </div>
                    <div className='w-full'>
                        <label>ที่อยู่บริษัท</label>
                        <Form.Item name="company_address" initialValue={dataEdit.company_address}
                            rules={[{ require: true, message: "กรอกข้อมูลให้ครบ" }]}>
                            <Input.TextArea value={dataEdit.company_address} style={{ height: 100 }} />
                        </Form.Item>
                    </div>
                    <div className='w-full mt-2'>
                        <Button className=" text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2" htmlType='submit' block size={size}>
                            บันทึกข้อมูล
                        </Button>
                    </div>

                </Form>
            </div>

        </>
    )
}

export default FormEditCompany

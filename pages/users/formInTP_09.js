import React, { useEffect, useState } from 'react'
import { Space, Table, Tag, Checkbox, Row, Form, Divider, Radio ,message} from 'antd';
import UserNavbar from '../components/UserNavbar';
import { render } from 'react-dom';

import { useRouter } from 'next/router';
const { Column, ColumnGroup } = Table;

export default function FormInTP_09() {
    const [isSelected, setIsSelected] = useState();
    const [form] = Form.useForm();
    const router = useRouter();
    const student_id = router.query.id
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
            content: 'เพิ่มข้อมูลเรียบร้อย',
        });
        setTimeout(() => {
            router.back();
        }, 1000)


    }

    const onFinish = (value) => {
        const axios = require('axios');
        let data = JSON.stringify({
            "score1_1": value.score1_1,
            "score1_2": value.score1_2,
            "score1_3": value.score1_3,
            "score1_4": value.score1_4,
            "score1_5": value.score1_5,
            "score1_6": value.score1_6,
            "score1_7": value.score1_7,
            "score2_1": value.score2_1,
            "score2_2": value.score2_2,
            "score2_3": value.score2_3,
        });
     
        let config = {
            method: 'patch',
            maxBodyLength: Infinity,
            url: process.env.NEXT_PUBLIC_API_URL + "form/form09/" + student_id,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };
        axios.request(config)
            .then((response) => {
                { messageSuccess() }
            }
            )
            .catch((error) => { messageError() });
    };

    const data = [
        {
            key: '1',
            columnName: '1.คณภาพของงาน(Quality of Work)',

        },
        {
            key: 'score1_1',
            columnName: '1.1 การออกแบบและวางแผนงาน',
        },
        {
            key: 'score1_2',
            columnName: '1.2 ความรู้ในงานที่ปฏิบัติ',
        },
        {
            key: 'score1_3',
            columnName: '1.3 ความพร้อมในงานที่ปฏิบัติ',
        },
        {
            key: 'score1_4',
            columnName: '1.4 ความรับผิดชอบของงานที่ปฏิบัติ',
        },
        {
            key: 'score1_5',
            columnName: '1.5 ความสามารถในการบริหารงานที่ปฏิบัติ',
        },
        {
            key: 'score1_6',
            columnName: '1.6 ความถูกต้องของผลงานที่ปฏิบัติ',
        },
        {
            key: 'score1_7',
            columnName: '1.7 การประเมิณและสรุปผลการปฏิบัติงาน',
        },
        {
            key: '2',
            columnName: '2. ปริมาณการทำงาน (Quantity of Work)',
        },
        {
            key: 'score2_1',
            columnName: '2.1 เวลาที่ใช้ในการปฏิบัติงาน',
        },
        {
            key: 'score2_2',
            columnName: '2.2 ปริมาณงานต่อเวลา',
        },
        {
            key: 'score2_3',
            columnName: '2.3 การใช้เวลาให้เกิดประโยชน์อื่น',
        }

    ];
    const columns = [
        {
            title: 'เกณฑ์การประเมิน',
            dataIndex: 'columnName',
            rowSpan: 2,
            onCell: (_, index) => ({
                colSpan: index === 0 ? 6 : 1,
                colSpan: index === 8 ? 6 : 1,
            }),
        },
        {
            title: 'ระดับคะแนน',
            children: [
                {
                    title: '5',
                    render: (text) =>
                        <Form.Item name={text.key} key={text.key} >
                            <Space size="middle">
                                <input type={'radio'} name={text.key} value={5} />
                            </Space>
                        </Form.Item>,
                    onCell: (_, index) => {
                        if (index === 8) {
                            return {
                                colSpan: 0,
                            };
                        }
                        if (index === 0) {
                            return {
                                colSpan: 0,
                            };
                        }
                        return {};
                    },
                },
                {
                    title: '4',
                    render: (text) =>
                        <Form.Item name={text.key} key={text.key}>
                            <Space size="middle">
                                <input type={'radio'} name={text.key} value={4} />
                            </Space>
                        </Form.Item>,
                    onCell: (_, index) => {
                        if (index === 8) {
                            return {
                                colSpan: 0,
                            };
                        }
                        if (index === 0) {
                            return {
                                colSpan: 0,
                            };
                        }
                        return {};
                    },
                },
                {
                    title: '3',

                    render: (text) =>
                        <Form.Item name={text.key}>
                            <Space size="middle">
                                <input type={'radio'} name={text.key} value={3} />
                            </Space>
                        </Form.Item>,
                    onCell: (_, index) => {
                        if (index === 8) {
                            return {
                                colSpan: 0,
                            };
                        }
                        if (index === 0) {
                            return {
                                colSpan: 0,
                            };
                        }
                        return {};
                    },
                },
                {
                    title: '2',

                    render: (text) =>
                        <Form.Item name={text.key}>
                            <Space size="middle">
                                <input type={'radio'} name={text.key} value={2} />
                            </Space>
                        </Form.Item>,
                    onCell: (_, index) => {
                        if (index === 8) {
                            return {
                                colSpan: 0,
                            };
                        }
                        if (index === 0) {
                            return {
                                colSpan: 0,
                            };
                        }
                        return {};
                    },
                },
                {
                    title: '1',
                    render: (text) =>
                        <Form.Item name={text.key}>
                            <Space size="middle">
                                <input type={'radio'} name={text.key} value={1} />
                            </Space>
                        </Form.Item>,
                    onCell: (_, index) => {
                        if (index === 8) {
                            return {
                                colSpan: 0,
                            };
                        }
                        if (index === 0) {
                            return {
                                colSpan: 0,
                            };
                        }
                        return {};
                    },
                },],
        },
    ];

    const onReset = () => {
        form.resetFields();
    };
    return (
        <>
            <div>{contextHolder}
                <UserNavbar />
                <header className="bg-white shadow">
                    <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
                        <h3 className=" text-xl font-bold  tracking-tight text-gray-900 inline">แบบประเมินผลการปฏิบัติงานของนักศึกษาจากหน่วยงาน</h3>
                        <p className=' text-blue-700 inline'> </p>
                    </div>
                </header>
                <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">

                    <Form form={form} onFinish={onFinish} name="basic">
                        <Table dataSource={data} rowKey={obj => obj.id} columns={columns} pagination={false}>

                        </Table>
                        <div className='w-full mt-2'>
                            <button htmlType="button" onClick={onReset} className='w-full text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2'>
                                รีเซ็ต
                            </button>
                        </div>
                        <div className='w-full mt-2'>
                            <button htmlType="submit" className='w-full text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2'>
                                บันทึกข้อมูล
                            </button>
                        </div>
                    </Form>


                </div>
            </div>
        </>
    )
}

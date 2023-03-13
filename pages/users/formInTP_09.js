import React, { useEffect, useState } from 'react'
import { Space, Table, Tag, Checkbox, Row, Form, Divider, Radio } from 'antd';
import UserNavbar from '../Components/UserNavbar';
import { render } from 'react-dom';
const { Column, ColumnGroup } = Table;




export default function formInTP_09() {
    const [isSelected, setIsSelected] = useState();
    const [form] = Form.useForm();
 
    const onFinish = (data) => {
        console.log(data);
    };
   
    const data = [
        {
            key: '1',
            columnName: '1.คณภาพของงาน(Quality of Work)',

        },
        {
            key: '1.1',
            columnName: '1.1 การออกแบบและวางแผนงาน',
        },
        {
            key: '1.2',
            columnName: '1.2 ความรู้ในงานที่ปฏิบัติ',
        },
        {
            key: '1.3',
            columnName: '1.3 ความพร้อมในงานที่ปฏิบัติ',
        },
        {
            key: '1.4',
            columnName: '1.4 ความรับผิดชอบของงานที่ปฏิบัติ',
        },
        {
            key: '1.5',
            columnName: '1.5 ความสามารถในการบริหารงานที่ปฏิบัติ',
        },
        {
            key: '1.6',
            columnName: '1.6 ความถูกต้องของผลงานที่ปฏิบัติ',
        },
        {
            key: '1.7',
            columnName: '1.7 การประเมิณและสรุปผลการปฏิบัติงาน',
        },
        {
            key: '2',
            columnName: '2. ปริมาณการทำงาน (Quantity of Work)',
        },
        {
            key: '2.1',
            columnName: '2.1 เวลาที่ใช้ในการปฏิบัติงาน',
        },
        {
            key: '2.2',
            columnName: '2.2 ปริมาณงานต่อเวลา',
        },
        {
            key: '2.3',
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
                        <Form.Item name={text.columnName} key={text.key} >
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
                        <Form.Item name={text.columnName} key={text.key}>
                            <Space size="middle">
                            <input type={'radio'} name={text.key} value={4}/>
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
                        <Form.Item name={text.columnName}>
                            <Space size="middle">
                            <input type={'radio'} name={text.key} value={3}/>
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
                        <Form.Item name={text.columnName}>
                            <Space size="middle">
                            <input  type={'radio'} name={text.key} value={2}/>
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
                    title:'1',
                    render: (text) =>
                        <Form.Item name={text.columnName}>
                            <Space size="middle">
                            <input type={'radio'} name={text.key} value={1}/>
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
            <div>
                <UserNavbar />
                <header className="bg-white shadow">
                    <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
                        <h3 className=" text-xl font-bold  tracking-tight text-gray-900 inline">แบบประเมินผลการปฏิบัติงานของนักศึกษาจากหน่วยงาน</h3>
                        <p className=' text-blue-700 inline'> </p>
                    </div>
                </header>
                <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">

                    <Form form={form} onFinish={onFinish} name="basic">
                        <Table  dataSource={data} columns={columns} pagination={false}>
                            
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

import React, { useEffect, useState } from 'react'
import { Space, Table, Tag, Checkbox, Row, Form, Divider, Radio } from 'antd';
import UserNavbar from '../Components/UserNavbar';
import { render } from 'react-dom';
const { Column, ColumnGroup } = Table;




export default function formInTP_08() {
    const [isSelected, setIsSelected] = useState();
    const [form] = Form.useForm();
 
    const onFinish = (data) => {
        console.log(data);
    };
   
    const data = [
        {
            key: '1',
            columnName: '1.คุณลักษณะในการปฏิบัติงาน',

        },
        {
            key: '2',
            columnName: '1.1 ความตรงต่อเวลา',
        },
        {
            key: '3',
            columnName: '1.2 ความรู้ในงานที่ปฏิบัติ',
        },
        {
            key: '4',
            columnName: '1.3 ความรับผิดชอบต่องานที่ปฏิบัติ',
        },
        {
            key: '5',
            columnName: '1.4 ความสามารถในการพัฒนาตนเองและงาน',
        },
        {
            key: '6',
            columnName: '1.5 ความสม่ำเสมอของการบันทึกการปฏิบัติงาน',
        },
        {
            key: '7',
            columnName: '2. บุคลิกภาพ',
        },
        {
            key: '8',
            columnName: '2.1 ความเหมาะสมของการแต่งกาย',
        },
        {
            key: '9',
            columnName: '2.2 กริยาวาจาเหมะสมกับกาลเทศะ',
        },
        {
            key: '10',
            columnName: '2.3 มนุษย์สัมพันธ์ต่อบุคลากรในหน่วยงาน',
        },
        {
            key: '11',
            columnName: '2.4 มนุษย์สัมพันธ์ต่อบุคลากรในหน่วยงาน',
        },
        {
            key: '12',
            columnName: '2.5 มนุษย์สัมพันธ์ต่อบุคลากรในหน่วยงาน',
        },
    ];
    const columns = [
        {
            title: 'เกณฑ์การประเมิน',
            dataIndex: 'columnName',
            rowSpan: 2,
            onCell: (_, index) => ({
                colSpan: index === 0 ? 6 : 1,
                colSpan: index === 6 ? 6 : 1,
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
                        if (index === 6) {
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
                        if (index === 6) {
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
                        if (index === 6) {
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
                        if (index === 6) {
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
                        if (index === 6) {
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
                        <h3 className=" text-xl font-bold  tracking-tight text-gray-900 inline">แบบประเมินผลการนิเทศก์ของอาจารย์</h3>
                        <p className=' text-blue-700 inline'></p>
                    </div>
                </header>
                <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">

                    <Form form={form} onFinish={onFinish} name="basic">
                        <Table dataSource={data} columns={columns} pagination={false}>
                            {/* <Column title="เกณฑ์การประเมิน" dataIndex="columnName" key="columnName" />
                            <ColumnGroup title="ระดับคะแนน"  >
                                <Column
                                    title="5"
                                    key="5"
                                    render={(_, record) => (
                                        <Form.Item name={record.columnName + "_score5"}>
                                            <Space size="middle">
                                                <Checkbox name={'score5'} value={"5"}></Checkbox>
                                            </Space>
                                        </Form.Item>
                                    )
                                    }
                                />
                                <Column
                                    title="4"
                                    key="4"
                                    render={(_, record) => (

                                        <Form.Item name={record.columnName + "_score4"}>
                                            <Space size="middle">
                                                <Checkbox name={'score4'} value={"4"}></Checkbox>
                                            </Space>
                                        </Form.Item>
                                    )}
                                />
                                <Column
                                    title="3"
                                    key="3"
                                    render={(_, record) => (
                                        <Form.Item name={record.columnName + "_score3"}>
                                            <Space size="middle">
                                                <Checkbox name={'score3'} value={"3"}></Checkbox>
                                            </Space>
                                        </Form.Item>
                                    )}
                                />
                                <Column
                                    title="2"
                                    key="2"
                                    render={(_, record) => (
                                        <Form.Item name={record.columnName + "_score2"}>
                                            <Space size="middle">
                                                <Checkbox name={'score2'} value={"2"}></Checkbox>
                                            </Space>
                                        </Form.Item>
                                    )}
                                />
                                <Column
                                    title="1"
                                    key="1"
                                    render={(_, record) => (
                                        <Form.Item name={record.columnName + "_score1"}>
                                            <Space size="middle">
                                                <Checkbox name={'score1'} value={"1"}></Checkbox>
                                            </Space>
                                        </Form.Item>
                                    )}
                                />
                            </ColumnGroup> */}
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

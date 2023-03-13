import React from 'react'

import { Card, Col, Row } from 'antd'
import { UsergroupAddOutlined } from '@ant-design/icons';
import UserNavbar from '../Components/UserNavbar';

export default function userIndex() {
    return (
        <>
            <div>
               <UserNavbar/>
                <header className="bg-white shadow">
                    <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
                        <h3 className=" text-xl font-bold  tracking-tight text-gray-900 inline">อาจารย์ อัฐพล พลฤทธิ์</h3>
                        <p className=' text-blue-700 inline'>  สาขาวิทยาการคอมพิวเตอร์</p>
                    </div>
                </header>
                <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                    <div className=' justify-center'>
                        <Row>
                            <Col style={{ width: "300px" }}>
                                <div className='w-full  inline-block px-1 mt-1 '>
                                    <a href='/users/listDiary'>
                                        <Card className=' hover:bg-slate-400'>
                                            <p className='text-center'> <UsergroupAddOutlined style={{ fontSize: "" }} />  รายการบันทึกการปฎิบัติงานประจำวัน</p>
                                        </Card>

                                    </a>
                                </div>
                            </Col>
                            <Col style={{ width: "300px" }}>
                                <div className='w-full  inline-block px-1 mt-1 '>
                                    <a href='/users/formList'>
                                        <Card className=' hover:bg-slate-400'>
                                            <p className='text-center'> <UsergroupAddOutlined style={{ fontSize: "" }} />แบบฟอร์มประเมินนักศึกษา</p>
                                        </Card>

                                    </a>
                                </div>
                            </Col> 
                        </Row>
                    </div>
                </div>
            </div>
        </>
    )
}

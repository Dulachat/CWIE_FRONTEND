import React from 'react'
import { Card, Col, Row } from 'antd'
import { UsergroupAddOutlined } from '@ant-design/icons';
import Navbar from './Components/Navbar';


export default function Index() {
  const iconSize = "large"
  return (
    <div>
      <Navbar/>
      <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
                    <h3 className=" text-xl font-bold  tracking-tight text-gray-900 inline">แอดมิน อัฐพล พลฤทธิ์</h3>
                    
                </div>
            </header>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <div className=' justify-center'>
          <Row>
            <Col style={{ width:"300px" }}>
              <div className='w-full  inline-block px-1 mt-1 '>
                <a href='./admin/userMag'>
                  <Card className=' hover:bg-slate-400'>
                    <p className='text-center'> <UsergroupAddOutlined  />  User Management</p>
                  </Card>
                </a>
              </div>
            </Col>
            <Col style={{ width:"300px" }}>
              <div className='w-full  inline-block px-1 mt-1 '>
                <a href='./admin/studentMag'>
                  <Card className=' hover:bg-slate-400'>
                    <p className='text-center'> <UsergroupAddOutlined  />  Student Management</p>
                  </Card>
                </a>
              </div>
            </Col>
            <Col style={{ width:"300px" }}>
              <div className='w-full inline-block px-1 mt-1'>
                <a href='#'>
                  <Card className=' hover:bg-slate-400'>
                    <p className='text-center'> <UsergroupAddOutlined  />From Management</p>
                  </Card>
                </a>
              </div>
            </Col>
            <Col style={{ width:"300px" }}>
              <div className='w-full inline-block px-1 mt-1'>
                <a href='/admin/internshipMag'>
                  <Card className=' hover:bg-slate-400'>
                    <p className='text-center'> <UsergroupAddOutlined  />  Internship Management</p>
                  </Card>
                </a>
              </div>
            </Col>
          </Row>
          </div>
         
        </div>  
    </div>

  )
}

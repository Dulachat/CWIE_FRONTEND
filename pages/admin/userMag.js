import { Tabs } from 'antd';
import React from 'react';
import Navbar from '../Components/Navbar';


import UserCompany from '../Components/UserCompany';
import UserManageTab1 from '../Components/UserManageTab1';

const size = "large"
export default function UserMag() {


    const items = [
        {
            key: "1",
            label: `จัดการข้อมูลผู้ใช้งาน`,
            children: <UserManageTab1 />,
        },
        {
            key: "2",
            label: `จัดการข้อมูลผู้ใช้สำหรับสถานประกอบการ`,
            children: <UserCompany />,
        }
    ]

    const onChange = (key) => {
        console.log(key);
    };

    return (
        <>
            <Navbar />
            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">User Management</h1>
                </div>
            </header>
            <main className='mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 '>
                <Tabs
                    key={"1"}
                    defaultActiveKey="1"
                    items={items}
                    onChange={onChange}
                />
            </main>



        </>

    )
}

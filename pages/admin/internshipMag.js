import { useState } from 'react';
import Navbar from '../components/Navbar';
import { Space, Table, Tag, Button, Modal, Form, Input, Select, Tabs } from 'antd';
import { EyeOutlined, SettingOutlined } from '@ant-design/icons';
import InternTabs1 from '../components/InternTabs1';
import InternTabs2 from '../components/InternTabs2';
const size = "large"
export default function InternshipMag(key) {
  const iconSize = "large"

  const onChange = (key) => {


  };
  const items = [
    {
      key: '1',
      label: `การประเมิน`,
      children: <InternTabs1 key={key} />
    },
    {
      key: '3',
      label: `จัดการผู้ประเมินนักศึกษา`,
      children: <InternTabs2 key={key} />,
    },
  ];

  return (
    <>
      <Navbar />
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">internship Management</h1>
        </div>
      </header>

      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 ">
          <Tabs key={'1'} defaultActiveKey="1" items={items} onChange={onChange} />
        </div>
      </main>

    </>

  )
}

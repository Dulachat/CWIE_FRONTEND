import React, { useEffect, useState } from 'react'
import { Space, Table, Tag, Button, Modal, Form, Input, Select, Tabs, Row, message } from 'antd';
import { EyeOutlined, SettingOutlined, DeleteOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import axiosInstance from '../../utils/axios'
// import FormEditBranch from './FormEditBranch';

export default function UserCompany() {
    const [messageApi, contextHolder] = message.useMessage();
    const [data, setData] = useState([]);
    const currentYear = new Date().getFullYear()
    const [selectedYear, setSelectedYear] = useState(String(currentYear));

    useEffect(() => {
        axiosInstance.get('assessment/getEvaluator', {
            params: {
                page: 1,
                limit: 10,
                yearTerm: selectedYear
            }
        }).then((res) => {
            setData(res.data.data);
        })
    }, [selectedYear])
    const columns = [
        {
            title: 'ชื่อนักศึกษา',
            dataIndex: "student",
            key: "student_name",
            render: (record) => {
                return record.fname_TH + " " + record.lname_TH
            }
        },
        {
            title: "สถานประกอบการ",
            dataIndex: "companyJoin",
            key: "company_name",
            render: (record) => {
                return record.company_name
            }
        },
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: "Password",
            dataIndex: "rawPwd",
            key: "password",
        },

    ]

    const handleExport = () => {
        try {
            const headers = ["ชื่อนักศึกษา", "Username", "Password"];
            const rows = data.map((item) => {
                const studentName = item?.student ? `${item.student.fname_TH || ''} ${item.student.lname_TH || ''}`.trim() : '';
                return [
                    studentName,
                    item?.username || '',
                    item?.rawPwd || ''
                ];
            });

            const escapeCsv = (value) => {
                const str = String(value ?? '');
                const needsQuotes = /[",\n]/.test(str) || str.includes(',');
                const escaped = str.replace(/"/g, '""');
                return needsQuotes ? `"${escaped}"` : escaped;
            };

            const csvContent = ['\ufeff' + headers.map(escapeCsv).join(','), ...rows.map(r => r.map(escapeCsv).join(','))].join('\n');

            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `user-company-${parseInt(selectedYear) + 543}.csv`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
            messageApi.open({
                type: 'success',
                content: 'ดาวน์โหลดข้อมูลสำเร็จ'
            })
        } catch (error) {
            console.error(error);
            messageApi.open({
                type: 'error',
                content: 'ดาวน์โหลดข้อมูลผิดพลาด'
            })
        }
    }



    return (
        <>
            {contextHolder}
            <div className='w-full '>

                <div className='mr-5 float-right flex '>
                    <div className='text-center flex'>
                        <Select size='large' className='w-full' value={selectedYear} onChange={setSelectedYear}>
                            {Array.from({ length: currentYear - 2024 + 1 }, (_, index) => String(2024 + index))
                                .map((year) => (
                                    <Select.Option key={year} value={year}>{`${parseInt(year) + 543}`}</Select.Option>
                                ))}
                        </Select>
                    </div>
                    <button type="button" onClick={handleExport} className="  ml-2 text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                        Export
                    </button>
                </div>
                <div className='w-full'>
                    <label>รายชื่อสาขาวิชา</label>
                    <Table columns={columns} dataSource={data} pagination={5} style={{ overflow: "auto" }} />
                </div>
            </div  >

        </>



    )
}


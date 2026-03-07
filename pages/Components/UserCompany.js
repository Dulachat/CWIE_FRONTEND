import React, { useEffect, useState } from 'react'
import { Space, Table, Tag, Button, Modal, Form, Input, Select, Tabs, Row, message } from 'antd';
import { EyeOutlined, SettingOutlined, DeleteOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import axiosInstance from '../../utils/axios'
// import FormEditBranch from './FormEditBranch';

export default function UserCompany() {
    const [messageApi, contextHolder] = message.useMessage();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [total, setTotal] = useState(0);
    const currentYear = new Date().getFullYear()
    const [selectedYear, setSelectedYear] = useState(String(currentYear));


    const fetchData = async (page = 1, limit = 10) => {
        setLoading(true);
        try {
            const res = await axiosInstance.get('assessment/getEvaluator', {
                params: {
                    page,
                    limit,
                    yearTerm: selectedYear
                }
            });

            const payload = res?.data ?? {};
            const items = Array.isArray(payload?.data) ? payload.data : Array.isArray(payload) ? payload : [];
            setData(items);

            // รองรับหลายรูปแบบของ total
            const totalFromApi = payload?.total ?? payload?.total ?? (Array.isArray(items) ? items.length : 0);
            setTotal(Number(totalFromApi) || 0);

            setCurrentPage(page);
            setPageSize(limit);
        } catch (error) {
            console.error(error);
            setData([]);
            setTotal(0);
            messageApi.open({ type: 'error', content: 'โหลดข้อมูลไม่สำเร็จ' });
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        // รีเฟรชหน้าเป็นหน้าแรกเมื่อปีเปลี่ยน
        fetchData(1, pageSize);
    }, [selectedYear])
    const columns = [
        {
            title: 'ชื่อนักศึกษา',
            dataIndex: "student",
            key: "student_name",
            render: (record) => {
                return <>
                    {record ? record?.fname_TH + " " + record?.lname_TH : "-"}
                </>
            }
        },
        {
            title: "สถานประกอบการ",
            dataIndex: "companyJoin",
            key: "company_name",
            render: (record) => {
                return record?.company_name
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

    const handleTableChange = (pagination) => {
        const newPage = pagination?.current || 1;
        const newPageSize = pagination?.pageSize || 10;
        if (newPage !== currentPage || newPageSize !== pageSize) {
            fetchData(newPage, newPageSize);
        }
    }

    const handleExport = async () => {
        try {
            const headers = ["ชื่อนักศึกษา", "สถานประกอบการ", "Username", "Password"];
            const getFromApi = await axiosInstance.get('assessment/getEvaluator', {
                params: {
                    page: 1,
                    limit: 1000,
                    yearTerm: selectedYear
                }
            });
            const data = getFromApi?.data?.data ?? [];
            const rows = data.map((item) => {
                const studentName = item?.student ? `${item.student.fname_TH || ''} ${item.student.lname_TH || ''}`.trim() : 'ไม่ระบุ';
                return [
                    studentName,
                    item?.companyJoin?.company_name || 'ไม่ระบุ',
                    item?.username || 'ไม่ระบุ',
                    item?.rawPwd || 'ไม่ระบุ'
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
                    <Table
                        rowKey={(record, index) => record?._id || record?.id || index}
                        columns={columns}
                        dataSource={data}
                        loading={loading}
                        pagination={{
                            current: currentPage,
                            pageSize: pageSize,
                            total: total,
                            showSizeChanger: true,
                            pageSizeOptions: ['10', '20', '50', '100']
                        }}
                        onChange={handleTableChange}
                        style={{ overflow: "auto" }}
                    />
                </div>
            </div  >

        </>



    )
}


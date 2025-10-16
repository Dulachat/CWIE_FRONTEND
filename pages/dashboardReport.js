import React, { useState } from 'react';
import DashboardNavbar from './Components/DashboardNavbar';
import { Table, Card, Button, Row, Col, Layout, Menu } from 'antd';
import {
    BarChartOutlined,
    UserOutlined,
    BankOutlined,
    FileTextOutlined,
    CalendarOutlined,
    SettingOutlined,
    RiseOutlined,
    PieChartOutlined,
    DownloadOutlined
} from '@ant-design/icons';
import DashboardOverview from './Components/dashboard/dashboardOverview';
import DashboardReportTab from './Components/dashboard/dashboardReportTab';

const { Sider, Content } = Layout;

const DashboardReport = () => {
    const [activeTab, setActiveTab] = useState('overview');

    const sidebarItems = [
        { id: 'overview', label: 'ภาพรวม', icon: <BarChartOutlined /> },
        { id: 'reports', label: 'รายงาน', icon: <PieChartOutlined /> },
    ];



    const menuItems = sidebarItems.map(item => ({
        key: item.id,
        icon: item.icon,
        label: item.label,
        onClick: () => setActiveTab(item.id)
    }));

    return (
        <div>
            <DashboardNavbar />
            <Layout className="min-h-screen">

                <Sider
                    width={280}
                    className="bg-white shadow-lg"
                    style={{
                        background: 'white',
                        borderRight: '1px solid #f0f0f0'
                    }}
                >
                    <div className="p-4">
                        <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">
                            Dashboard
                        </h2>

                        <Menu
                            mode="inline"
                            selectedKeys={[activeTab]}
                            items={menuItems}
                            className="border-0"
                            style={{
                                background: 'transparent',
                                border: 'none'
                            }}
                        />

                        {/* Quick Stats */}
                        {/* <Card
                            className="mt-8"
                            size="small"
                            title={<span className="text-sm font-semibold text-gray-700">สถิติด่วน</span>}
                        >
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600 text-sm">นักศึกษาทั้งหมด</span>
                                    <span className="text-blue-600 font-semibold text-base">150</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600 text-sm">บริษัทที่ร่วมงาน</span>
                                    <span className="text-green-600 font-semibold text-base">25</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600 text-sm">ไดอารี่วันนี้</span>
                                    <span className="text-orange-600 font-semibold text-base">45</span>
                                </div>
                            </div>
                        </Card> */}
                    </div>
                </Sider>

                <Content className="p-6">
                    <Card className="shadow-lg">
                        <div className="flex items-center justify-between mb-6">
                            <h1 className="text-2xl font-bold text-gray-800 m-0">
                                {sidebarItems.find(item => item.id === activeTab)?.label}
                            </h1>
                            <div className="flex space-x-2">
                                {/* <Button type="primary" className='bg-blue-500' icon={<FileTextOutlined />}>
                                    สร้างรายงาน
                                </Button> */}
                            </div>
                        </div>

                        {/* Content based on active tab */}
                        <div className="min-h-96">
                            {activeTab === 'overview' && (
                                <DashboardOverview

                                />
                            )}

                            {activeTab === 'reports' && (
                                <DashboardReportTab

                                />
                            )}

                            {activeTab !== 'overview' && activeTab !== 'reports' && (
                                <div className="flex items-center justify-center h-64 text-gray-500">
                                    <div className="text-center">
                                        <div className="text-6xl mb-4">📊</div>
                                        <p className="text-lg">กำลังพัฒนาส่วน {sidebarItems.find(item => item.id === activeTab)?.label}</p>
                                        <p className="text-sm">เร็วๆ นี้จะพร้อมใช้งาน</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </Card>
                </Content>
            </Layout>
        </div>
    );
}

export default DashboardReport;

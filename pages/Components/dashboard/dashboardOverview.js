import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Statistic, Progress, Table, Tag, Space, message } from 'antd';
import { UserOutlined, BankOutlined, FileTextOutlined, TrophyOutlined } from '@ant-design/icons';
import axiosInstance from '../../../utils/axios';

export default function DashboardOverview() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [stats, setStats] = useState({
        totalStudents: 0,
        governmentSchools: 0,
        privateSchools: 0,
        highGrades: 0,
        totalForms: 0
    });
    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get('/formQuestion/all');
            console.log('API Response:', response); // Debug log

            // ตรวจสอบ response structure
            let responseData = [];
            if (response && response.data) {
                // ถ้า response.data เป็น array โดยตรง
                if (Array.isArray(response.data)) {
                    responseData = response.data;
                }
                // ถ้า response.data มี data property ที่เป็น array
                else if (response.data.data && Array.isArray(response.data.data)) {
                    responseData = response.data.data;
                }
                // ถ้า response.data มี records property ที่เป็น array
                else if (response.data.records && Array.isArray(response.data.records)) {
                    responseData = response.data.records;
                }
                // ถ้า response.data เป็น object ที่มี properties เป็น array
                else if (typeof response.data === 'object') {
                    // หา property ที่เป็น array
                    const arrayProperties = Object.values(response.data).filter(val => Array.isArray(val));
                    if (arrayProperties.length > 0) {
                        responseData = arrayProperties[0]; // ใช้ array แรกที่เจอ
                    }
                }
            }

            console.log('Processed Data:', responseData); // Debug log

            // ตรวจสอบว่า responseData เป็น array และมีข้อมูล
            if (!Array.isArray(responseData)) {
                console.warn('Response data is not an array:', responseData);
                responseData = [];
                messageApi.warning('ข้อมูลที่ได้รับไม่ถูกต้อง');
            }

            setData(responseData);

            // Calculate statistics only if we have data
            if (responseData.length > 0) {
                const totalStudents = responseData.length;
                const governmentSchools = responseData.filter(item =>
                    item && item.school_type === '1'
                ).length;
                const privateSchools = responseData.filter(item =>
                    item && item.school_type === '2'
                ).length;
                const highGrades = responseData.filter(item =>
                    item && item.grade === '3.51 ขึ้นไป'
                ).length;

                setStats({
                    totalStudents,
                    governmentSchools,
                    privateSchools,
                    highGrades,
                    totalForms: totalStudents
                });
            } else {
                // Reset stats if no data
                setStats({
                    totalStudents: 0,
                    governmentSchools: 0,
                    privateSchools: 0,
                    highGrades: 0,
                    totalForms: 0
                });
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            messageApi.error('ไม่สามารถดึงข้อมูลได้: ' + (error.message || 'Unknown error'));
            setData([]);
            setStats({
                totalStudents: 0,
                governmentSchools: 0,
                privateSchools: 0,
                highGrades: 0,
                totalForms: 0
            });
        } finally {
            setLoading(false);
        }
    };

    // Top schools data - เพิ่มการตรวจสอบข้อมูล
    const topSchoolsData = data.reduce((acc, item) => {
        if (item && item.old_school) {
            acc[item.old_school] = (acc[item.old_school] || 0) + 1;
        }
        return acc;
    }, {});

    const topSchools = Object.entries(topSchoolsData)
        .map(([school, count]) => ({ school, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);

    // Grade distribution - เพิ่มการตรวจสอบข้อมูล
    const gradeDistribution = data.reduce((acc, item) => {
        if (item && item.grade) {
            acc[item.grade] = (acc[item.grade] || 0) + 1;
        }
        return acc;
    }, {});

    // Occupation distribution - เพิ่มการตรวจสอบข้อมูล
    const occupationDistribution = data.reduce((acc, item) => {
        if (item && item.parents_occupation) {
            acc[item.parents_occupation] = (acc[item.parents_occupation] || 0) + 1;
        }
        return acc;
    }, {});

    const topSchoolsColumns = [
        {
            title: 'ลำดับ',
            key: 'rank',
            width: 60,
            render: (_, __, index) => index + 1,
        },
        {
            title: 'ชื่อโรงเรียน',
            dataIndex: 'school',
            key: 'school',
        },
        {
            title: 'จำนวนนักเรียน',
            dataIndex: 'count',
            key: 'count',
            render: (count) => <Tag color="blue">{count} คน</Tag>,
        },
        {
            title: 'เปอร์เซ็นต์',
            key: 'percentage',
            render: (_, record) => {
                const percentage = stats.totalStudents > 0 ? ((record.count / stats.totalStudents) * 100).toFixed(1) : 0;
                return <Progress percent={parseFloat(percentage)} size="small" />;
            },
        },
    ];

    const gradeColumns = [
        {
            title: 'เกรดเฉลี่ย',
            dataIndex: 'grade',
            key: 'grade',
        },
        {
            title: 'จำนวนนักเรียน',
            dataIndex: 'count',
            key: 'count',
            render: (count) => <Tag color="green">{count} คน</Tag>,
        },
        {
            title: 'เปอร์เซ็นต์',
            key: 'percentage',
            render: (_, record) => {
                const percentage = stats.totalStudents > 0 ? ((record.count / stats.totalStudents) * 100).toFixed(1) : 0;
                return <Progress percent={parseFloat(percentage)} size="small" />;
            },
        },
    ];

    const occupationColumns = [
        {
            title: 'อาชีพ',
            dataIndex: 'occupation',
            key: 'occupation',
        },
        {
            title: 'จำนวน',
            dataIndex: 'count',
            key: 'count',
            render: (count) => <Tag color="orange">{count} คน</Tag>,
        },
        {
            title: 'เปอร์เซ็นต์',
            key: 'percentage',
            render: (_, record) => {
                const percentage = stats.totalStudents > 0 ? ((record.count / stats.totalStudents) * 100).toFixed(1) : 0;
                return <Progress percent={parseFloat(percentage)} size="small" />;
            },
        },
    ];

    return (
        <>
            {contextHolder}
            <div className="space-y-6">
                {/* Main Statistics Cards */}
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={12} md={6}>
                        <Card className="text-center hover:shadow-lg transition-shadow">
                            <Statistic
                                title="นักเรียนทั้งหมด"
                                value={stats.totalStudents}
                                prefix={<UserOutlined className="text-blue-500" />}
                                valueStyle={{ color: '#1890ff' }}
                            />
                            <div className="text-sm text-gray-500 mt-2">คนที่กรอกแบบสอบถาม</div>
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                        <Card className="text-center hover:shadow-lg transition-shadow">
                            <Statistic
                                title="โรงเรียนรัฐบาล"
                                value={stats.governmentSchools}
                                prefix={<BankOutlined className="text-green-500" />}
                                valueStyle={{ color: '#52c41a' }}
                            />
                            <div className="text-sm text-gray-500 mt-2">
                                {stats.totalStudents > 0 ? ((stats.governmentSchools / stats.totalStudents) * 100).toFixed(1) : 0}% ของทั้งหมด
                            </div>
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                        <Card className="text-center hover:shadow-lg transition-shadow">
                            <Statistic
                                title="โรงเรียนเอกชน"
                                value={stats.privateSchools}
                                prefix={<BankOutlined className="text-orange-500" />}
                                valueStyle={{ color: '#fa8c16' }}
                            />
                            <div className="text-sm text-gray-500 mt-2">
                                {stats.totalStudents > 0 ? ((stats.privateSchools / stats.totalStudents) * 100).toFixed(1) : 0}% ของทั้งหมด
                            </div>
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                        <Card className="text-center hover:shadow-lg transition-shadow">
                            <Statistic
                                title="เกรด 3.51+"
                                value={stats.highGrades}
                                prefix={<TrophyOutlined className="text-purple-500" />}
                                valueStyle={{ color: '#722ed1' }}
                            />
                            <div className="text-sm text-gray-500 mt-2">
                                {stats.totalStudents > 0 ? ((stats.highGrades / stats.totalStudents) * 100).toFixed(1) : 0}% ของทั้งหมด
                            </div>
                        </Card>
                    </Col>
                </Row>

                {/* Charts and Tables Row */}
                <Row gutter={[16, 16]}>
                    {/* Top Schools */}
                    <Col xs={24} lg={12}>
                        <Card
                            title="โรงเรียนที่มีนักเรียนมากที่สุด"
                            className="h-full"
                            extra={<Tag color="blue">Top 5</Tag>}
                        >
                            {topSchools.length > 0 ? (
                                <Table
                                    columns={topSchoolsColumns}
                                    dataSource={topSchools}
                                    pagination={false}
                                    size="small"
                                    loading={loading}
                                />
                            ) : (
                                <div className="text-center py-8 text-gray-500">
                                    ไม่มีข้อมูลโรงเรียน
                                </div>
                            )}
                        </Card>
                    </Col>

                    {/* Grade Distribution */}
                    <Col xs={24} lg={12}>
                        <Card
                            title="การกระจายของเกรดเฉลี่ย"
                            className="h-full"
                            extra={<Tag color="green">เกรดเฉลี่ย</Tag>}
                        >
                            {Object.keys(gradeDistribution).length > 0 ? (
                                <Table
                                    columns={gradeColumns}
                                    dataSource={Object.entries(gradeDistribution).map(([grade, count]) => ({
                                        grade,
                                        count
                                    }))}
                                    pagination={false}
                                    size="small"
                                    loading={loading}
                                />
                            ) : (
                                <div className="text-center py-8 text-gray-500">
                                    ไม่มีข้อมูลเกรดเฉลี่ย
                                </div>
                            )}
                        </Card>
                    </Col>
                </Row>

                {/* Occupation and Additional Stats */}
                <Row gutter={[16, 16]}>
                    {/* Occupation Distribution */}
                    <Col xs={24} lg={12}>
                        <Card
                            title="อาชีพของผู้ปกครอง"
                            className="h-full"
                            extra={<Tag color="orange">อาชีพ</Tag>}
                        >
                            {Object.keys(occupationDistribution).length > 0 ? (
                                <Table
                                    columns={occupationColumns}
                                    dataSource={Object.entries(occupationDistribution).map(([occupation, count]) => ({
                                        occupation,
                                        count
                                    }))}
                                    pagination={false}
                                    size="small"
                                    loading={loading}
                                />
                            ) : (
                                <div className="text-center py-8 text-gray-500">
                                    ไม่มีข้อมูลอาชีพ
                                </div>
                            )}
                        </Card>
                    </Col>

                    {/* Quick Insights */}
                    <Col xs={24} lg={12}>
                        <Card
                            title="ข้อมูลสรุป"
                            className="h-full"
                            extra={<Tag color="purple">สรุป</Tag>}
                        >
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">อัตราการตอบแบบสอบถาม:</span>
                                    <span className="font-semibold text-blue-600">
                                        {stats.totalStudents > 0 ? '100%' : '0%'}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">สัดส่วนโรงเรียนรัฐบาล:</span>
                                    <span className="font-semibold text-green-600">
                                        {stats.totalStudents > 0 ? ((stats.governmentSchools / stats.totalStudents) * 100).toFixed(1) : 0}%
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">สัดส่วนโรงเรียนเอกชน:</span>
                                    <span className="font-semibold text-orange-600">
                                        {stats.totalStudents > 0 ? ((stats.privateSchools / stats.totalStudents) * 100).toFixed(1) : 0}%
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">นักเรียนเกรดสูง:</span>
                                    <span className="font-semibold text-purple-600">
                                        {stats.totalStudents > 0 ? ((stats.highGrades / stats.totalStudents) * 100).toFixed(1) : 0}%
                                    </span>
                                </div>
                            </div>
                        </Card>
                    </Col>
                </Row>

                {/* Recent Activity */}
                <Card title="กิจกรรมล่าสุด" extra={<Tag color="cyan">ล่าสุด</Tag>}>
                    {data.length > 0 ? (
                        <div className="space-y-3">
                            {data.slice(0, 5).map((item, index) => (
                                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                            <UserOutlined className="text-blue-600" />
                                        </div>
                                        <div>
                                            <div className="font-medium">
                                                นักเรียนจาก {item.old_school || 'ไม่ระบุ'}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                {item.province && item.district ? `${item.district}, ${item.province}` : 'ไม่ระบุที่อยู่'}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-sm text-gray-500">
                                            {item.createdAt ? new Date(item.createdAt).toLocaleDateString('th-TH') : 'ไม่ระบุวันที่'}
                                        </div>
                                        <Tag color={item.school_type === '1' ? 'green' : 'orange'}>
                                            {item.school_type === '1' ? 'รัฐบาล' : item.school_type === '2' ? 'เอกชน' : 'ไม่ระบุ'}
                                        </Tag>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8 text-gray-500">
                            ไม่มีข้อมูลกิจกรรมล่าสุด
                        </div>
                    )}
                </Card>
            </div>
        </>
    );
}

import React, { useState, useEffect, useCallback } from 'react';
import { Table, Card, Button, Input, Space, Tag, Row, Col, Select, DatePicker, message, Tooltip } from 'antd';
import { DownloadOutlined, SearchOutlined, ReloadOutlined, EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import axiosInstance from '../../../utils/axios';

const { Search } = Input;
const { RangePicker } = DatePicker;

export default function DashboardReportTab() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filteredData, setFilteredData] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [selectedAcademicYear, setSelectedAcademicYear] = useState('all');
    const [dateRange, setDateRange] = useState(null);
    const [messageApi, contextHolder] = message.useMessage();
    const [paginationData, setPaginationData] = useState({
        total: 0,
        page: 1,
        limit: 10,
        totalPages: 0
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [summaryData, setSummaryData] = useState({
        totalStudents: 0,
        governmentSchools: 0,
        privateSchools: 0,
        highGrades: 0
    });

    // สร้างรายการปีการศึกษา เริ่มจากปี 2564 ถึงปัจจุบัน
    const academicYears = [];
    const currentYear = new Date().getFullYear() + 543; // แปลงเป็นปี พ.ศ.
    for (let year = 2564; year <= currentYear; year++) {
        academicYears.push({
            value: year.toString(),
            label: `ปีการศึกษา ${year}`
        });
    }

    // Fetch data from API
    useEffect(() => {
        fetchData(1, 10); // เริ่มต้นด้วยหน้า 1 และ 10 รายการต่อหน้า
    }, []);

    const fetchData = async (page = 1, limit = 10) => {
        setLoading(true);
        try {
            // สร้าง params object
            const params = {
                page: page,
                limit: limit
            };

            // เพิ่ม academicYear parameter ถ้าไม่ใช่ 'all'
            if (selectedAcademicYear !== 'all') {
                params.academicYear = selectedAcademicYear;
            }

            // ส่ง parameters ไปยัง API
            const response = await axiosInstance.get('/formQuestion/all', { params });
            console.log('API Response:', response); // Debug log

            // ตรวจสอบ response structure
            let responseData = [];
            let apiPaginationData = null;
            let apiSummaryData = null;

            if (response && response.data) {
                // ถ้า response.data มี data property ที่เป็น array (API structure ใหม่)
                if (response.data.data && Array.isArray(response.data.data)) {
                    responseData = response.data.data;
                    apiPaginationData = response.data.pagination;
                    apiSummaryData = response.data.summary;
                    console.log('Using response.data.data (new API structure)');
                }
                // ถ้า response.data เป็น array โดยตรง (API structure เก่า)
                else if (Array.isArray(response.data)) {
                    responseData = response.data;
                    console.log('Using response.data directly (old API structure)');
                }
                // ถ้า response.data มี records property ที่เป็น array
                else if (response.data.records && Array.isArray(response.data.records)) {
                    responseData = response.data.records;
                    apiPaginationData = response.data.pagination;
                    apiSummaryData = response.data.summary;
                    console.log('Using response.data.records');
                }
                // ถ้า response.data เป็น object ที่มี properties เป็น array
                else if (typeof response.data === 'object') {
                    // หา property ที่เป็น array
                    const arrayProperties = Object.values(response.data).filter(val => Array.isArray(val));
                    if (arrayProperties.length > 0) {
                        responseData = arrayProperties[0]; // ใช้ array แรกที่เจอ
                        console.log('Using first array property found');
                    }
                }
            }

            console.log('Processed Data:', responseData); // Debug log
            console.log('API Pagination:', apiPaginationData); // Debug log
            console.log('API Summary:', apiSummaryData); // Debug log

            // ตรวจสอบว่า responseData เป็น array และมีข้อมูล
            if (!Array.isArray(responseData)) {
                console.warn('Response data is not an array:', responseData);
                responseData = [];
                messageApi.warning('ข้อมูลที่ได้รับไม่ถูกต้อง');
            }

            setData(responseData);
            setFilteredData(responseData);

            // อัปเดต pagination data
            if (apiPaginationData) {
                setPaginationData({
                    total: apiPaginationData.total || 0,
                    page: apiPaginationData.page || page,
                    limit: apiPaginationData.limit || limit,
                    totalPages: apiPaginationData.totalPages || 0
                });
            } else {
                // ถ้าไม่มี pagination จาก API ให้ใช้ข้อมูลจาก array
                setPaginationData({
                    total: responseData.length,
                    page: page,
                    limit: limit,
                    totalPages: Math.ceil(responseData.length / limit)
                });
            }

            // อัปเดต summary data
            if (apiSummaryData) {
                setSummaryData({
                    totalStudents: apiSummaryData.totalStudents || 0,
                    governmentSchools: apiSummaryData.governmentSchools || 0,
                    privateSchools: apiSummaryData.privateSchools || 0,
                    highGrades: apiSummaryData.highGrades || 0
                });
            } else {
                // ถ้าไม่มี summary จาก API ให้คำนวณจากข้อมูลที่ได้
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

                setSummaryData({
                    totalStudents,
                    governmentSchools,
                    privateSchools,
                    highGrades
                });
            }

            // อัปเดต current page และ page size
            setCurrentPage(page);
            setPageSize(limit);

        } catch (error) {
            console.error('Error fetching data:', error);
            messageApi.error('ไม่สามารถดึงข้อมูลได้: ' + (error.message || 'Unknown error'));
            setData([]);
            setFilteredData([]);
            setPaginationData({
                total: 0,
                page: page,
                limit: limit,
                totalPages: 0
            });
            setSummaryData({
                totalStudents: 0,
                governmentSchools: 0,
                privateSchools: 0,
                highGrades: 0
            });
        } finally {
            setLoading(false);
        }
    };

    // Filter data based on search and filters
    useEffect(() => {
        // ตรวจสอบว่า data เป็น array ก่อน
        if (!Array.isArray(data)) {
            setFilteredData([]);
            return;
        }

        let filtered = data;

        // Status filter
        // if (selectedStatus !== 'all') {
        //     filtered = filtered.filter(item => item && item.school_type === selectedStatus);
        // }

        // Date range filter
        if (dateRange && dateRange.length === 2) {
            filtered = filtered.filter(item => {
                if (!item || !item.createdAt) return false;
                const itemDate = new Date(item.createdAt);
                return itemDate >= dateRange[0].startOf('day').toDate() &&
                    itemDate <= dateRange[1].endOf('day').toDate();
            });
        }

        setFilteredData(filtered);
    }, [data, dateRange]);

    // Search function - fetch new data from API
    const searchData = useCallback(async (searchQuery) => {
        setLoading(true);
        try {
            // สร้าง params object
            const params = {
                page: 1 // เริ่มต้นที่หน้า 1
            };

            // เพิ่ม search parameter ถ้ามี
            if (searchQuery && searchQuery.trim()) {
                params.search = searchQuery;
            }

            // เพิ่ม schoolType parameter ถ้าไม่ใช่ 'all'
            if (selectedStatus !== 'all') {
                params.schoolType = selectedStatus;
            }

            // เพิ่ม academicYear parameter ถ้าไม่ใช่ 'all'
            if (selectedAcademicYear !== 'all') {
                params.academicYear = selectedAcademicYear;
            }

            // เลือก endpoint ที่เหมาะสม
            let endpoint = '/formQuestion/search';
            if (!searchQuery.trim() && selectedStatus === 'all' && selectedAcademicYear === 'all') {
                endpoint = '/formQuestion/all';
                params.limit = pageSize;
            }

            // ส่ง parameters ไปยัง API
            const response = await axiosInstance.get(endpoint, { params });

            console.log('API Response:', response);

            // ตรวจสอบ response structure
            let responseData = [];
            let apiPaginationData = null;
            let apiSummaryData = null;

            if (response && response.data) {
                if (response.data.data && Array.isArray(response.data.data)) {
                    responseData = response.data.data;
                    apiPaginationData = response.data.pagination;
                    apiSummaryData = response.data.summary;
                } else if (Array.isArray(response.data)) {
                    responseData = response.data;
                } else if (response.data.records && Array.isArray(response.data.records)) {
                    responseData = response.data.records;
                    apiPaginationData = response.data.pagination;
                    apiSummaryData = response.data.summary;
                }
            }

            if (!Array.isArray(responseData)) {
                responseData = [];
                messageApi.warning('ข้อมูลที่ได้รับไม่ถูกต้อง');
            }

            setData(responseData);
            setFilteredData(responseData);

            // อัปเดต pagination data
            if (apiPaginationData) {
                setPaginationData({
                    total: apiPaginationData.total || 0,
                    page: 1, // reset ไปหน้า 1
                    limit: pageSize,
                    totalPages: apiPaginationData.totalPages || 0
                });
            } else {
                setPaginationData({
                    total: responseData.length,
                    page: 1,
                    limit: pageSize,
                    totalPages: Math.ceil(responseData.length / pageSize)
                });
            }

            // อัปเดต summary data
            if (apiSummaryData) {
                setSummaryData({
                    totalStudents: apiSummaryData.totalStudents || 0,
                    governmentSchools: apiSummaryData.governmentSchools || 0,
                    privateSchools: apiSummaryData.privateSchools || 0,
                    highGrades: apiSummaryData.highGrades || 0
                });
            } else {
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

                setSummaryData({
                    totalStudents,
                    governmentSchools,
                    privateSchools,
                    highGrades
                });
            }

            setCurrentPage(1); // reset ไปหน้า 1

        } catch (error) {
            console.error('Error fetching data:', error);
            messageApi.error('ไม่สามารถดึงข้อมูลได้: ' + (error.message || 'Unknown error'));
        } finally {
            setLoading(false);
        }
    }, [pageSize, selectedStatus, selectedAcademicYear]);

    // Effect สำหรับ filter ตาม selectedStatus และ selectedAcademicYear
    useEffect(() => {
        // ไม่ต้องเรียก searchData หรือ fetchData ที่นี่
        // ให้ useEffect ของ searchText จัดการแทน
    }, [selectedStatus, selectedAcademicYear]); // ลบ dependencies ที่ไม่จำเป็น

    // Debounced search effect
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (searchText.trim() || selectedStatus !== 'all' || selectedAcademicYear !== 'all') {
                // มี search text หรือมีการเลือก filter: เรียก search API
                searchData(searchText);
            } else {
                // ไม่มี search text และไม่มีการเลือก filter: เรียก all API
                fetchData(1, pageSize);
            }
        }, 500); // รอ 500ms หลังจากผู้ใช้หยุดพิมพ์

        return () => clearTimeout(timeoutId);
    }, [searchText, selectedStatus, selectedAcademicYear, searchData, pageSize]);

    // Export to CSV function
    const exportToCSV = () => {
        if (filteredData.length === 0) {
            messageApi.warning('ไม่มีข้อมูลให้ส่งออก');
            return;
        }

        // Prepare data for export
        const exportData = filteredData.map((item, index) => ({
            'ลำดับ': index + 1,
            'รหัสนักศึกษา': item.student_id || '-',
            'โรงเรียนเดิม': item.old_school || '-',
            'อำเภอ': item.district || '-',
            'จังหวัด': item.province || '-',
            'ประเภทสถานศึกษา': item.school_type === '1' ? 'รัฐบาล' : item.school_type === '2' ? 'เอกชน' : '-',
            'เกรดเฉลี่ย': item.grade || '-',
            'อาชีพผู้ปกครอง': item.parents_occupation || '-',
            'รายได้ครอบครัว': item.earnings || '-',
            'ปัจจัยด้านวิชาการ': item.f_academy || '-',
            'ปัจจัยด้านการเงิน': item.f_finance || '-',
            'ปัจจัยด้านหลักสูตร': item.course || '-',
            'ปัจจัยด้านครอบครัว': item.family || '-',
            'ปัจจัยด้านสังคม': item.society || '-',
            'ปัจจัยการประชาสัมพันธ์': item.f_public_relation || '-',
            'วันที่สร้าง': item.createdAt ? new Date(item.createdAt).toLocaleDateString('th-TH') : '-'
        }));

        // Convert to CSV
        const headers = Object.keys(exportData[0]);
        const csvContent = [
            headers.join(','), // Header row
            ...exportData.map(row =>
                headers.map(header => {
                    const value = row[header];
                    // Handle values that contain commas, quotes, or newlines
                    if (typeof value === 'string' && (value.includes(',') || value.includes('"') || value.includes('\n'))) {
                        return `"${value.replace(/"/g, '""')}"`;
                    }
                    return value;
                }).join(',')
            )
        ].join('\n');

        // Add BOM for proper UTF-8 encoding in Excel
        const BOM = '\uFEFF';
        const csvContentWithBOM = BOM + csvContent;

        // Create and download file
        const blob = new Blob([csvContentWithBOM], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `รายงานข้อมูลนักศึกษา_${new Date().toLocaleDateString('th-TH').replace(/\//g, '-')}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        messageApi.success('ส่งออกไฟล์ CSV สำเร็จ');
    };

    // Handle table change (pagination, filters, sorter)
    const handleTableChange = (pagination, filters, sorter) => {
        console.log('Table change:', { pagination, filters, sorter });

        // เมื่อเปลี่ยน pagination
        if (pagination) {
            const newPage = pagination.current || 1;
            const newPageSize = pagination.pageSize || 10;

            // ถ้าเปลี่ยน page หรือ pageSize ให้ fetch ข้อมูลใหม่
            if (newPage !== currentPage || newPageSize !== pageSize) {
                console.log(`Fetching new data: page ${newPage}, pageSize ${newPageSize}`);
                fetchData(newPage, newPageSize);
            }
        }

        // เมื่อเปลี่ยน filters หรือ sorter (ถ้าต้องการ)
        if (filters) {
            console.log('Filters changed:', filters);
            // สามารถเพิ่ม logic สำหรับ filters ได้
        }

        if (sorter) {
            console.log('Sorter changed:', sorter);
            // สามารถเพิ่ม logic สำหรับ sorting ได้
        }
    };

    // Table columns configuration
    const columns = [
        {
            title: 'ลำดับ',
            dataIndex: 'index',
            key: 'index',
            width: 60,
            render: (_, __, index) => index + 1,
        },
        {
            title: 'รหัสนักศึกษา',
            dataIndex: 'student_id',
            key: 'student_id',
            width: 120,
            render: (text) => text || '-',
        },
        {
            title: 'โรงเรียนเดิม',
            dataIndex: 'old_school',
            key: 'old_school',
            width: 200,
            render: (text) => text || '-',
        },
        {
            title: 'อำเภอ/จังหวัด',
            key: 'location',
            width: 150,
            render: (_, record) => (
                <div>
                    <div>{record.district || '-'}</div>
                    <div className="text-gray-500 text-xs">{record.province || '-'}</div>
                </div>
            ),
        },
        {
            title: 'ประเภทสถานศึกษา',
            dataIndex: 'school_type',
            key: 'school_type',
            width: 120,
            render: (text) => {
                if (text === '1') return <Tag color="blue">รัฐบาล</Tag>;
                if (text === '2') return <Tag color="green">เอกชน</Tag>;
                return '-';
            },
        },
        {
            title: 'เกรดเฉลี่ย',
            dataIndex: 'grade',
            key: 'grade',
            width: 100,
            render: (text) => text || '-',
        },
        {
            title: 'อาชีพผู้ปกครอง',
            dataIndex: 'parents_occupation',
            key: 'parents_occupation',
            width: 150,
            render: (text) => text || '-',
        },
        {
            title: 'รายได้ครอบครัว',
            dataIndex: 'earnings',
            key: 'earnings',
            width: 120,
            render: (text) => text || '-',
        },
        {
            title: 'การประเมิน',
            key: 'evaluation',
            width: 200,
            render: (_, record) => (
                <div className="space-y-1">
                    <div className="text-xs">
                        <span className="font-medium">วิชาการ:</span> {record.f_academy || '-'}
                    </div>
                    <div className="text-xs">
                        <span className="font-medium">การเงิน:</span> {record.f_finance || '-'}
                    </div>
                    <div className="text-xs">
                        <span className="font-medium">หลักสูตร:</span> {record.course || '-'}
                    </div>
                </div>
            ),
        },
        {
            title: 'วันที่สร้าง',
            dataIndex: 'createdAt',
            key: 'createdAt',
            width: 120,
            render: (text) => text ? new Date(text).toLocaleDateString('th-TH') : '-',
        },
        // {
        //     title: 'การดำเนินการ',
        //     key: 'actions',
        //     width: 120,
        //     render: (_, record) => (
        //         <Space size="small">
        //             <Tooltip title="ดูรายละเอียด">
        //                 <Button type="text" icon={<EyeOutlined />} size="small" />
        //             </Tooltip>
        //             <Tooltip title="แก้ไข">
        //                 <Button type="text" icon={<EditOutlined />} size="small" />
        //             </Tooltip>
        //             <Tooltip title="ลบ">
        //                 <Button type="text" icon={<DeleteOutlined />} size="small" danger />
        //             </Tooltip>
        //         </Space>
        //     ),
        // },
    ];

    return (
        <>
            {contextHolder}
            <div className="space-y-6">
                {/* Header Section */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">รายงานข้อมูลนักศึกษา</h2>
                        <p className="text-gray-600">จัดการและดูข้อมูลการประเมินปัจจัยการตัดสินใจเข้าศึกษาต่อ</p>
                    </div>
                    <div className="flex gap-2">
                        <Button
                            type="primary"
                            icon={<DownloadOutlined />}
                            onClick={exportToCSV}
                            className="bg-blue-600 hover:bg-blue-700"
                        >
                            ส่งออก CSV
                        </Button>
                        {/* <Button
                            icon={<ReloadOutlined />}
                            onClick={fetchData}
                            loading={loading}
                        >
                            รีเฟรช
                        </Button> */}
                    </div>
                </div>

                {/* Filters Section */}
                <Card className="shadow-sm">
                    <Row gutter={[16, 16]} align="middle">
                        <Col xs={24} sm={12} md={8} lg={6}>
                            <Search
                                placeholder="ค้นหาโรงเรียน, อำเภอ, จังหวัด, รหัสนักศึกษา"
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                                allowClear
                            />
                        </Col>
                        <Col xs={24} sm={12} md={8} lg={6}>
                            <Select
                                placeholder="เลือกประเภทสถานศึกษา"
                                value={selectedStatus}
                                onChange={setSelectedStatus}
                                style={{ width: '100%' }}
                                allowClear
                            >
                                <Select.Option value="all">ทั้งหมด</Select.Option>
                                <Select.Option value="1">รัฐบาล</Select.Option>
                                <Select.Option value="2">เอกชน</Select.Option>
                            </Select>
                        </Col>
                        <Col xs={24} sm={12} md={8} lg={6}>
                            <Select
                                placeholder="เลือกปีการศึกษา"
                                value={selectedAcademicYear}
                                onChange={setSelectedAcademicYear}
                                style={{ width: '100%' }}
                                allowClear
                            >
                                <Select.Option value="all">ทุกปีการศึกษา</Select.Option>
                                {academicYears.map(year => (
                                    <Select.Option key={year.value} value={year.value}>
                                        {year.label}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Col>
                        {/* <Col xs={24} sm={12} md={8} lg={6}>
                            <RangePicker
                                placeholder={['วันที่เริ่มต้น', 'วันที่สิ้นสุด']}
                                value={dateRange}
                                onChange={setDateRange}
                                style={{ width: '100%' }}
                                format="DD/MM/YYYY"
                            />
                        </Col> */}
                        <Col xs={24} sm={12} md={8} lg={6}>
                            <div className="text-sm text-gray-600">
                                แสดงข้อมูล: <span className="font-semibold text-blue-600">{filteredData.length}</span> รายการ
                                {selectedAcademicYear !== 'all' && (
                                    <span className="ml-2 text-gray-500">
                                        (ปีการศึกษา {selectedAcademicYear})
                                    </span>
                                )}
                            </div>
                        </Col>
                    </Row>
                </Card>

                {/* Table Section */}
                <Card className="shadow-sm">
                    <Table
                        columns={columns}
                        dataSource={filteredData}
                        loading={loading}
                        pagination={{
                            current: currentPage,
                            pageSize: pageSize,
                            total: paginationData.total,
                            showSizeChanger: true,
                            showQuickJumper: true,
                            showTotal: (total, range) =>
                                `แสดง ${range[0]}-${range[1]} จาก ${paginationData.total} รายการ`,
                            pageSizeOptions: ['10', '20', '50', '100'],
                        }}
                        scroll={{ x: 1500 }}
                        rowKey="id"
                        size="middle"
                        onChange={handleTableChange}
                    />
                </Card>

                {/* Summary Section */}
                <Card className="shadow-sm">
                    <Row gutter={[16, 16]}>
                        <Col xs={24} sm={12} md={6}>
                            <div className="text-center p-4 bg-blue-50 rounded-lg">
                                <div className="text-2xl font-bold text-blue-600">
                                    {summaryData.totalStudents}
                                </div>
                                <div className="text-sm text-blue-800">ข้อมูลทั้งหมด</div>
                            </div>
                        </Col>
                        <Col xs={24} sm={12} md={6}>
                            <div className="text-center p-4 bg-green-50 rounded-lg">
                                <div className="text-2xl font-bold text-green-600">
                                    {summaryData.governmentSchools}
                                </div>
                                <div className="text-sm text-green-800">โรงเรียนรัฐบาล</div>
                            </div>
                        </Col>
                        <Col xs={24} sm={12} md={6}>
                            <div className="text-center p-4 bg-orange-50 rounded-lg">
                                <div className="text-2xl font-bold text-orange-600">
                                    {summaryData.privateSchools}
                                </div>
                                <div className="text-sm text-orange-800">โรงเรียนเอกชน</div>
                            </div>
                        </Col>
                        <Col xs={24} sm={12} md={6}>
                            <div className="text-center p-4 bg-purple-50 rounded-lg">
                                <div className="text-2xl font-bold text-purple-600">
                                    {summaryData.highGrades}
                                </div>
                                <div className="text-sm text-purple-800">เกรด 3.51+</div>
                            </div>
                        </Col>
                    </Row>
                </Card>
            </div>
        </>
    );
}

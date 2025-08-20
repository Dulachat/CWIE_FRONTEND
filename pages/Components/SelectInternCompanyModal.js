'use client'
import React, { useEffect, useState } from 'react';
import { Button, Modal, Select, Spin, message } from 'antd';
import axiosInstance from "../../utils/axios";
const SelectInternCompanyModal = ({ open, setOpen }) => {

    const [company, setCompany] = useState([]);
    const [assessment, setAssessment] = useState([]);
    const [selectedAssessment, setSelectedAssessment] = useState(null);
    const [teacher, setTeacher] = useState([]);
    const [selectedTeacher, setSelectedTeacher] = useState(null);
    const [userData, setUserData] = useState(null);

    const [messageApi, contextHolder] = message.useMessage();

    // ดึงข้อมูล user จาก localStorage เมื่อ component mount
    useEffect(() => {
        if (typeof window !== 'undefined' && window.localStorage) {
            const userDataFromStorage = window.localStorage.getItem('user');
            if (userDataFromStorage) {
                setUserData(JSON.parse(userDataFromStorage));
            }
        }
    }, []);

    useEffect(() => {
        const fetchCompany = async () => {
            const response = await axiosInstance.get('/company/allCompany');
            setCompany(response.data);
        }
        fetchCompany();

        const fetchAssessment = async () => {
            const response = await axiosInstance.get('/assessment/getOneHead/1');
            console.log(response.data);
            setAssessment(response.data);
        }
        fetchAssessment();
    }, []);

    // ดึงข้อมูลครูเมื่อ userData พร้อมแล้ว
    useEffect(() => {
        if (userData?.data?.branch_id) {
            const fetchTeacher = async () => {
                const response = await axiosInstance.get("users/getSelect/" + userData.data.branch_id)
                setTeacher(response.data);
            }
            fetchTeacher();
        }
    }, [userData]);


    const onConfirm = () => {
        Modal.confirm({
            title: "ยืนยันการเลือกสถานประกอบการณ์",
            content: "ยืนยันการเลือกสถานประกอบการณ์",
            okButtonProps: {
                className: "bg-indigo-600 hover:bg-indigo-700"
            },
            onOk: () => {
                console.log(selectedAssessment)
                console.log(selectedCompany)
                console.log(selectedTeacher)
                const data = {
                    header_id: selectedAssessment.id,
                    company_id: selectedCompany.id,
                    evaluator1_id: selectedTeacher.id,
                    student_id: userData.data.id,
                }
                axiosInstance.post('assessment/addDetail', data)
                    .then(response => {
                        if (response.data.message === "already have") {
                            messageApi.open({
                                type: "warning",
                                content: "การออกฝึกนี้ถูกเพิ่มไปแล้ว",
                            });
                        }
                        else if (response.data === "success") {
                            messageApi.open({
                                type: "success",
                                content: "บันทึกข้อมูลเรียบร้อย",
                            });
                        } else {
                            messageApi.open({
                                type: "error",
                                content: "บันทึกข้อมูลไม่สำเร็จ",
                            });
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    })

                setOpen(false);
                setSelectedCompany(null);
                setSelectedAssessment(null);
                setSelectedTeacher(null);
            }
        });
    }

    const [selectedCompany, setSelectedCompany] = useState(null);

    return (
        <div>
            {contextHolder}
            <Modal
                title="เลือกการออกฝึก"
                open={open}
                onCancel={() => setOpen(false)}
                footer={null}
            >
                <div className='mt-4'>
                    <Select
                        showSearch
                        placeholder="เลือกการออกฝึก"
                        value={selectedAssessment?.id || undefined}
                        size='large'
                        style={{ width: '100%' }}
                        optionFilterProp="label"
                        filterOption={(input, option) => {
                            if (!option || !option.label) return false;
                            return option.label.toLowerCase().includes(input.toLowerCase());
                        }}
                        showArrow={true}
                        allowClear={true}
                        notFoundContent="ไม่พบการออกฝึกที่ค้นหา"
                        onChange={(value) => {
                            if (value) {
                                const selectedAssessmentData = assessment.find(item => item.id === value);
                                setSelectedAssessment(selectedAssessmentData);
                            } else {
                                setSelectedAssessment(null);
                            }
                        }}
                    >
                        {assessment.map((item, index) => (
                            <Select.Option key={`${item.id}-${index}`} value={item.id}>
                                {item.assessment_name}
                            </Select.Option>
                        ))}
                    </Select>
                </div>
                <div className='mt-4'>
                    <Select
                        showSearch
                        placeholder="เลือกสถานประกอบการณ์"
                        value={selectedCompany?.id || undefined}
                        size='large'
                        style={{ width: '100%' }}
                        optionFilterProp="label"
                        filterOption={(input, option) => {
                            if (!option || !option.label) return false;
                            return option.label.toLowerCase().includes(input.toLowerCase());
                        }}
                        showArrow={true}
                        allowClear={true}
                        notFoundContent="ไม่พบสถานประกอบการณ์ที่ค้นหา"
                        onChange={(value) => {
                            if (value) {
                                const selectedCompanyData = company.find(item => item.id === value);
                                setSelectedCompany(selectedCompanyData);
                            } else {
                                setSelectedCompany(null);
                            }
                        }}
                    >
                        {company.map((item, index) => (
                            <Select.Option
                                key={`${item.company_name}-${item.id}`}
                                value={item.id}
                            >
                                {item.company_name}
                            </Select.Option>
                        ))}
                    </Select>
                </div>
                <div className='mt-4'>
                    <Select
                        showSearch
                        placeholder="เลือกอาจารย์ประจำสาขา"
                        value={selectedTeacher?.id || undefined}
                        size='large'
                        style={{ width: '100%' }}
                        onChange={(value) => {
                            if (value) {
                                const selectedTeacherData = teacher.find(item => item.id === value);
                                setSelectedTeacher(selectedTeacherData);
                            } else {
                                setSelectedTeacher(null);
                            }
                        }}
                    >
                        {teacher.map((item, index) => (
                            <Select.Option key={`${item.fname_TH}-${item.id}`} value={item.id}>
                                {item.fname_TH} {item.lname_TH}
                            </Select.Option>
                        ))}
                    </Select>
                </div>

                <div className='mt-4' style={{ display: selectedCompany ? 'block' : 'none' }}>
                    <p className='text-md font-bold'>รายละเอียดสถานประกอบการณ์</p>
                    <p className='text-sm text-gray-500'>ชื่อสถานประกอบการณ์: {selectedCompany?.company_name}</p>
                    <p className='text-sm text-gray-500'>ที่อยู่: {selectedCompany?.company_address}</p>
                    <p className='text-sm text-gray-500'>เบอร์โทรศัพท์สถานประกอบการณ์: {selectedCompany?.company_tel}</p>

                </div>

                <div className='mt-4'>
                    <Button type='primary'
                        className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        onClick={onConfirm}
                        disabled={!selectedCompany && !selectedAssessment && !selectedTeacher}
                    >ยืนยัน</Button>
                </div>
            </Modal>
        </div>
    );
}

export default SelectInternCompanyModal;

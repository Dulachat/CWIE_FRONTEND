import React, { useEffect, useState } from 'react'
import { Space, Table, Tag, Button, Modal, Form, Input, Select, message } from 'antd';
import bcrypt from 'bcryptjs'
import { useRouter } from 'next/router';
import axiosInstance from '../../utils/axios'
import studentMag from '../admin/studentMag';
import { useCookies } from 'react-cookie';
const size = "large"
export default function FormStudentIntern() {
    const router = useRouter();
    const [messageApi, contextHolder] = message.useMessage();
    const [branchData, setBranchData] = useState([]);
    const [detailHead, setDetailHead] = useState([]);
    const [isLogin, setIsLogin] = useState(false)
    const [item, setItem] = useState([]);
    const [itemAddress, setItemAddress] = useState([null]);
    const [dummyState, rerender] = React.useState(1);
    const axios = require('axios');
    const [dataStore, setDataStore] = useState()
    const [data, setData] = useState()
    useEffect(() => {
        const stored = localStorage.getItem('user');
        setDataStore(stored ? JSON.parse(stored) : fallbackValue);
    }, [])
    useEffect(() => {
        if (dataStore === undefined) return
        setData(dataStore.data)

    }, [dataStore])
    useEffect(() => {
        if (data === undefined) return
            setIsLogin(true);
            setItem(data)
            setItemAddress(data.address)
    }, [data])

    useEffect(() => {
        axiosInstance.get('branch/allBranch')
            .then(function (response) {   
                setBranchData(response.data)
            })
    }, [])
    useEffect(() => {
   
        if (item === undefined) return
        axiosInstance.get('assessment/getOneDetail/' + item.id)
            .then((res) => {
                setDetailHead(res.data)
            })
            .catch((err) => console.log(err))
    }, [setItem, item])
    const messageUp = () => {
        messageApi.open({
            type: 'success',
            content: 'แก้ไขข้อมูลเรียบร้อย',
        });
        setTimeout(() => {
            router.push({
                pathname: "/student/addInternDetail",
                query: { reload: 1 }
            })
        }, 500)
    }
    const sendEdit = (data) => {

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({
            "address_no": data.address_no,
            "age": data.age,
            "dateofbirth": data.dateofbirth,
            "district": data.district,
            "emergency_person_fname": data.emergency_person_fname,
            "emergency_person_lname": data.emergency_person_lname,
            "emergency_tel": data.emergency_tel,
            "expiry_date": data.expiry_date,
            "facebook": data.facebook,
            "fname_EN": data.fname_EN,
            "fname_TH": data.fname_TH,
            "id_card": data.id_card,
            "issue_at": data.issue_at,
            "issue_date": data.issue_date,
            "lname_EN": data.lname_EN,
            "lname_TH": data.lname_TH,
            "moo": data.moo,
            "nationality": data.nationality,
            "p_height": data.p_height,
            "p_weight": data.p_weight,
            "postal_code": data.postal_code,
            "province": data.province,
            "race": data.race,
            "religion": data.religion,
            "road": data.road,
            "sex": data.sex,
            "student_group": data.student_group,
            "student_id": data.student_id,
            "sub_district": data.sub_district,
            "evaluator2_id": data.evaluator2_id,

        });
        var requestOptions = {
            method: 'PATCH',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        fetch(process.env.NEXT_PUBLIC_API_URL + "student/updateStudentIntern/" + item.id, requestOptions)
            .then(response => response.text())
            .then(result => { messageUp() }
            )
            .catch(error => console.log('error', error));
    }
    return (
        <>
            {contextHolder}
            <Form
                layout="inline"
                name='EditUser'
                onFinish={sendEdit}
                key={item.id}

            >
                {item.waitings_status === "1" &&
                    <div className="w-full mt-2 ">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">รายชื่อพี่เลี้ยง
                            <Form.Item
                                name={"evaluator2_id"}
                                rules={[{ required: true, message: "กรุณาเลือกพี่เลี้ยง" }]}
                            >
                                <Select size={size} >
                                    {detailHead.map((data) => (
                                        <Select.Option key={data.id} value={data.id}>{data.fname_TH + " " + data.lname_TH}</Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </label>
                    </div>
                }

                <div className="w-1/2 mt-2 ">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ชื่อบุคคลติดต่อกรณีฉุกเฉิน
                        <Form.Item
                            initialValue={item.emergency_person_fname}
                            name={"emergency_person_fname"}
                            rules={[{ required: true, message: "กรุณากรอก ชื่อบุคคลติดต่อกรณีฉุกเฉิน" }]}
                        >
                            <Input value={item.emergency_person_fname} className='  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                        </Form.Item>
                    </label>
                </div>
                <div className="w-1/2 mt-2 ">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">นามสกุลบุคคลติดต่อกรณีฉุกเฉิน
                        <Form.Item
                            initialValue={item.emergency_person_lname}
                            name={"emergency_person_lname"}
                            rules={[{ required: true, message: "กรุณากรอก นามสกุลบุคคลติดต่อกรณีฉุกเฉิน" }]}
                        >
                            <Input value={item.emergency_person_lname} className='  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                        </Form.Item>
                    </label>
                </div>
                <div className="w-1/2 mt-2 ">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">เบอร์โทรบุคคลติดต่อกรณีฉุกเฉิน
                        <Form.Item
                            initialValue={item.emergency_tel}
                            name={"emergency_tel"}
                            rules={[{ required: true, message: "กรุณากรอกเบอร์โทรบุคคลติดต่อกรณีฉุกเฉิน" }]}
                        >
                            <Input minLength={10} maxLength={10} value={item.emergency_tel} className='  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                        </Form.Item>
                    </label>
                </div>
                <div className="w-full mt-2 ">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">รหัสบัตรประชาชน
                        <Form.Item
                            initialValue={item.id_card}
                            name={"id_card"}
                            rules={[{ required: true, message: "กรุณากรอกรหัสบัตรประชาชน" }, { min: 13, message: "กรุณากรอกข้อมูลให้ครบ" }, { pattern: "[0-9]", message: "กรอกรูปแบบข้อมูลให้ถูกต้อง" }]}
                        >
                            <Input minLength={13} maxLength={13} value={item.id_card} className='  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                        </Form.Item>
                    </label>
                </div>
                <div className="w-1/2 mt-2 ">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ออกให้ ณ
                        <Form.Item
                            initialValue={item.issue_at}
                            name={"issue_at"}
                            rules={[{ required: true, message: "กรุณากรอก สถานที่ออกบัตร" }]}
                        >
                            <Input value={item.issue_at} className='  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                        </Form.Item>
                    </label>
                </div>
                <div className="w-1/4 mt-2 ">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">วันออกบัตร
                        <Form.Item
                            initialValue={item.issue_date}
                            name={"issue_date"}
                            rules={[{ required: true, message: "กรุณากรอก วันออกบัตร" }]}
                        >
                            <Input type='date' value={item.issue_date} className='  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                        </Form.Item>
                    </label>
                </div>
                <div className="w-1/4 mt-2 ">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">วันหมดอายุ
                        <Form.Item
                            initialValue={item.expiry_date}
                            name={"expiry_date"}
                            rules={[{ required: true, message: "กรุณากรอก วันหมดอายุ" }]}
                        >
                            <Input type='date' value={item.expiry_date} className='  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                        </Form.Item>
                    </label>
                </div>
                <div className="w-1/4 mt-2 ">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">เชื้อชาติ
                        <Form.Item
                            initialValue={item.race}
                            name={"race"}
                            rules={[{ required: true, message: "กรุณากรอก เชื้อชาติ" }]}
                        >
                            <Input value={item.race} className='  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                        </Form.Item>
                    </label>
                </div>
                <div className="w-1/4 mt-2 ">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">สัญชาติ
                        <Form.Item
                            initialValue={item.nationality}
                            name={"nationality"}
                            rules={[{ required: true, message: "กรุณากรอก สัญชาติ" }]}
                        >
                            <Input value={item.nationality} className='  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                        </Form.Item>
                    </label>
                </div>
                <div className="w-1/4 mt-2 ">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ศาสนา
                        <Form.Item
                            initialValue={item.religion}
                            name={"religion"}
                            rules={[{ required: true, message: "กรุณากรอก ศาสนา" }]}
                        >
                            <Input value={item.religion} className='  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                        </Form.Item>
                    </label>
                </div>

                <div className="w-1/4 mt-2 ">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">วัน-เดือน-ปีเกิด
                        <Form.Item
                            initialValue={item.dateofbirth}
                            name={"dateofbirth"}

                            rules={[{ required: true, message: "กรุณาเลือก วัน-เดือน-ปีเกิด" }]}
                        >
                            <Input value={item.dateofbirth} type='date' className='  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                        </Form.Item>
                    </label>
                </div>
                <div className="w-1/4 mt-2 ">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">อายุ
                        <Form.Item
                            initialValue={item.age}
                            name={"age"}
                            rules={[{ required: true, message: "กรุณากรอก อายุ" }]}
                        >
                            <Input value={item.age} className='  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                        </Form.Item>
                    </label>
                </div>
                <div className="w-1/4 mt-2 ">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">เพศ
                        <Form.Item
                            initialValue={item.sex}
                            name={"sex"}
                            rules={[{ required: true, message: "กรุณาเลือกสาขาวิชา" }]}
                        >
                            <Select size={size} >
                                <Select.Option value="male">ชาย</Select.Option>
                                <Select.Option value="female">หญิง</Select.Option>

                            </Select>
                        </Form.Item>
                    </label>
                </div>
                <div className="w-1/4 mt-2 ">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ส่วนสูง
                        <Form.Item
                            initialValue={item.p_height}
                            name={"p_height"}
                            rules={[{ required: true, message: "กรุณากรอก ส่วนสูง" }]}
                        >
                            <Input type='number' value={item.p_height} className='  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                        </Form.Item>
                    </label>
                </div>
                <div className="w-1/4 mt-2 ">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">น้ำหนัก
                        <Form.Item
                            initialValue={item.p_weight}
                            name={"p_weight"}
                            rules={[{ required: true, message: "กรุณากรอก น้ำหนัก" }]}
                        >
                            <Input type='number' value={item.p_weight} className='  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                        </Form.Item>
                    </label>
                </div>
                <div className='w-full mt-5'> <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ที่อยู่ตามบัตรประชาชน </label></div>
                <div className="w-1/12 mt-2 ">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">เลขที่
                        <Form.Item
                            initialValue={itemAddress.address_no}
                            name={"address_no"}
                            rules={[{ required: true, message: "กรุณากรอก เลขที่" }]}
                        >
                            <Input value={itemAddress.address_no} className='  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                        </Form.Item>
                    </label>
                </div>
                <div className="w-1/12 mt-2 ">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">หมู่ที่
                        <Form.Item
                            initialValue={itemAddress.moo}
                            name={"moo"}
                            rules={[{ required: true, message: "กรุณากรอก หมู่ที่" }]}
                        >
                            <Input value={itemAddress.moo} className='  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                        </Form.Item>
                    </label>
                </div>
                <div className="w-1/6 mt-2 ">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ถนน
                        <Form.Item
                            initialValue={itemAddress.road}
                            name={"road"}
                            rules={[{ required: true, message: "กรุณากรอก ถนน" }]}
                        >
                            <Input value={itemAddress.road} className='  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                        </Form.Item>
                    </label>
                </div>
                <div className="w-1/6 mt-2 ">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ตำบล/แขวง
                        <Form.Item
                            initialValue={itemAddress.sub_district}
                            name={"sub_district"}
                            rules={[{ required: true, message: "กรุณากรอก ตำบล/แขวง" }]}
                        >
                            <Input value={itemAddress.sub_district} className='  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                        </Form.Item>
                    </label>
                </div>
                <div className="w-1/6 mt-2 ">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">อำเภอ/เขต
                        <Form.Item
                            initialValue={itemAddress.district}
                            name={"district"}
                            rules={[{ required: true, message: "กรุณากรอก อำเภอ/เขต" }]}
                        >
                            <Input value={itemAddress.district} className='  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                        </Form.Item>
                    </label>
                </div>
                <div className="w-1/6 mt-2 ">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">จังหวัด
                        <Form.Item
                            initialValue={itemAddress.province}
                            name={"province"}
                            rules={[{ required: true, message: "กรุณากรอก อำเภอ/เขต" }]}
                        >
                            <Input value={itemAddress.province} className='  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                        </Form.Item>
                    </label>
                </div>
                <div className="w-1/6 mt-2 ">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">รหัสไปรษณีย์
                        <Form.Item
                            initialValue={itemAddress.postal_code}
                            name={"postal_code"}
                            rules={[{ required: true, message: "กรุณากรอก รหัสไปรษณีย์" }]}
                        >
                            <Input maxLength={5} value={itemAddress.postal_code} className='  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                        </Form.Item>
                    </label>
                </div>
                <div className="w-full mt-5 ">
                    <Form.Item  >
                        <Button className=" text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2" htmlType="submit" block size={size}>
                            บันทึกข้อมูล
                        </Button>
                    </Form.Item>
                </div>

            </Form>
        </>
    )
}

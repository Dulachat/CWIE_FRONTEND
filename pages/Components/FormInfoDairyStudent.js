import { Form, Input, message, Upload, Modal } from 'antd'
import React, { useState } from 'react'
import { PlusOutlined } from '@ant-design/icons';

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });


export default function FormInfoDiaryStudent() {
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState([]); //showImage in values array

    const handleCancel = () => setPreviewOpen(false);
    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };
    const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
    const uploadButton = (
        <div >
            <PlusOutlined />
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </div>
    );
    return (
        <>
            <Form
                layout="inline"
                name='AddDiary'
                action='#'>

                <div className='w-full mt-2'>
                    <label className="block mb-2 text-sm font-medium text-gray-900  dark:text-white">รายการปฏิบัติงานประจำวันที่
                        <Form.Item

                            name={"diary_date"}
                            rules={[{ required: true, message: "เลือกวันที่" }]}>

                            <Input type='date' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' disabled />
                        </Form.Item>
                    </label>
                </div>

                <div className='w-full mt-2'>
                    <label className="block mb-2 text-sm font-medium text-gray-900  dark:text-white"> เวลาเข้างาน
                        <Form.Item
                            name={"in_time"}
                            rules={[{ required: true, message: "กรอกเวลาเข้างาน" }]}>

                            <Input type='time' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' disabled />
                        </Form.Item>
                    </label>
                </div>
                <div className=' w-full mt-2'>
                    <label className="block mb-2 text-sm font-medium text-gray-900  dark:text-white"> เวลาออกงาน
                        <Form.Item
                            name={"out_time"}
                            rules={[{ required: true, message: "กรอกเวลาออกงาน" }]}>

                            <Input type='time' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' disabled />
                        </Form.Item>
                    </label>
                </div>
                <div className='w-full'>
                    <label className="block mb-2 text-sm font-medium text-gray-900  dark:text-white"> รายละเอียด
                        <Form.Item name={"diary_detail"} >
                            <Input.TextArea style={{ height: 100 }} disabled />
                        </Form.Item>
                    </label>
                </div>
                <div className='w-full mt-2  justify-self-center'>
                    <label className="block mb-2 text-sm font-medium text-gray-900  dark:text-white"> แนบรูปภาพ </label>
                        <Upload

                            listType="picture-card"
                            fileList={fileList}
                            onPreview={handlePreview}
                            onChange={handleChange}
                            className="justify-self-center"
                        >
                            {fileList.length >= 8 ? null : uploadButton}
                        </Upload>
                   
                    <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel} className="justify-self-center mx-10">
                        <img
                            alt="example"
                            style={{
                                width: '100%',
                            }}
                            src={previewImage}
                        />
                    </Modal>

                </div>
                <div className='w-full'>
                    <label className="block mb-2 text-sm font-medium text-gray-900  dark:text-white"> คำแนะนำจากอาจารย์
                        <Form.Item name={"diary_comment"} >
                            <Input.TextArea style={{ height: 100 }} readOnly/>
                        </Form.Item>
                    </label>
                </div>
                <div className='w-full mt-2'>
                    <button className='w-full text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2'>
                        บันทึกข้อมูล
                    </button>
                </div>

            </Form>
        </>
    )
}

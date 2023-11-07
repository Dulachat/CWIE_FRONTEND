import { Card } from 'antd'
import React, { useEffect, useState } from 'react'
import StudentNavbar from '../components/StudentNavbar'
import { useRouter } from 'next/router'
import axiosInstance from '../../utils/axios'
import FormEditDiary from '../components/FormEditDiary'


export default function EditDiary() {
    const router = useRouter();
    const [data, setData] = useState();
    const [dataStore , setDataStore] = useState()
    const Id =  router.query.id
    useEffect(() => {
        const stored = localStorage.getItem("user");
        setDataStore(stored ? JSON.parse(stored) : fallbackValue);
      }, []);
    let dataObj = {};
    useEffect(() => {
        if(Id && dataStore){
            axiosInstance.get(`Diary/oneDiaryId/${Id}/${dataStore?.data?.id}`)
            .then((res) => {
                dataObj={
                    status:200,
                    message:'success',
                }
                setData(res.data)
            })
            .catch((error) =>{
                dataObj={
                    status:404,
                    message:'error',
                    detail:error
                }
            });
        }        
    }, [Id])
    if( data === undefined) return
    return (
        <>
            <StudentNavbar />
            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
                    <h3 className=" text-xl font-bold  tracking-tight text-gray-900 inline">{dataStore?.data?.title_name + dataStore?.data?.fname_TH + " "+dataStore?.data?.lname_TH}</h3>
                    {/* <p className=' text-blue-700 inline'> บริษัท วันม็อบบี้ จำกัด</p> */}
                </div>
            </header>
            <main>
                <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                    <Card style={{ width: "90%" }} title={"บันทึกประจำวัน"}>
                        <FormEditDiary data={data}/>
                    </Card>

                </div>
            </main>
        </>
    )
}

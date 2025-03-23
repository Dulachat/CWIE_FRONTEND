import { Badge } from 'antd';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useRouter } from 'next/router';
import { Alert, Calendar } from 'antd';
import dayjs from 'dayjs';
import StudentNavbar from '../components/StudentNavbar';
import axiosInstance from '../../utils/axios';


export default function StudentCalendarDiary() {
    const router = useRouter();
    const [dayData,setDayData  ] = useState([]);
    const [data, setData] = useState([undefined]);
    const [isLogin, setIsLogin] = useState(false)
    const [dataStore, setDataStore] = useState()
    const [dataDisplay, setDataDisplay] = useState()
    useEffect(() => {
        // Retrieve data from local storage
        const stored = localStorage.getItem('user');
        const storedData = stored ? JSON.parse(stored) : fallbackValue;
      
        // Set the dataStore state
        setDataStore(storedData);
      
        // Set the dataDisplay state based on dataStore
        if (storedData !== undefined) {
          setDataDisplay(storedData.data);
        }
      
        // Fetch data from the server using axios
        axiosInstance.get(`Diary/allDiary/${storedData.data.id}`)
          .then((res) => {
            setDayData(res.data);
          })
          .catch((error) => console.log(error));
      }, []);
    const getListData = (value) => {
        let listData;
        dayData.map((day) => {

            if (day.diary_date === value.format("YYYY-MM-DD") && day.Detail.detail_text.length > 0) {
                listData = [
                    {
                        type: 'success',
                        content: "ลงบันทึกแล้ว"
                    },
                ];
                return listData;
            }
            else if (day.diary_date === value.format("YYYY-MM-DD") && day.Detail.detail_text.length >= 0) {
                listData = [
                    {
                        type: 'success',
                        content: "ลงบันทึกแล้ว"
                    },
                    {
                        type: 'warning',
                        content: "ยังไม่ใส่รายละเอียด"
                    },
                ];
                return listData;
            }
            else {

                return listData || [];
            }
        })
        return listData || [];
    };
    var today = new Date();
    const [value, setValue] = useState(() => dayjs());
    const [selectedValue, setSelectedValue] = useState(() => dayjs(today))
    const [dummyState, rerender] = React.useState(1);

  
    const onSelect = (newValue) => {
        setSelectedValue(newValue)
        rerender(dummyState + 1)
        setValue(newValue)
        getEvent(newValue)
    };
    
    const getEvent = (event) => {
        axiosInstance.get(`Diary/oneDiary/${event.format("YYYY-MM-DD")}/${dataStore.data.id}`)
            .then((res) => {
                if (!res.data) {
                    console.log("No data")
                }
                else {
                    setData(res.data);
                    if (confirm("ดูรายละเอียดเพิ่มเติม")) {
                        router.push({
                            pathname: "editDiary",
                            query: { id: res.data.id }
                        })
                    }

                }
            })
            .catch((error) => console.log(error));
    }

    const onPanelChange = (value, mode) => {
        console.log(value.format('YYYY-MM-DD'), mode);
    };


    const monthCellRender = (value) => {
        const num = getMonthData(value);
        return num ? (
            <div className="notes-month">
                <section>{num}</section>
                <span>Backlog number</span>
            </div>
        ) : null;
    };
    const dateCellRender = (value) => {
        const listData = getListData(value);
        return (
            <ul className="events">
                {listData.map((item) => (
                    <li key={item.content}>
                        <Badge status={item.type} text={item.content} />
                    </li>
                ))}
            </ul>
        );
    };

    const cellRender = (current, info) => {
        if (info === 'date') return dateCellRender(current);
        if (info === 'month') return monthCellRender(current);
        return info.originNode;
    };
    const addDairy = () => {
        router.push({
            pathname: "/student/addDairy"
        })
    }
    console.log(dataDisplay)

    return (
        <>
            <StudentNavbar />
            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
                    <h3 className=" text-xl font-bold  tracking-tight text-gray-900 inline">{dataDisplay?.title_name + dataDisplay?.fname_TH + " "+dataDisplay?.lname_TH}</h3>
                    {/* <p className=' text-blue-700 inline'> บริษัท วันม็อบบี้ จำกัด</p> */}
                </div>
            </header>
            <main>
                <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                    <div className=' float-right'>
                        <button type="button" onClick={addDairy} className=" mr-5 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                            ลงบันทึกประจำวัน
                        </button>
                    </div>
                    <Alert message={`วันที่ : ${selectedValue?.format('DD-MM-YYYY')}`} className="mx-2" />
                    <Calendar className='mt-3 px-5 ' dateCellRender={dateCellRender} value={value} onSelect={onSelect} onPanelChange={onPanelChange} />
                </div>
            </main>

        </>
    )
}

import React, { useState, useEffect } from 'react'
import { Card, } from 'antd'
import {  ContainerTwoTone } from '@ant-design/icons';
import UserNavbar from '../components/UserNavbar';
import Link from 'next/link';

import { useRouter } from 'next/router';
export default function FormList() {

    const router = useRouter()
    const [isLogin, setIsLogin] = useState(false)
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
            setIsLogin(true)
    }, [data])

    return (
        <>{isLogin === true &&
            <div>
                <UserNavbar />
                <header className="bg-white shadow">
                    <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
                        <h3 className=" text-xl font-bold  tracking-tight text-gray-900 inline">{data.userLevelJoin.level_name + data?.fname_TH + " " + data?.lname_TH}</h3>
                        <p className=' text-blue-700 inline'> </p>
                    </div>
                </header>
                <main>
                    <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                        <div className=' mx-auto max-w-7xl py-6 sm:px-6 lg:px-8'>
                            {data.userLevelJoin.level_name === "อาจารย์" &&
                                <div className='w-full '>
                                    <Link href="/users/formListStudent08">
                                        <div className='w-full px-10'>
                                            <Card className='mx-2  h-16 bg-gradient-to-tr from-yellow-300 to-pink-500  hover:bg-gradient-to-bl'>
                                            </Card>
                                        </div>
                                        <div className=' w-full -mt-7'>
                                            <Card className=' mx-auto w-11/12 h-20  border-red-400  hover:bg-slate-200 ' >
                                                <div>
                                                    <p className=' text-lg text-center font-bold'> <ContainerTwoTone style={{ fontSize: "30px" }} />  IN-TP08</p>
                                                </div>
                                            </Card>
                                        </div>
                                    </Link>
                                </div>
                            }
                            {data.userLevelJoin.level_name === "พี่เลี้ยง" &&
                                <div className='w-full mt-2'>
                                    <Link href="/users/formListStudent09">
                                        <div className='w-full px-10'>
                                            <Card className='mx-2  h-16 bg-gradient-to-tr from-yellow-300 to-pink-500  hover:bg-gradient-to-bl'>
                                            </Card>
                                        </div>
                                        <div className=' w-full -mt-7'>
                                            <Card className=' mx-auto w-11/12 h-20  border-red-400  hover:bg-slate-200 ' >
                                                <div>
                                                    <p className=' text-lg text-center font-bold'> <ContainerTwoTone style={{ fontSize: "30px" }} />  IN-TP09</p>
                                                </div>
                                            </Card>
                                        </div>
                                    </Link>
                                </div>
                            }

                        </div>
                    </div>
                </main>

            </div>
        }

        </>
    )
}

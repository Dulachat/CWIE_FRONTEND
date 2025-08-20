import React, { useEffect, useState } from 'react'
import { Card, Col, Row } from 'antd'
import { ContainerTwoTone, SlidersTwoTone, ContactsTwoTone, AppstoreTwoTone } from '@ant-design/icons';
import Navbar from '../Components/Navbar';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function AdminIndex() {
  const router = useRouter();
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
    if (data.userLevelJoin.level_name === "อาจารย์" || data.userLevelJoin.level_name === "พี่เลี้ยง") {
      router.back();
    } else {
      setIsLogin(true)
    }
  }, [data])


  return (
    <>

      <div>
        <Navbar />
        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
            <h3 className=" text-xl font-bold  tracking-tight text-gray-900 inline">แอดมิน {data?.fname_TH + " " + data?.lname_TH}</h3>

          </div>
        </header>

        <main>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
              <div className='w-full '>
                <Link href="/admin/userMag" >
                  <div className='w-full px-10'>
                    <Card className='mx-2  h-16 bg-gradient-to-tr from-yellow-300 to-pink-500  hover:bg-gradient-to-bl'>
                    </Card>
                  </div>
                  <div className=' w-full -mt-7'>
                    <Card className=' mx-auto w-11/12 h-20  border-red-400  hover:bg-slate-200 ' >
                      <div>
                        <p className=' text-lg text-center font-bold'> <SlidersTwoTone style={{ fontSize: "30px" }} />  User Management</p>
                      </div>
                    </Card>
                  </div>
                </Link>
              </div>
              <div className='w-full mt-2 '>
                <Link href="/admin/studentMag" >
                  <div className='w-full px-10'>
                    <Card className='mx-2  h-16 bg-gradient-to-tr from-yellow-300 to-pink-500  hover:bg-gradient-to-bl'>
                    </Card>
                  </div>
                  <div className=' w-full -mt-7'>
                    <Card className=' mx-auto w-11/12 h-20  border-red-400  hover:bg-slate-200 ' >
                      <div>
                        <p className=' text-lg text-center font-bold'> <ContactsTwoTone style={{ fontSize: "30px" }} />  Student Management</p>
                      </div>
                    </Card>
                  </div>
                </Link>
              </div>
              <div className='w-full mt-2'>
                <Link href="/admin/internshipMag" >
                  <div className='w-full px-10'>
                    <Card className='mx-2  h-16 bg-gradient-to-tr from-yellow-300 to-pink-500  hover:bg-gradient-to-bl'>
                    </Card>
                  </div>
                  <div className=' w-full -mt-7'>
                    <Card className=' mx-auto w-11/12 h-20  border-red-400  hover:bg-slate-200 ' >
                      <div>
                        <p className=' text-lg text-center font-bold'> <ContainerTwoTone style={{ fontSize: "30px" }} />  Internship Management</p>
                      </div>
                    </Card>
                  </div>
                </Link>
              </div>
              <div className='w-full mt-2'>
                <Link href="/admin/generalMag" >
                  <div className='w-full px-10'>
                    <Card className='mx-2  h-16 bg-gradient-to-tr from-yellow-300 to-pink-500  hover:bg-gradient-to-bl'>
                    </Card>
                  </div>
                  <div className=' w-full -mt-7'>
                    <Card className=' mx-auto w-11/12 h-20  border-red-400  hover:bg-slate-200 ' >
                      <div>
                        <p className=' text-lg text-center font-bold'> <AppstoreTwoTone style={{ fontSize: "30px" }} />  General Management</p>
                      </div>
                    </Card>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>

    </>
  )
}

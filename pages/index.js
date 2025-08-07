import { Card, Row, Col, message } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import DashboardNavbar from './components/DashboardNavbar'
import { ContainerTwoTone, ContactsTwoTone } from '@ant-design/icons'
export default function Index() {
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();
  const [isLogin, setIsLogin] = useState(false)
  const [dataStore, setDataStore] = useState()
  const [userStatus, setUserStatus] = useState()
  const [data, setData] = useState()
  const [usersType, setUserType] = useState("")
  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored === null) {
      router.push('/auth/login')
    } else {
      setDataStore(stored ? JSON.parse(stored) : undefined);
    }
  }, [])
  useEffect(() => {
    if (dataStore === undefined) return
    setData(dataStore.data)
  }, [dataStore])
  useEffect(() => {
    if (data === undefined) return
    if (data.userLevelJoin !== undefined) {
      setUserStatus(data.userLevelJoin.level_name)
      setIsLogin(true)
    }
    if (data.student_id !== undefined) {
      setUserStatus('student')
      setIsLogin(true)
    }
  }, [data])

  useEffect(() => {
    if (userStatus === "แอดมิน") {
      setUserType("U")

    }
    if (userStatus === "อาจารย์") {
      setUserType("U")

    }
    if (userStatus === 'student') {
      setUserType("S")
    }
  }, [userStatus])

  const checkUser = () => {

    if (userStatus === "แอดมิน") {

      router.push('/admin')
    }
    if (userStatus === "อาจารย์") {

      router.push('/users')
    }
    if (userStatus === "พี่เลี้ยง") {

      router.push('/users')
    }
    if (userStatus === 'student') {

      router.push('/student')
    }
  }
  const comingSoon = () => {
    messageApi.open({
      type: 'warning',
      content: 'COMING SOON',
    }, 2000);
  }
  const ToProIntern = () => {
    router.push({
      pathname: `${process.env.NEXT_PUBLIC_WEB_URL_PRE}`,
      query: {
        slug: data.uuid,
        userType: usersType
      }
    })
  }

  return (
    <>
      {contextHolder}
      {isLogin === true &&
        <div>
          <DashboardNavbar />
          <header className="bg-white shadow">
            <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
              <h3 className=" text-xl font-bold  tracking-tight text-gray-900 inline">สวัสดีคุณ{' ' + data?.fname_TH + ' ' + data?.lname_TH}</h3>

            </div>
          </header>
          <main>
            <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
              <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                {data.intern_status !== "1" && data.intern_status !== "2" &&
                  <div className='w-full '>
                    <a onClick={checkUser}>
                      <div className='w-full px-10'>
                        <Card className='mx-2  h-16 bg-gradient-to-tr from-yellow-300 to-pink-500  hover:bg-gradient-to-bl'>
                        </Card>
                      </div>
                      <div className=' w-full -mt-7'>
                        <Card className=' mx-auto w-11/12 h-20  border-red-400  hover:bg-slate-200 ' >
                          <div>
                            <p className=' text-lg text-center font-bold'> <ContainerTwoTone style={{ fontSize: "30px" }} /> ระบบสหกิจศึกษา/ระบบฝึกประสบการณ์วิชาชีพ</p>
                          </div>
                        </Card>
                      </div>
                    </a>
                  </div>
                }

                {data?.userLevelJoin?.level_name !== "พี่เลี้ยง" &&
                  <div className='w-full mt-2 '>
                    <a onClick={ToProIntern}>
                      <div className='w-full px-10'>
                        <Card className='mx-2  h-16 bg-gradient-to-tr from-yellow-300 to-pink-500  hover:bg-gradient-to-bl'>
                        </Card>
                      </div>
                      <div className=' w-full -mt-7'>
                        <Card className=' mx-auto w-11/12 h-20 border-red-400 hover:bg-slate-200 ' >
                          <div>
                            <p className=' text-lg text-center font-bold'><ContactsTwoTone style={{ fontSize: "30px" }} />  ระบบเตรียมสหกิจศึกษา/ระบบเตรียมฝึกประสบการณ์วิชาชีพ</p>
                          </div>
                        </Card>
                      </div>
                    </a>
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

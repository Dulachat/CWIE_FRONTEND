import React from 'react'
import { LockClosedIcon } from '@heroicons/react/20/solid'
import { Card, Row, Col, Image } from 'antd'
export default function login() {
    return (

        <>
    
            <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-md space-y-8">
                    <div>
                        <img
                            className="mx-auto h-12 w-auto"
                            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                            alt="Your Company"
                        />
                        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                            เข้าสู่ระบบ
                        </h2>
                        <h4 className=" font-bold text-red-800 text-center">ระบบนิเทศนักศึกษาสหกิจศึกษา</h4>
                        <p className="text-center text-rose-600 relative">คณะเทคโนโลยีอุตสหกรรม มหาวิทยาลัยราชภัฎเลย</p>   

                    </div>
                    <form className="mt-8 space-y-6" action="#" method="POST">
                        <input type="hidden" name="remember" defaultValue="true" />
                        <div className="-space-y-px rounded-md shadow-sm">
                            <div>
                                <label htmlFor="email-address" className="sr-only">
                                    Email address
                                </label>
                                <input
                                    id="email-address"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    placeholder="Email address"
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="sr-only">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    placeholder="Password"
                                />
                            </div>
                        </div>
                        <div className='flex w-full justify-center'>
                            <a href="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
                                ลงทะเบียนใช้งาน
                            </a>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                    <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                                </span>
                                เข้าสู่ระบบ
                            </button>
                        </div>
                    </form>
                </div>
                {/* <div className='backdrop-grayscale-0 bg-white/30 ...'>
                <div className=' max-w-xl rounded overflow-hidden shadow-lg  ml-12 mt-10 ' style={{ height:"500px",width:"800px" ,backgroundImage: `url("https://lru.ac.th/th/wp-content/uploads/2021/01/333964_168149796611205_1366741102_o-800x445.jpg")`,backgroundSize:"cover"}}
                  >      <span className='' style={{ height:"px", width:"800px" }}></span>
                        <h4 className=" font-bold text-red-700 text-center  " style={{ marginTop:"40%" }}>ระบบนิเทศนักศึกษาสหกิจศึกษา</h4>
                        <p className="text-center text-white relative">คณะเทคโนโลยีอุตสหกรรม มหาวิทยาลัยราชภัฎเลย</p>   
                </div>
                </div> */}
               
            </div>


        </>

    )
}

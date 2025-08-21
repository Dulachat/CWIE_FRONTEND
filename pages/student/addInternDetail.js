import React from 'react'
import StudentNavbar from '../Components/StudentNavbar'
import { Card } from 'antd'
import FormStudentIntern from '../Components/FormStudentIntern'
export default function addInternDetail() {
    return (
        <>
            <StudentNavbar />
            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">

                </div>
            </header>
            <main>
                <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                    <Card style={{ width: "90%" }} title={"เพิ่มรายละเอียดข้อมูลออกฝึก"}>

                        <FormStudentIntern key={"Intern"} />
                    </Card>

                </div>
            </main>
        </>
    )
}

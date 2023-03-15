import React from 'react'
import {Routes, Route } from 'react-router-dom'
import HomeStudent from '../Pages/Student/HomeStudent'
import LeaveApplication from '../Pages/Student/LeaveApplication'
import LoginStudent from '../Pages/Student/LoginStudent'
import Payments from '../Pages/Student/Payments'
import StudentHistoryPage from '../Pages/Student/StudentHistoryPage'
import StudentVerification from '../Varification/StudentVerification'

const StudentRoutes = () => {
  return (
    <Routes>

        <Route path="/" element={<LoginStudent/>} ></Route>
        
        <Route path="/home" element={<StudentVerification><HomeStudent/></StudentVerification>} ></Route>

        <Route path="/history" element={<StudentVerification><StudentHistoryPage/></StudentVerification>} ></Route>

        <Route path="/leave-applications" element={<StudentVerification><LeaveApplication/></StudentVerification>} ></Route>

        <Route path="/payments" element={<StudentVerification><Payments/></StudentVerification>} ></Route>



    </Routes>
  )
}

export default StudentRoutes

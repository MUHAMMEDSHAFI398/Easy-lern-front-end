import React from 'react'
import Sidebar from '../../Components/Office/Sidebar/Sidebar'
import TeacherLeaveApplication from '../../Components/Office/TeacherLeaveApplicaton/TeacherLeaveApplication'

function TeacherLeaveApplications() {
  return (
    <div className='d-flex'>
     <Sidebar/>
     <TeacherLeaveApplication/>
    </div>
  )
}

export default TeacherLeaveApplications

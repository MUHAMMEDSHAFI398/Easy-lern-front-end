import React from 'react'
import Sidebar from '../../Components/Office/Sidebar/Sidebar'
import ViewTeachers from '../../Components/Office/ViewTeacher/ViewTeachers'
function viewTeachers() {
  return (
    <div className='d-flex'>
      <Sidebar/>
      <ViewTeachers/>
     </div>
  )
}

export default viewTeachers

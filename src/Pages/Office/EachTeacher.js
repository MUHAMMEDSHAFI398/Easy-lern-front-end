import React from 'react'
import EachTeachers from '../../Components/Office/EachTeacher/EachTeachers'
import Sidebar from '../../Components/Office/Sidebar/Sidebar'

function EachTeacher() {
  return (
    <div className='d-flex'>
      <Sidebar/>
      <EachTeachers/>
    </div>
  )
}

export default EachTeacher

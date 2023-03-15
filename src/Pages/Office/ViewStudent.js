import React from 'react'
import Sidebar from '../../Components/Office/Sidebar/Sidebar'
import ViewStudents from '../../Components/Office/ViewStudents/ViewStudents'

function ViewStudent() {
  return (
    <div className='d-flex' >
        <Sidebar/>
      <ViewStudents/>
    </div>
  )
}

export default ViewStudent

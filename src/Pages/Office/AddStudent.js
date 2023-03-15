import React from 'react'
import AddStudents from '../../Components/Office/AddStudent/AddStudents'
import Sidebar from '../../Components/Office/Sidebar/Sidebar'

function AddStudent() {
  return (
    <div className='d-flex'>
        <Sidebar/>
      <AddStudents/>
    </div>
  )
}

export default AddStudent

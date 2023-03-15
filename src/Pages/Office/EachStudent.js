import React from 'react'
import EachStudents from '../../Components/Office/EachStudent/EachStudents'
import Sidebar from '../../Components/Office/Sidebar/Sidebar'

function EachStudent() {
  return (
    <div className='d-flex'>
        <Sidebar/>
      <EachStudents/>
    </div>
  )
}

export default EachStudent

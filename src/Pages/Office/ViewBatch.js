import React from 'react'
import Sidebar from '../../Components/Office/Sidebar/Sidebar'
import ViewBatches from '../../Components/Office/ViewBatch/ViewBatches'

function ViewBatch() {
  return (
    <div className='d-flex'>
      <Sidebar/>
      <ViewBatches/>
    </div>
  )
}

export default ViewBatch

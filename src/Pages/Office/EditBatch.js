import React from 'react'
import Sidebar from '../../Components/Office/Sidebar/Sidebar'
import EditBatches from '../../Components/Office/EditBatch/EditBatches'

function EditBatch() {
  return (
    <div className='d-flex' >
      <Sidebar/>
      <EditBatches/>
    </div>
  )
}

export default EditBatch

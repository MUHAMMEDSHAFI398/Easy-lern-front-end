import React from 'react'
import AddBatches from '../../Components/Office/AddBatch/AddBatches'
import Sidebar from '../../Components/Office/Sidebar/Sidebar'

function AddBatach() {
  return (
    <div className='d-flex'>
      <Sidebar/>
      <AddBatches/>
    </div>
  )
}

export default AddBatach

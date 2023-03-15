import React from 'react'
import EachBatches from '../../Components/Office/EachBatch/EachBatches'
import Sidebar from '../../Components/Office/Sidebar/Sidebar'

function EachBatch() {
  return (
    <div className='d-flex'>
      <Sidebar/>
      <EachBatches/>
    </div>
  )
}

export default EachBatch

import React from 'react'
import Payment from '../../Components/Office/Payments/Payment'
import Sidebar from '../../Components/Office/Sidebar/Sidebar'

function Payments() {
  return (
    <div className='d-flex'>
      <Sidebar/>
      <Payment/>
    </div>
  )
}

export default Payments

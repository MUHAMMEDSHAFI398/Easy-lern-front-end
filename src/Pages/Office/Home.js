import React from 'react'
import OfficeHome from '../../Components/Office/OfficeHome/OfficeHome';
import Sidebar from '../../Components/Office/Sidebar/Sidebar';


function Home() {
  return (
    <div className='d-flex'>
      <Sidebar/>
      <OfficeHome/>
    </div>
  )
}

export default Home

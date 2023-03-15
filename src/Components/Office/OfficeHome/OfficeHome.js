import React, { useEffect } from 'react'
import { useState } from 'react'
import { getDashbordDataAPI } from '../../../Services/OfficeServices'
import './OfficeHome.css'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

function OfficeHome() {

  const [DashboardData ,setDashbordData]=useState({
    studentsCount:"", 
    batchCount: "" ,
    teacherCount: "",
    feeCompletionRate:"",
    batchData:[],
    teacherData:[]
  })
  
  useEffect(()=>{
    const headers = {
      headers: {
          Authorization: localStorage.getItem("officeToken")
      }
  }
    getDashbordDataAPI(headers).then((response)=>{
      setDashbordData(response.data)
    })
  },[])
  const data = [
   
    { Batch: 'Batch 1', Seats: 30, Students: 25 },
    { Batch: 'Batch 2', Seats: 40, Students: 35 },
    { Batch: 'Batch 3', Seats: 20, Students: 15 },
    { Batch: 'Batch 4', Seats: 50, Students: 45 },
    { Batch: 'Batch 5', Seats: 30, Students: 28 },
    
    // add more data as needed
  ];
 
  return (
    <div className='container'>
      <div className='container d-flex flex-wrap justify-content-between align-items-center mt-5'>

        <div className='headChilds'>

          <div className='d-flex flex-column'>
            <div className='d-flex justify-content-center mt-1'>
              <h4>Number of batches</h4>
            </div>
            <div>
              <div className='d-flex justify-content-center'>
                <h3>{DashboardData.batchCount}</h3>
              </div>
            </div>
          </div>

        </div>
        <div className='headChilds'>

          <div className='d-flex flex-column'>
            <div className='d-flex justify-content-center mt-1'>
              <h4>Number of Students</h4>
            </div>
            <div>
              <div className='d-flex justify-content-center'>
                <h3>{DashboardData.studentsCount}</h3>
              </div>
            </div>
          </div>

        </div>
        <div className='headChilds'>

          <div className='d-flex flex-column'>
            <div className='d-flex justify-content-center mt-1'>
              <h4>Number of teachers</h4>
            </div>
            <div>
              <div className='d-flex justify-content-center'>
                <h3>{DashboardData.teacherCount}</h3>
              </div>
            </div>
          </div>

        </div>
        <div className='headChilds'>

          <div className='d-flex flex-column'>
            <div className='d-flex justify-content-center mt-1'>
              <h4>Fee complition rate</h4>
            </div>
            <div>
              <div className='d-flex justify-content-center'>
                <h3>{DashboardData.feeCompletionRate} %</h3>
              </div>
            </div>
          </div>

        </div>
      </div>


<div className=' d-flex flex-wrap justify-content-between mt-5'>

  <div className='chartDiv'>

  <BarChart width={600} height={400} data={DashboardData.batchData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="batch" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="seats" fill="#8884d8" />
      <Bar dataKey="students" fill="#82ca9d" />
    </BarChart>

  </div>

  <div className='container flexChildDashbord'>
    <div className='QuickActionTitle d-flex justify-content-center mt-4'>
        <h3><strong>QUICK ACTIONS</strong></h3>
    </div>
     <div className='d-flex flex-column mt-2 mb-2'>
       <button className='quickBtns mt-3 mb-3'><strong>HOST NEW BATCH</strong></button>
       <button className='quickBtns mt-3 mb-3'><strong>ADD TEACHER</strong></button>
       <button className='quickBtns mt-3 mb-3'><strong>ADD STUDENT</strong></button>
     </div>
  </div>



</div>


    
    </div>
  )
}

export default OfficeHome

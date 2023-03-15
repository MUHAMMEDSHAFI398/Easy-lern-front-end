import React, { useEffect } from 'react'
import { useState } from 'react'
import { getDashbordDataAPI } from '../../../Services/OfficeServices'
import './OfficeHome.css'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { useNavigate } from 'react-router-dom';

function OfficeHome() {

  const navigate = useNavigate()
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


 const handleClick = (action)=>{
  if(action === "HOST NEW BATCH"){
    navigate('/office/add-batch')
  }else if(action === 'ADD TEACHER'){
    navigate('/office/add-teacher')
  }else if(action === 'ADD STUDENT'){
    navigate('/office/add-student')
  }
 }
 
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
                <h3>{DashboardData?.batchCount}</h3>
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
                <h3>{DashboardData?.studentsCount}</h3>
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
                <h3>{DashboardData?.teacherCount}</h3>
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
                <h3>{DashboardData?.feeCompletionRate} %</h3>
              </div>
            </div>
          </div>

        </div>
      </div>


<div className=' d-flex flex-wrap justify-content-between mt-5'>

  <div className='chartDiv'>

  <BarChart width={600} height={400} data={DashboardData?.batchData}>
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
       <button onClick={() => handleClick("HOST NEW BATCH")} className='quickBtns mt-3 mb-3'><strong>HOST NEW BATCH</strong></button>
       <button onClick={() => handleClick("ADD TEACHER")}  className='quickBtns mt-3 mb-3'><strong>ADD TEACHER</strong></button>
       <button onClick={() => handleClick("ADD STUDENT")} className='quickBtns mt-3 mb-3'><strong>ADD STUDENT</strong></button>
     </div>
  </div>



</div>


    
    </div>
  )
}

export default OfficeHome

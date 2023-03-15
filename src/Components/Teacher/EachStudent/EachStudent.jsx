import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom"
import {  getStudentPerformanceAPI } from '../../../Services/TeacherServices';
import './EachStudent.css'

function EachStudent() {
    const location = useLocation();
    const birthDate = new Date(location.state.studentData.dateOfBirth);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const readableDate = birthDate.toLocaleDateString('en-US', options);
    const navigate = useNavigate()

    const [Performance,setPerormance]=useState({performance: "", avgAttendance: "", feeCompletionRate: ""})

    useEffect(() => {
        const studentId = location.state.studentData.registerId

        const headers = {
            headers: {
                Authorization: localStorage.getItem('teacherToken')
            }
        }
        getStudentPerformanceAPI(studentId, headers).then((response) => {
            if(response.status === 200){
                setPerormance(response.data)
            }
        })
    },[])

    const handleClick = () => {
        navigate('/teacher/student-data', {
            state: {
                studentId: location.state.studentData.registerId,
            }
        })
    }
    return (
        <div className='container'>

            <div className="container">
                <div className="d-flex flex-wrap justify-content-between">

                    <div className='childs'>
                        <div className="d-flex flex-column align-items-center">
                            <h5>Attenddance</h5>
                            <h4>{Performance.avgAttendance} %</h4>
                        </div>
                    </div>
                    <div className='childs'>
                        <div className="d-flex flex-column align-items-center">
                            <h5>Performance</h5>
                            <h4>{Performance.performance} %</h4>
                        </div>
                    </div>
                    <div className='childs'>
                        <div className="d-flex flex-column align-items-center">
                            <h5>Fee completion</h5>
                            <h4>
                                {Performance.feeCompletionRate ===100 ? "Completed" : Performance.feeCompletionRate+"%"}
                                </h4>
                        </div>
                    </div>
                    <div className='childs'>
                        <div className="d-flex flex-column align-items-center">
                            <h5>Student history</h5>
                            <h5 className='mt-1' style={{ cursor: "pointer" }} onClick={handleClick}><i class="fas fa-external-link-alt"></i></h5>
                        </div>
                    </div>

                </div>

                <div className='batch-deatails-parent-div'>

                    <div className='d-flex justify-content-center'>
                        <h5 className='headding'>Details of the Student</h5>
                    </div>
                    <div className='d-flex justify-content-center'>
                        <img className='imageDiv' src={location.state.studentData.image[0].url} alt=" is not loaded" />
                    </div>

                    <div className='d-flex flex-wrap '>

                        <div className='batch-deatails-childs d-flex flex-column align-items-center'>
                            <p><strong>Register id</strong></p>
                            <p>{location.state.studentData.registerId}</p>
                        </div>
                        <div className='batch-deatails-childs d-flex flex-column align-items-center'>
                            <p><strong>Name</strong></p>
                            <p>{location.state.studentData.name}</p>
                        </div>
                        <div className='batch-deatails-childs d-flex flex-column align-items-center'>
                            <p><strong>Batch</strong></p>
                            <p>{location.state.studentData.batch}</p>
                        </div>
                        <div className='batch-deatails-childs d-flex flex-column align-items-center'>
                            <p><strong>Email</strong></p>
                            <p>{location.state.studentData.email}</p>
                        </div>

                        <div className='batch-deatails-childs d-flex flex-column align-items-center'>
                            <p><strong>Phone</strong></p>
                            <p>{location.state.studentData.phone}</p>
                        </div>
                        <div className='batch-deatails-childs d-flex flex-column align-items-center'>
                            <p><strong>Date of birth</strong></p>
                            <p>{readableDate}</p>
                        </div>
                        <div className='batch-deatails-childs d-flex flex-column align-items-center'>
                            <p><strong>Gender</strong></p>
                            <p>{location.state.studentData.gender}</p>
                        </div>
                        <div className='batch-deatails-childs d-flex flex-column align-items-center'>
                            <p><strong>Parent</strong></p>
                            <p>{location.state.studentData.parentName}</p>
                        </div>
                        <div className='batch-deatails-childs d-flex flex-column align-items-center'>
                            <p><strong>Parent phone</strong></p>
                            <p>{location.state.studentData.parentPhone}</p>
                        </div>
                        <div className='batch-deatails-childs d-flex flex-column align-items-center'>
                            <p><strong>Education</strong></p>
                            <p>{location.state.studentData.education}</p>
                        </div>
                        <div className='batch-deatails-childs d-flex flex-column align-items-center'>
                            <p><strong>Last studied institute</strong></p>
                            <p>{location.state.studentData.institute}</p>
                        </div>
                        <div className='batch-deatails-childs d-flex flex-column align-items-center'>
                            <p><strong>Address</strong></p>
                            <p>
                                {location.state.studentData.address.house_name},
                                {location.state.studentData.address.place},<br />
                                {location.state.studentData.address.post},<br />
                                {location.state.studentData.address.pin},
                                {location.state.studentData.address.district}
                            </p>
                        </div>


                    </div>




                </div>

            </div>
        </div>
    )
}

export default EachStudent

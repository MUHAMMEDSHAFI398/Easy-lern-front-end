import React, { useState } from 'react';
import { useLocation } from "react-router-dom"
import './EachStudent.css'
import Swal from 'sweetalert2'
import { message } from 'antd'
import { blockStudentAPI, unBlockStudentAPI } from '../../../Services/OfficeServices';
function EachStudents() {

    const location = useLocation();
    const birthDate = new Date(location.state.studentData.dateOfBirth);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const readableDate = birthDate.toLocaleDateString('en-US', options);
    const [studentBlock, setStudentBlock] = useState(location.state.studentData.isBlocked)

    const handleBlock = () => {
        Swal.fire({

            text: "Are you sure you want to block this student?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'green',
            cancelButtonColor: 'red',
            confirmButtonText: 'Yes'

        }).then((result) => {
            if (result.isConfirmed) {
                const id = location.state.studentData._id
                const headers = {
                    headers: {
                        Authorization: localStorage.getItem("officeToken")
                    }
                }
                blockStudentAPI(id,headers).then(() => {
                    setStudentBlock(true);
                    message.success("The student has been blocked")
                })
            }
        })
    }

    const handleUnBlock = () => {
        Swal.fire({

            text: "Are you sure you want to Unblock this student?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'green',
            cancelButtonColor: 'red',
            confirmButtonText: 'Yes'

        }).then((result) => {
            if (result.isConfirmed) {
                const id = location.state.studentData._id
                const headers = {
                    headers: {
                        Authorization: localStorage.getItem("officeToken")
                    }
                }
                unBlockStudentAPI(id,headers).then(() => {
                    setStudentBlock(false);
                    message.success("The student has been Unblocked")
                })
            }
        })
    }

    return (
        <div className='container'>
            {studentBlock === false ?
                <button onClick={handleBlock} className='std-block-btn'>Block</button> :
                <button onClick={handleUnBlock} className='std-Unblock-btn'>Unblock</button>
            }

            <div className="container">
                <div className="d-flex flex-wrap justify-content-between">

                    <div className='childrens'>
                        <div className="d-flex flex-column align-items-center">
                            <h5>Attenddance</h5>
                            <h4>25%</h4>
                        </div>
                    </div>
                    <div className='childrens'>
                        <div className="d-flex flex-column align-items-center">
                            <h5>Performance</h5>
                            <h4>25%</h4>
                        </div>
                    </div>
                    <div className='childrens'>
                        <div className="d-flex flex-column align-items-center">
                            <h5>Current rank in the class</h5>
                            <h4>25%</h4>
                        </div>
                    </div>
                    <div className='childrens'>
                        <div className="d-flex flex-column align-items-center">
                            <h5>Fee completion</h5>
                            <h4>25%</h4>
                        </div>
                    </div>

                </div>

                <div className='batch-deatails-parent-div'>

                    <div className='d-flex justify-content-center'>
                        <h5 className='heading'>Details of the Student</h5>
                    </div>
                    <div className='d-flex justify-content-center'>
                        <img className='img-div' src={location.state.studentData.image[0].url} alt="could not load" />
                    </div>

                    <div className='d-flex flex-wrap '>

                        <div className='batch-deatails-child d-flex flex-column align-items-center'>
                            <p><strong>Register id</strong></p>
                            <p>{location.state.studentData.registerId}</p>
                        </div>
                        <div className='batch-deatails-child d-flex flex-column align-items-center'>
                            <p><strong>Name</strong></p>
                            <p>{location.state.studentData.name}</p>
                        </div>
                        <div className='batch-deatails-child d-flex flex-column align-items-center'>
                            <p><strong>Batch</strong></p>
                            <p>{location.state.studentData.batch}</p>
                        </div>
                        <div className='batch-deatails-child d-flex flex-column align-items-center'>
                            <p><strong>Email</strong></p>
                            <p>{location.state.studentData.email}</p>
                        </div>

                        <div className='batch-deatails-child d-flex flex-column align-items-center'>
                            <p><strong>Phone</strong></p>
                            <p>{location.state.studentData.phone}</p>
                        </div>
                        <div className='batch-deatails-child d-flex flex-column align-items-center'>
                            <p><strong>Date of birth</strong></p>
                            <p>{readableDate}</p>
                        </div>
                        <div className='batch-deatails-child d-flex flex-column align-items-center'>
                            <p><strong>Gender</strong></p>
                            <p>{location.state.studentData.gender}</p>
                        </div>
                        <div className='batch-deatails-child d-flex flex-column align-items-center'>
                            <p><strong>Parent</strong></p>
                            <p>{location.state.studentData.parentName}</p>
                        </div>
                        <div className='batch-deatails-child d-flex flex-column align-items-center'>
                            <p><strong>Parent phone</strong></p>
                            <p>{location.state.studentData.parentPhone}</p>
                        </div>
                        <div className='batch-deatails-child d-flex flex-column align-items-center'>
                            <p><strong>Education</strong></p>
                            <p>{location.state.studentData.education}</p>
                        </div>
                        <div className='batch-deatails-child d-flex flex-column align-items-center'>
                            <p><strong>Last studied institute</strong></p>
                            <p>{location.state.studentData.institute}</p>
                        </div>
                        <div className='batch-deatails-child d-flex flex-column align-items-center'>
                            <p><strong>Address</strong></p>
                            <p>
                                {location.state.studentData.address.house_name},<br />
                                {location.state.studentData.address.place},
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

export default EachStudents

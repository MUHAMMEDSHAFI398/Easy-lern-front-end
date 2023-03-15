import React, { useEffect, useState } from 'react'
import { getMarkDetailsAPI, attenDanceDetailsAPI } from '../../../Services/TeacherServices'
import { useLocation } from 'react-router-dom'

import './StudentData.css'


function StudentData() {


    const location = useLocation();
    const [markDetails, setMarkDetails] = useState([])
    const [monthData, setMonthData] = useState([])
    const [tabs, setTabs] = useState({ markTab: true, attendanceTab: false })


    useEffect(() => {
        const headers = {
            headers: {
                Authorization: localStorage.getItem('teacherToken')
            }
        }
        const studentId = location.state.studentId
        getMarkDetailsAPI(studentId, headers).then((response) => {
            if (response.status === 200) {
                setMarkDetails(response.data.markdetails)
            } else {
                console.log('hi')
            }

        })
    }, [])

    useEffect(() => {
        const headers = {
            headers: {
                Authorization: localStorage.getItem('teacherToken')
            }
        }
        const studentId = location.state.studentId
        attenDanceDetailsAPI(studentId, headers).then((response) => {
            if (response.data.status) {
                setMonthData(response.data.attendanceData)
            }
        })
    }, [])
    const hadnleaAttendanceButtonClick = (e) => {
        e.preventDefault()
        setTabs({ markTab: false, attendanceTab: true })
    }
    const hadnleMarkButtonClick = (e) => {
        e.preventDefault()
        setTabs({ markTab: true, attendanceTab: false })
    }

    return (
        <div className='container'>
            <div className='studentDataParent'>

                <div className='d-flex mb-3'>
                    <div onClick={hadnleMarkButtonClick}
                        className={tabs.markTab ? "tabsSelctbtnHilites" : "tabsSelctbtnNonHilites"}>
                        <p className='mt-3'>Mark details</p>
                    </div>
                    <div onClick={hadnleaAttendanceButtonClick}
                        className={tabs.attendanceTab ? "tabsSelctbtnHilites ms-3" : "tabsSelctbtnNonHilites ms-3"}>
                        <p className='mt-3'>Attendance details</p>
                    </div>
                </div>


                {tabs.markTab ?
                    <div className='studentDataParentDiv'>
                        <div className='d-flex justify-content-center align-items-center'>
                            <h5 className='titlestyling mt-3 mb-4'>Mark details</h5>
                        </div>

                        <div className='container d-flex justify-content-center flex-wrap align-items-center flexParent' style={{ height: "420px", overflowY: "auto", padding: "20px" }} >

                            {
                                markDetails?.map((obj) => {
                                    const dateStr = obj.month;
                                    const date = new Date(dateStr);
                                    const formattedDate = date.toLocaleString('en-US', { month: 'long', year: 'numeric' });
                                    return (
                                        <div key={obj._id} className='flexchild ms-1 me-1'>
                                            <div className="container mt-2 table-responsive">
                                                <table className="table table-striped table-bordered">
                                                    <caption>{formattedDate}</caption>
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">Subjectcs</th>
                                                            <th scope="col">Mark</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            obj.subjectMarks.map((object) => {
                                                                return (
                                                                    <tr key={obj._id}>
                                                                        <td>{object.subject}</td>
                                                                        <td>{object.mark}</td>
                                                                    </tr>
                                                                )
                                                            })
                                                        }
                                                    </tbody>
                                                </table>
                                                <div className='d-flex justify-content-center'>
                                                    <p style={{ color: "black", fontWeight: "bold" }}>Percentage : {obj.percentage} %</p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>

                    :
                    <div className='studentDataParentDiv'>
                        <div className='d-flex justify-content-center align-items-center'>
                            <h5 className='titlestyling mt-3 mb-4'>Monthly attendance details</h5>
                        </div>
                        <div className='container d-flex justify-content-center flex-wrap align-items-center flexParent' style={{ height: "420px", overflowY: "auto", padding: "20px" }} >
                            {
                                monthData?.map((obj) => {
                                    const dateStr = obj.month;
                                    const date = new Date(dateStr);
                                    const formattedDate = date.toLocaleString('en-US', { month: 'long', year: 'numeric' });
                                    return (
                                        <div className='flexchild ms-1 me-1'>
                                            <div className="container mt-2 table-responsive">
                                                <table className="table table-striped table-bordered">
                                                    <caption>{formattedDate}</caption>
                                                    <tbody>
                                                        <tr >
                                                            <td>Working days</td>
                                                            <td>{obj.workingDays}</td>
                                                        </tr>
                                                        <tr >
                                                            <td>Present days</td>
                                                            <td>{obj.noOfDaysPresent}</td>
                                                        </tr>
                                                        <tr >
                                                            <td>Percentage</td>
                                                            <td>{obj.percent} %</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    )
                                })
                            }

                        </div>
                    </div>

                }
            </div>
        </div>
    )
}

export default StudentData

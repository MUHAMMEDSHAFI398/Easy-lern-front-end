import React, { useEffect, useState } from 'react'
import { getMarkDetailsAPI, attenDanceDetailsAPI } from '../../../Services/StudentServices'

import './StudentHistory.css'


function StudentHistory() {


    const [markDetails, setMarkDetails] = useState([])
    const [monthData, setMonthData] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [tabs, setTabs] = useState({ markTab: true, attendanceTab: false })

    useEffect(() => {
        const headers = {
            headers: {
                Authorization: localStorage.getItem('studentToken')
            }
        }
        getMarkDetailsAPI(headers).then((response) => {
            if (response.status === 200) {
                setMarkDetails(response.data.markdetails)
                setIsLoading(false);
            } else {
                console.log('hi')
            }
        })
    }, [])

    useEffect(() => {
        const headers = {
            headers: {
                Authorization: localStorage.getItem('studentToken')
            }
        }
        attenDanceDetailsAPI(headers).then((response) => {
            if (response.data.status) {
                setMonthData(response.data.attendanceData)
                setIsLoading(false);
            }
        })
    }, [])

    if (isLoading) {
        return <div>Loading...</div>;
    }

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
            <div className='studentdataParent'>

                <div className='d-flex mb-3'>
                    <div onClick={hadnleMarkButtonClick}
                        className={tabs.markTab ? "tabsSelctbtnHilite" : "tabsSelctbtnNonHilite"}>
                        <p className='mt-3'>Mark details</p>
                    </div>
                    <div onClick={hadnleaAttendanceButtonClick}
                        className={tabs.attendanceTab ? "tabsSelctbtnHilite ms-3" : "tabsSelctbtnNonHilite ms-3"}>
                        <p className='mt-3'>Attendance details</p>
                    </div>
                </div>

                {tabs.markTab ?
                    <div className='studentdataParentDiv'>
                        <div className='d-flex justify-content-center align-items-center'>
                            <h5 className='titlestylings mt-3 mb-4'>Mark details</h5>
                        </div>
                        {markDetails.length ?
                            <div className='container d-flex justify-content-center flex-wrap align-items-center flexparent' style={{ height: "420px", overflowY: "auto", padding: "20px" }}>

                                {markDetails?.map((obj) => {
                                    const dateStr = obj.month
                                    const date = new Date(dateStr)
                                    const formattedDate = date.toLocaleString('en-US', { month: 'long', year: 'numeric' })
                                    return (
                                        <div key={obj._id} className='flexchilds ms-1 me-1'>
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
                                                        {obj.subjectMarks.map((object) => {
                                                            return (
                                                                <tr key={obj._id}>
                                                                    <td>{object.subject}</td>
                                                                    <td>{object.mark}</td>
                                                                </tr>
                                                            )
                                                        })}
                                                    </tbody>
                                                </table>

                                                <div className='d-flex justify-content-center'>
                                                    <p style={{ color: "black", fontWeight: "bold" }}>Percentage : {obj.percentage} %</p>
                                                </div>

                                            </div>
                                        </div>
                                    )
                                })}
                            </div> :
                            <div className='d-flex justify-content-center align-items-center'>
                                <h1 className='mt-3 mb-4' style={{ color: "red" }}>Mark details not added yet</h1>
                            </div>

                        }
                    </div>


                    :

                    <div className='studentdataParentDiv'>
                        <div className='d-flex justify-content-center align-items-center'>
                            <h5 className='titlestylings mt-3 mb-4'>Monthly attendance details</h5>
                        </div>
                        {monthData.length ?
                            <div className='container d-flex justify-content-center flex-wrap align-items-center flexparent' style={{ height: "350px", overflowY: "auto", padding: "20px" }} >
                                {
                                    monthData?.map((obj) => {
                                        const dateStr = obj.month;
                                        const date = new Date(dateStr);
                                        const formattedDate = date.toLocaleString('en-US', { month: 'long', year: 'numeric' });
                                        return (
                                            <div className='flexchilds ms-1 me-1'>
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
                                                                <td><strong>Percentage</strong></td>
                                                                <td><strong>{obj.percent} % </strong></td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        )
                                    })
                                }

                            </div>
                            :
                            <div className='d-flex justify-content-center align-items-center'>
                                <h1 className='mt-3 mb-4' style={{ color: "red" }}>Attendace details not added yet</h1>
                            </div>
                        }
                    </div>

                }


            </div>
        </div>

    )
}

export default StudentHistory

import React, { useState, useEffect } from 'react'
import { CDBCardBody, CDBDataTable, CDBContainer } from 'cdbreact';
import './LeaveApplication.css'
import validate from './Validation';
import { message } from 'antd'
import Swal from 'sweetalert2'
import { leaveHistoryAPI, postLetterAPI } from '../../../Services/StudentServices';

function LeaveApplications() {
    const [letter, setLetter] = useState({ leaveLetter: "", from: "", to: "" })
    const [error, setErrors] = useState({});
    const [leaveHistory, setLeaveHistory] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalvalues, setModalValues] = useState({ appliedDate: "", status: "", letter: "", fromDate: "", toDate: "" })
    const [singleDate, setSingleDate] = useState(false)
    const [isReason, setIsReason] = useState(false)
    useEffect(() => {
        const headers = {
            headers: {
                Authorization: localStorage.getItem('studentToken')
            }
        }
        leaveHistoryAPI(headers).then((response) => {
            if (response.data.status) {
                setLeaveHistory(response.data.leaveHistory)
            }
        })
    }, [])
   


    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setLetter({ ...letter, [name]: value });
        setErrors({ ...error, [name]: "", date: "" });
        console.log(letter)
    };
    const handleSingleDateChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setLetter({ ...letter, [name]: value, to: value });
        setErrors({ ...error, [name]: "" });
    };

    const handleSubmit = (e) => {

        e.preventDefault();

        const errors = validate(letter);

        if (Object.keys(errors).length !== 0) {
            setErrors(errors);

        } else {
            Swal.fire({

                text: "Are you sure you want submit leave application?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: 'green',
                cancelButtonColor: 'red',
                confirmButtonText: 'Yes'

            }).then((result) => {

                if (result.isConfirmed) {
                    const headers = {
                        headers: {
                            Authorization: localStorage.getItem('studentToken')
                        }
                    }

                    postLetterAPI(letter, headers).then((response) => {
                        if (response.data.status) {
                            message.success('Successfully sent leave application')
                            setLetter({ leaveLetter: "", from: "", to: "" })
                            leaveHistoryAPI(headers).then((response) => {
                                if (response.data.status) {
                                    setLeaveHistory(response.data.leaveHistory)
                                    console.log(response.data.leaveHistory)

                                }
                            })
                        }

                    })
                }
            })

        }
    }

    const handleModalClick = (appliedDate, fromDate, toDate, status, letter, reason) => {
        if (fromDate === toDate) {
            setSingleDate(true)
        }
        setIsModalOpen(true)
        if (reason !== "") {
            setIsReason(true)
        }
        setModalValues({ 
            appliedDate: appliedDate, 
            status: status, 
            letter: letter, 
            fromDate: fromDate, 
            toDate: toDate, 
            reason: reason 
        })
    }
    const handleModalClose = () => {
        setIsModalOpen(false)
        setSingleDate(false)
        setIsReason(false)
    }


    const data = () => {
        return {
            columns: [
                {
                    label: 'SL NO',
                    field: 'slno',
                    width: 50,
                },
                {
                    label: 'Applied date',
                    field: 'appliedDate',
                    width: 100,
                    attributes: {
                        'aria-controls': 'DataTable',
                        'aria-label': 'Name',
                    },
                },
                {
                    label: 'Status',
                    field: 'status',
                    width: 90,
                },
                {
                    label: 'View',
                    field: 'view',
                    width: 80,
                },
            ],

            rows: leaveHistory?.map((leave, index) => {

                const dateString = leave.myLeaves.appliedDate
                const date = new Date(dateString);
                const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
                const formattedDate = date.toLocaleDateString('en-US', dateOptions);

                const stringDate = leave.myLeaves.from
                const fromdate = new Date(stringDate);
                const fromdateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
                const formattedFromDate = fromdate.toLocaleDateString('en-US', fromdateOptions);

                const dateStrings = leave.myLeaves.to
                const todate = new Date(dateStrings);
                const todateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
                const formattedToDate = todate.toLocaleDateString('en-US', todateOptions);

                return {
                    slno: index + 1,
                    appliedDate: formattedDate,
                    status: leave.myLeaves.status,
                    view:
                        (
                            <div>
                                <i onClick={() => handleModalClick(
                                    formattedDate,
                                    formattedFromDate,
                                    formattedToDate,
                                    leave.myLeaves.status,
                                    leave.myLeaves.letter,
                                    leave.myLeaves.reason,
                                )}
                                    className="i-tags ms-4 fa fa-chevron-circle-right">

                                </i>
                                {isModalOpen && (
                                    <div className="modal">

                                        <div className="modal-content">

                                            <div className='d-flex justify-content-center'>
                                                <h5><strong>Leave application details</strong></h5>
                                            </div>

                                            <div className='d-flex mt-3'>
                                                <strong>Applied date :</strong>
                                                <p className='ms-3'>{modalvalues.appliedDate}</p>
                                            </div>

                                            <div className='d-flex mt-3'>
                                                {singleDate ?
                                                    <>
                                                        <strong>Leave date :</strong>
                                                        <p className='ms-3'>{modalvalues.fromDate}</p>
                                                    </>
                                                    :
                                                    <>
                                                        <strong>Leave period :</strong>
                                                        <p className='ms-3'>{modalvalues.fromDate} to {modalvalues.toDate}</p>
                                                    </>
                                                }
                                            </div>

                                            <div className='d-flex mt-1'>
                                                <strong>Status :</strong>
                                                <p className='ms-3'>{modalvalues.status}</p>
                                            </div>
                                            {isReason && (
                                                <div className='d-flex mt-1'>
                                                    <strong>Rejecton reason :</strong>
                                                    <p className='ms-3'>{modalvalues.reason}</p>
                                                </div>
                                            )
                                            }
                                            <div className='d-flex justify-content-center mt-3'>
                                                <strong>Your letter</strong>
                                            </div>

                                            <p className='mt-1'>{modalvalues.letter}</p>
                                            <button className='btn btn-success mt-4' onClick={handleModalClose}>Close</button>

                                        </div>

                                    </div>
                                )}
                            </div>
                        )
                }

            })


        };
    };

    return (
        <div className='container'>

            <div className='d-flex flex-wrap justify-content-between align-items-center mainDiv'>

                <div className='flexItm'>

                    <div className='d-flex justify-content-center align-items-center mt-3'>
                        <p className='leave-leter'>Apply for leave</p>
                    </div>
                    <form className='container' onSubmit={handleSubmit}>
                       
                                    <div className='d-flex flex-wrap justify-content-center align-items-center mt-4'>
                                        <div className='d-flex flex-column '>
                                            <label className='me-2 ms-2' htmlFor="from">From</label>
                                            <input
                                                onChange={handleChange}
                                                value={letter.from}
                                                className='fromToInput me-2 ms-2 mb-2 '
                                                name='from'
                                                type="date"
                                                min={new Date().toISOString().split("T")[0]}
                                            />

                                        </div>
                                        <div className='d-flex flex-column'>
                                            <label className='ms-2 me-2' htmlFor="to">To</label>
                                            <input
                                                onChange={handleChange}
                                                value={letter.to}
                                                className='fromToInput ms-2 me-2 mb-2'
                                                name='to'
                                                type="date"
                                                min={new Date().toISOString().split("T")[0]}
                                            />

                                        </div>
                                    </div>
                                    <div className='d-flex flex-wrap justify-content-center align-items-center mt-1'>
                                        <div className='errorChild  me-2'>
                                            {error.from && (<p className="ms-1 text-danger">{error.from}</p>)}

                                        </div>
                                        <div className='errorChild ms-2 me-2'>
                                            {error.to && (<p className="ms-2 text-danger">{error.to}</p>)}
                                        </div>
                                    </div>
                                    <div>
                                        {error.date && (<p className="ms-2 text-danger">{error.date}</p>)}

                                    </div>
                            
                        <div className='d-flex justify-content-center align-items-center mt-3'>
                            <textarea
                                onChange={handleChange}
                                value={letter.leaveLetter}
                                placeholder='Type your letter here'
                                className='inputLeavediv' type="text"
                                name="leaveLetter"
                                id="leaveLetter"
                            />
                        </div>
                        {error.leaveLetter && (<p className="ms-2 text-danger">{error.leaveLetter}</p>)}

                        <div className='d-flex justify-content-center align-items-center mt-3'>
                            <button type='submit' className='submitbutn mt-3 btn btn-success'>Submit</button>
                        </div>
                    </form>
                </div>

                <div>
                    <div className='flexItm'>

                        <div className='d-flex justify-content-center align-items-center mt-3'>
                            <p className='leave-leter'>Leave history</p>
                        </div>

                        <div className='d-flex justify-content-center align-items-center mt-3'>
                            <CDBContainer>
                                <div className='container'>
                                    <CDBCardBody>
                                        <CDBDataTable
                                            striped
                                            bordered
                                            hover
                                            scrollX
                                            data={data()}
                                            materialSearch
                                            entriesOptions={[3, 4, 5, 6]}
                                            entries={5}
                                        />
                                    </CDBCardBody>
                                </div>
                            </CDBContainer>
                        </div>

                    </div>
                </div>

            </div>

        </div>
    )
}

export default LeaveApplications

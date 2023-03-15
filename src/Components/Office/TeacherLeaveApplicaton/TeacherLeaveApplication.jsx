import React, { useEffect, useState } from 'react'
import { CDBCardBody, CDBDataTable, CDBContainer } from 'cdbreact';
import './TeacherLeaveApplication.css'
import { leaveApplcationsAPI, leaveApproveAPI, leaveRejectAPI } from '../../../Services/OfficeServices';
import { message } from 'antd';
import Swal from 'sweetalert2'

function TeacherLeaveApplication() {


    const [leaveData, setLeaveData] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isRejectModalOpen, setIsRejectModalOpen] = useState(false)
    const [modalvalues, setModalValues] = useState({
        appliedDate: "", status: "",
        letter: "", registerId: "", id: "",
        fromDate: "", toDate: "", reason: ""
    })
    const [rejectmodalValues, setRejectModalvalues] = useState({ registerId: "", id: "" })
    const [singleDate, setSingleDate] = useState(false)
    const [formValue, setFormValue] = useState({ reason: "" })
    const [isReason, setIsReason] = useState(false)


    useEffect(() => {
        const headers = {
            headers: {
                Authorization: localStorage.getItem("officeToken")
            }
        }
        leaveApplcationsAPI(headers).then((response) => {
            setLeaveData(response.data.leaveData)
        })
    }, [])

    const handleModalClick = (appliedDate, fromDate, toDate, status, letter, reason, registerId, objectId) => {
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
            reason: reason,
            registerId: registerId,
            id: objectId
        })
    }
    const RejectReasonModalClick = (registerId, id) => {
        setRejectModalvalues({
            registerId: registerId,
            id: id
        })
        setIsModalOpen(false)
        setIsRejectModalOpen(true)

    }

    const handleReasonChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setFormValue({ ...formValue, [name]: value });
    }

    const handleApprove = (id, arrayElementId) => {
        Swal.fire({

            text: "Are you sure you want to approve this application  ? Once approved can not be edited later",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'green',
            cancelButtonColor: 'red',
            confirmButtonText: 'Confirm'

        }).then((result) => {

            if (result.isConfirmed) {
                const data = {
                    id: id,
                    arrayElementId: arrayElementId
                }
                const headers = {
                    headers: {
                        Authorization: localStorage.getItem("officeToken")
                    }
                }
                leaveApproveAPI(data, headers).then((response) => {
                    if (response.data.status) {
                        const data = leaveData.filter((value) => {
                            if (value.myLeaves._id === arrayElementId) {
                                value.myLeaves.status = "Approved"
                            }
                            return value;
                        })
                        setLeaveData(data)
                        message.success('Application has been approved')
                        setIsModalOpen(false)

                    }
                })
            }
        })

    }

    const handleReject = (e, id, arrayElementId) => {
        e.preventDefault()
        Swal.fire({

            text: "Are you sure you want to reject this application ? Once Rejected can not be edited later",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'green',
            cancelButtonColor: 'red',
            confirmButtonText: 'Confirm'

        }).then((result) => {
            if (result.isConfirmed) {
                const data = {
                    id: id,
                    arrayElementId: arrayElementId,
                    reason: formValue.reason
                }

                const headers = {
                    headers: {
                        Authorization: localStorage.getItem("officeToken")
                    }
                }
                leaveRejectAPI(data, headers).then((response) => {

                    if (response.data.status) {
                        const data = leaveData.filter((value) => {
                            if (value.myLeaves._id === arrayElementId) {
                                value.myLeaves.status = "Rejected"
                            }
                            return value;
                        })
                        setLeaveData(data)
                        message.success('Application has been rejected')
                        setIsRejectModalOpen(false)
                        setFormValue({ reason: "" })

                    }

                })
            }
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
                    label: 'Register id',
                    field: 'registerId',
                    width: 90,
                    attributes: {
                        'aria-controls': 'DataTable',
                        'aria-label': 'Name',
                    },
                },
                {
                    label: 'Name',
                    field: 'name',
                    width: 200,
                },
                {
                    label: 'Applied date',
                    field: 'appliedDate',
                    width: 140,
                },
                {
                    label: 'Status',
                    field: 'status',
                    sort: 'asc',
                    width: 90,
                },

                {
                    label: 'View',
                    field: 'view',
                    sort: 'disabled',
                    width: 50,
                },
            ],

            rows: leaveData.map((obj, index) => {
                const appliedDate = new Date(obj.myLeaves.appliedDate);
                const options = { year: 'numeric', month: 'long', day: 'numeric' };
                const readableDate = appliedDate.toLocaleDateString('en-US', options);

                const stringDate = obj.myLeaves.from
                const fromdate = new Date(stringDate);
                const fromdateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
                const formattedFromDate = fromdate.toLocaleDateString('en-US', fromdateOptions);

                const dateStrings = obj.myLeaves.to
                const todate = new Date(dateStrings);
                const todateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
                const formattedToDate = todate.toLocaleDateString('en-US', todateOptions);

                return {
                    slno: index + 1,
                    registerId: obj.registerId,
                    name: obj.name,
                    appliedDate: readableDate,
                    status: obj.myLeaves.status,
                    view: (
                        <><div>
                            <i onClick={() => handleModalClick(
                                readableDate,
                                formattedFromDate,
                                formattedToDate,
                                obj.myLeaves.status,
                                obj.myLeaves.letter,
                                obj.myLeaves.reason,
                                obj.registerId,
                                obj.myLeaves._id,
                            )}
                                className="i-tags ms-4 fa fa-chevron-circle-right">

                            </i>
                            {isModalOpen && (
                                <div className="modals">

                                    <div className="modal-contents">

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
                                                    <strong>Leave date</strong>
                                                    <p className='ms-3'>{modalvalues.fromDate}</p>
                                                </>
                                                :
                                                <>
                                                    <strong>Leave period :</strong>
                                                    <p className='ms-3'>{modalvalues.fromDate} to {modalvalues.toDate}</p>
                                                </>}
                                        </div>

                                        <div className='d-flex mt-1'>
                                            {modalvalues.status === "Pending" ?
                                                <>
                                                    <button onClick={() => handleApprove(modalvalues.registerId, modalvalues.id)} className='btn btn-success aproveRejectbtn'>Approve</button>
                                                    <button onClick={() => RejectReasonModalClick(modalvalues.registerId, modalvalues.id)} className='btn btn-danger ms-3 aproveRejectbtn'>Reject</button>
                                                </>
                                                :
                                                <>
                                                    <strong>Status :</strong>
                                                    <p className='ms-3'>{modalvalues.status}</p>
                                                </>}
                                        </div>

                                        {isReason && (
                                            <div className='d-flex mt-1'>
                                                <strong>Rejecton reason :</strong>
                                                <p className='ms-3'>{modalvalues.reason}</p>
                                            </div>
                                        )
                                        }

                                        <div className='d-flex justify-content-center mt-3'>
                                            <strong>Letter</strong>
                                        </div>

                                        <p className='mt-1'>{modalvalues.letter}</p>
                                        <div className='d-flex justify-content-center mt-3'>
                                            <button className='btn btn-success mt-4 closebtn' onClick={handleModalClose}>Close</button>
                                        </div>

                                    </div>

                                </div>
                            )}
                        </div>
                            {
                                isRejectModalOpen && (
                                    <div className="Modal">
                                        <div className="Modal-Content">
                                            <div className='d-flex justify-content-end'>
                                                <i onClick={() => setIsRejectModalOpen(false)} style={{ cursor: "pointer" }} className="fas fa-times"></i>
                                            </div>
                                            <div className='d-flex justify-content-center'>
                                                <h5><strong>Add rejection reason</strong></h5>
                                            </div>

                                            <textarea
                                                onChange={handleReasonChange}
                                                value={formValue.reason}
                                                className='rejectionReasonInput mt-3'
                                                placeholder='Type here'
                                                name='reason'
                                                type="text"
                                            >
                                            </textarea>

                                            <button
                                                onClick={(e) => handleReject(e, rejectmodalValues.registerId, rejectmodalValues.id)}
                                                type='submit'
                                                className='btn btn-success mt-4 closebtn'
                                            >Reject application
                                            </button>


                                        </div>
                                    </div>
                                )
                            }
                        </>
                    )


                }

            })

        };
    };

    return (
        <div className='container'>

            <div className='container ParentMain'>
                <CDBContainer>
                    <div className='container DivMain'>
                        <div className='d-flex align-items-center justify-content-center'>
                            <h5 className='headingtable'>Leave applications</h5>
                        </div>
                        <CDBCardBody>
                            <CDBDataTable
                                striped
                                bordered
                                hover
                                scrollX
                                data={data()}
                                materialSearch
                                entriesOptions={[5, 10, 15, 20, 25]}

                            />
                        </CDBCardBody>
                    </div>
                </CDBContainer>
            </div>
        </div>
    )
}

export default TeacherLeaveApplication

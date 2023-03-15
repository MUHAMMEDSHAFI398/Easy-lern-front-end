import React, { useState, useEffect } from 'react';
import './EachBatch.css';
import { useNavigate, useLocation } from "react-router-dom"
import { CDBCardBody, CDBDataTable, CDBContainer } from 'cdbreact';
import { message } from 'antd'
import Swal from 'sweetalert2'
import { handleGetStudentAPI, blockStudentAPI, unBlockStudentAPI } from '../../../Services/OfficeServices';

function EachBatches() {

  // const navigate = useNavigate()
  const [students, setStudents] = useState([]);
  const location = useLocation();
  const navigate = useNavigate()
  const startDate = location.state.batch[0].startDate
  const DateStart = new Date(startDate);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const readableStartDate = DateStart.toLocaleDateString('en-US', options);
  const batchId = location.state.batch[0]._id
  let count = 1;
  const handleClick = () => {
    navigate('/office/edit-batch', {
      state: {
        id: batchId
      }
    })
  }
  useEffect(() => {
    setStudents(location.state.students);

  }, [])

  const handleGetStudent = async (id) => {
    const headers = {
      headers: {
        Authorization: localStorage.getItem("officeToken")
      }
    }
    handleGetStudentAPI(id, headers).then((response) => {
      if (response.data.status) {

        navigate('/office/each-student', {
          state: {
            studentData: response.data.studentData
          }
        });
      }
    })
  }

  const handleBlock = async (id) => {

    Swal.fire({
      text: "Are you sure you want to block this student?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'green',
      cancelButtonColor: 'red',
      confirmButtonText: 'Yes'

    }).then((result) => {

      if (result.isConfirmed) {
        const headers = {
          headers: {
            Authorization: localStorage.getItem("officeToken")
          }
        }
        blockStudentAPI(id, headers).then(() => {
          const setStudent = students.filter((obj) => {
            if (obj._id === id) {
              obj.isBlocked = true;
            }
            return obj;
          })
          message.success("The student has been blocked")
          setStudents(setStudent);
        })
      }
    })
  }

  const handleUnBlock = async (id) => {

    Swal.fire({

      text: "Are you sure you want to Un block this student?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'green',
      cancelButtonColor: 'red',
      confirmButtonText: 'Yes'

    }).then((result) => {

      if (result.isConfirmed) {
        const headers = {
          headers: {
            Authorization: localStorage.getItem("officeToken")
          }
        }
        unBlockStudentAPI(id, headers).then(() => {
          const setStudent = students.filter((obj) => {
            if (obj._id === id) {
              obj.isBlocked = false;
            }
            return obj;
          })
          message.success("The student has been Un blocked")
          setStudents(setStudent);
        })
      }
    })



  }
  const data = () => {
    return {
      columns: [
        {
          label: 'SL NO',
          field: 'slno',
          width: 60,
        },
        {
          label: 'Register Id',
          field: 'registerId',
          width: 80,
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
          label: 'Phone',
          field: 'phone',
          width: 130,
        },
        {
          label: 'Batch',
          field: 'batch',
          sort: 'disabled',
          width: 80,
        },

        {
          label: 'Parent Contact',
          field: 'parentPhone',
          sort: 'disabled',
          width: 130,
        },
        {
          label: 'Controlls',
          field: 'controlls',
          sort: 'disabled',
          width: 100,
        },
        {
          label: 'View',
          field: 'view',
          sort: 'disabled',
          width: 80,
        },
      ],
      rows: students.map((obj, index) => {
        return {
          key:obj._id,
          slno: index + 1,
          registerId: obj.registerId,
          name: obj.name,
          phone: obj.phone,
          batch: obj.batch,
          parentPhone: obj.parentPhone,
          controlls:
            obj.isBlocked === false ?
              <button onClick={() => handleBlock(obj._id)} className='block-button'>Block</button>
              :
              <button onClick={() => handleUnBlock(obj._id)} className='unblock-button'>Un block</button>,

          view: <i onClick={() => handleGetStudent(obj._id)} className="i-tags ms-4 fa fa-chevron-circle-right"></i>
        }
      })
    };
  };

  return (
    <div className='container'>

      <button onClick={handleClick} className='EditButton'>Edit Batch deatails</button>

      <div className="container">
        <div className="d-flex flex-wrap justify-content-between">

          <div className='children'>
            <div className="d-flex flex-column align-items-center">
              <h5>Batch performance</h5>
              <h4>25%</h4>
            </div>
          </div>
          <div className='children'>
            <div className="d-flex flex-column align-items-center">
              <h5>Avg batch attenddance</h5>
              <h4>25%</h4>
            </div>
          </div>
          <div className='children'>
            <div className="d-flex flex-column align-items-center">
              <h5>Fee complition rate</h5>
              <h4>25%</h4>
            </div>
          </div>
          <div className='children'>
            <div className="d-flex flex-column align-items-center">
              <h5>Available seat</h5>
              <h4>{location.state.availableSeat}</h4>
            </div>
          </div>

        </div>

        <div className='batch-deatails-parent'>

          <div className='d-flex justify-content-center'>
            <h5 className='heading'>Details of the batch</h5>
          </div>

          <div className='d-flex flex-wrap '>

            <div className='batch-deatails-child d-flex flex-column align-items-center'>
              <p><strong>Batch</strong></p>
              <p>{location.state.batch[0].registerId}</p>
            </div>
            <div className='batch-deatails-child d-flex flex-column align-items-center'>
              <p><strong>Head of the batch</strong></p>
              <p>{location.state.batch[0].teacher_data[0].name}</p>
            </div>
            <div className='batch-deatails-child d-flex flex-column align-items-center'>
              <p><strong>Number of students</strong></p>
              <p>{location.state.batch[0].batchFill}</p>
            </div>
            <div className='batch-deatails-child d-flex flex-column align-items-center'>
              <p><strong>Total seat</strong></p>
              <p>{location.state.batch[0].numberOfSeat}</p>
            </div>
            <div className='batch-deatails-child d-flex flex-column align-items-center'>
              <p><strong>Start date</strong></p>
              <p>{readableStartDate}</p>
            </div>
            <div className='batch-deatails-child d-flex flex-column align-items-center'>
              <p><strong>Duration</strong></p>
              <p>{location.state.batch[0].duration}</p>
            </div>
            <div className='batch-deatails-child d-flex flex-column align-items-center'>
              <p><strong>Course fee</strong></p>
              <p>{location.state.batch[0].fee}</p>
            </div>
            <div className='batch-deatails-child d-flex flex-column align-items-center'>
              <p><strong>Total seats</strong></p>
              <p>{location.state.batch[0].numberOfSeat}</p>
            </div>
            <div className='batch-deatails-child d-flex flex-column align-items-center'>
              <p><strong>Remarks</strong></p>
              <p>{location.state.batch[0].remarks !== "" ? location.state.batch[0].remarks : "No remarks added"}</p>
            </div>
            <div className='batch-deatails-child d-flex flex-column align-items-center'>
              <p><strong>Subjects</strong></p>
              <div className="table-responsive">
                <table className="table table-striped table-bordered">
                  <thead>
                    <tr>
                      <th scope="col">SL NO</th>
                      <th scope="col">Subject</th>
                      <th scope="col">Teacher</th>
                    </tr>
                  </thead>
                  <tbody>
                    {

                      location.state.batch[0].subjects.map((obj) => {
                        return (
                          <tr key={obj._id}>
                            <th scope="row">{count++}</th>
                            <td>{obj.subject}</td>
                            <td>{obj.teacher}</td>
                          </tr>
                        )
                      })
                    }
                  </tbody>
                </table>
              </div>
            </div>



          </div>
        </div>
      </div>
      <div className='container mt-4'>
        <CDBContainer>
          <div className='container main-div'>
            <div className='d-flex align-items-center justify-content-center'>
              <h5 className='tableHeadding'>Students</h5>
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

export default EachBatches

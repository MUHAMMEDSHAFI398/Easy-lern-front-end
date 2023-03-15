import React, { useEffect, useState, useRef } from 'react'
import {
  availableMonthAPI,
  postStudentAttendanceAPI,
  attenDanceDetailsAPI,
  getBatchSubjectsAPI,
  batchStartEndAPI,
  addMarkAPI
} from '../../../Services/TeacherServices'
import './AddStudentData.css'
import { message } from 'antd'
import { validate, validateMarks } from './validation'
import { useLocation,useNavigate } from "react-router-dom"
import Swal from 'sweetalert2'

function AddStudentData() {

  const location = useLocation();
  const [availableMonth, setAvailableMonth] = useState([])
  const [formNoOfDays, setFormNoOfDays] = useState({ noOfDaysPresent: "" })
  const [formMonth, setFormMonth] = useState({ month: "", workingDays: "" })
  const [error, setErrors] = useState({})
  const [subjects, setSubjects] = useState([])
  const [startEndDate, setStartEndDate] = useState({ startDate: "", endDate: "" })
  const [subjectMarks, setSubjectMarks] = useState([{ subject: "", mark: "" }])
  const [month, setMonth] = useState({ month: "" })
  const [markerror, setMarkError] = useState({})
  const formRef = useRef(null);
  const navigate = useNavigate()

  useEffect(() => {
    const headers = {
      headers: {
        Authorization: localStorage.getItem('teacherToken')
      }
    }
    availableMonthAPI(headers).then((response) => {
      setAvailableMonth(response.data.availableMonth)
    })
  }, [])

  useEffect(() => {
    const headers = {
      headers: {
        Authorization: localStorage.getItem('teacherToken')
      }
    }
    const batchId = location.state.studentData.batch
    getBatchSubjectsAPI(batchId, headers).then((response) => {
      setSubjects(response.data.subjects)
      setSubjectMarks(response.data.subjects)
    })
  }, [])
  useEffect(() => {
    const headers = {
      headers: {
        Authorization: localStorage.getItem('teacherToken')
      }
    }
    batchStartEndAPI(headers).then((response) => {
      if (response.data.status) {
        setStartEndDate(response.data.dates)
      }

    })
  }, [])

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormNoOfDays({ ...formNoOfDays, [name]: value });
    setErrors({ ...error, [name]: "" });
  }


  const changeHandle = (e, workingDays) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormMonth({ month: value, workingDays: workingDays });
    setErrors({ ...error, [name]: "" });
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errors = validate(formMonth, formNoOfDays);
    if (Object.keys(errors).length !== 0) {
      setErrors(errors);
    } else {
      Swal.fire({
        text: "Are you sure you want to submit?",
        showCancelButton: true,
        confirmButtonColor: 'green',
        cancelButtonColor: 'red',
        confirmButtonText: 'Yes'

      }).then((result) => {

        if (result.isConfirmed) {
          const headers = {
            headers: {
              Authorization: localStorage.getItem('teacherToken')
            }
          }
          const data = {
            studentId: location.state.studentData.registerId,
            month: formMonth.month,
            noOfDaysPresent: formNoOfDays.noOfDaysPresent,
            workingDays: formMonth.workingDays
          }

          postStudentAttendanceAPI(data, headers).then((response) => {
            if (response.data.alert) {
              Swal.fire({
                text: response.data.alert,
                confirmButtonColor: 'green',
                confirmButtonText: 'OK'
              })

            } else if (response.data.status) {
              message.success('Successfully submitted the data')
              setFormMonth({ month: "", workingDays: "" })
              setFormNoOfDays({ noOfDaysPresent: "" })

            }
          })
        }
      })

    }

  }

  const handleMarkUpdate = (e, index) => {
    const values = [...subjectMarks];
    const { name, value } = e.target;
    const updatedMark = values.map((subject, i) => {
      if (i === index) {
        return { ...subject, mark: parseInt(value) };
      }
      return subject;
    });
    setSubjectMarks(updatedMark);
    setMarkError({ ...markerror, [name]: "" });
  };

  const handleMonthChange = (e) => {
    e.preventDefault()
    const { name, value } = e.target;
    setMonth({ month: value });
    setMarkError({ ...markerror, [name]: "" });

  }

  const handleMarkSubmit = (e) => {
    e.preventDefault()
    const errors = validateMarks(month, subjectMarks);
    if (Object.keys(errors).length !== 0) {
      setMarkError(errors);
    } else {
      Swal.fire({
        text: "Are you sure you want to submit?",
        showCancelButton: true,
        confirmButtonColor: 'green',
        cancelButtonColor: 'red',
        confirmButtonText: 'Yes'

      }).then((result) => {
        if (result.isConfirmed) {
          const headers = {
            headers: {
              Authorization: localStorage.getItem('teacherToken')
            }
          }
          const data = {
            studentId: location.state.studentData.registerId,
            month: month.month,
            subjectMarks
          }
          addMarkAPI(data, headers).then((response) => {
            if (response.data.status) {
              message.success('Successfully submitted the data')
              formRef.current.reset()
              setMonth({ month: "" })
              setSubjectMarks(subjectMarks.map(item => ({ ...item, mark: "" })));

            } else if (response.data.alert) {
              Swal.fire({
                text: response.data.alert,
                confirmButtonColor: 'green',
                confirmButtonText: 'OK'
              }).then((result) => {
                if (result.isConfirmed) {
                  setMonth({ month: "" })
                }
              })
            }
          })
        }
      })
    }
  }
  const handleClick = () => {
    navigate('/teacher/student-data', {
      state: {
        studentId: location.state.studentData.registerId,
      }
    })
  }

  return (
    <div className='container'>

      <div className='d-flex flex-wrap justify-content-center align-items-center ms-4 me-4 mb-5'>
        <button onClick={handleClick} className='btn btn-success' >Click here to view student history</button>

      </div>
      <div className='d-flex flex-wrap justify-content-between align-items-center ms-4 me-4 mb-5'>

        <div className='flexItemsStyle'>

          <div className='d-flex justify-content-center align-items-center mt-3'>
            <p className='leave-leter'>Add attendance</p>
          </div>

          <div className='container d-flex flex-wrap flex-column justify-content-center align-items-center mt-3'>

            <div className='d-flex flex-column mt-2'>
              <p className='mb-1'>Month</p>
              <select
                onChange={(e) => changeHandle(
                  e,
                  availableMonth.find(obj => obj.month === e.target.value)?.numberOfWorkingDays
                )}
                value={formMonth?.month}
                className='inputMonthData'
                name="month"
                id="month"
              >
                <option value="Select a month" defaultValue >Select a month</option>
                {
                  availableMonth?.map((obj) => {
                    const dateStr = obj.month;
                    const date = new Date(dateStr);
                    const formattedDate = date.toLocaleString('en-US', { month: 'long', year: 'numeric' });
                    return (
                      <option name="month"
                        key={obj._id}
                        value={obj.month}>
                        {formattedDate} (working days {obj.numberOfWorkingDays})
                      </option>
                    )
                  })
                }
              </select>
              {error?.month && <p className="ms-2 text-danger">{error?.month}</p>}
            </div>

            <div className='d-flex flex-column mt-5'>
              <p className='mb-1'>Number of days present</p>
              <input
                onChange={handleChange}
                value={formNoOfDays?.noOfDaysPresent}
                className='inputMonthData'
                name='noOfDaysPresent'
                type="number"
              />
              {error?.noOfDaysPresent && <p className="ms-2 text-danger">{error?.noOfDaysPresent}</p>}
            </div>

            <div className='d-flex flex-column'>
              <button onClick={handleSubmit} className='attendanceSubmitbtn btn btn-success' type='submit'>Submit</button>
            </div>

          </div>

        </div>

        <div>

          <div className='flexItemsStyle'>

            <div className='d-flex justify-content-center align-items-center mt-3'>
              <p className='leave-leter'>Add marks</p>

            </div>
            <div className='container d-flex flex-column justify-content-center align-items-center mt-3'>
              <form ref={formRef} onSubmit={handleMarkSubmit}>
                <div className='d-flex justify-content-center align-items-center'>
                  <div className='d-flex flex-column  mt-3'>

                    <p>Select month</p>
                    <input
                      onChange={handleMonthChange}
                      value={month.month}
                      className='subjectFixedinput'
                      name='month'
                      type="month"
                      min={startEndDate.startDate}
                      max={startEndDate.endDate}
                    />
                    {markerror?.month && <p className="mb-0 text-danger">{markerror?.month}</p>}
                  </div>
                </div>

                {
                  subjects?.map((obj, index) => {



                    return (
                      <div key={obj._id} className='d-flex justify-content-center align-items-center mt-3'>
                        <input value={obj.subject} readOnly name='subject' className='subjectFixedinput mt-1' type="text" />
                        <input
                          onChange={(e) => handleMarkUpdate(e, index)}
                          placeholder='Mark (Out of 100)'
                          name='mark'
                          className='markInput ms-2 mt-1'
                          type="number"
                        />

                      </div>
                    )
                  })

                }
                <div className='d-flex justify-content-center align-items-center mt-3'>
                  {markerror?.mark && <p className=" text-danger">{markerror?.mark}</p>}
                </div>
                <button type='submit' className='markSubmitbtn btn btn-success'>Submit</button>
              </form>
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}

export default AddStudentData

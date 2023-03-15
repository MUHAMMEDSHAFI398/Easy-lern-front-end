import React, { useState, useEffect } from 'react'
import { batchStartEndAPI, getmonthlyWorkDaysAPI, postWorkingDaysAPI } from '../../../Services/TeacherServices'
import './AddWorkingDays.css'
import validate from './validation'
import Swal from 'sweetalert2'
import { message } from 'antd'

function AddWorkingDays() {

  const intialValues = { month: "", numberOfWorkingDays: "" }
  const [startEndDate, setStartEndDate] = useState({ startDate: "", endDate: "" })
  const [formValues, setFormValues] = useState(intialValues)
  const [error, setErrors] = useState({});
  const [monthData, setMonthData] = useState([])
  const [showData, setShowData] = useState(false)
  const [showPage, setShowPage] = useState(true)

  useEffect(() => {
    const headers = {
      headers: {
        Authorization: localStorage.getItem('teacherToken')
      }
    }
    batchStartEndAPI(headers).then((response) => {
      if (response.data.status) {
        setStartEndDate(response.data.dates)
      } else if (response.data.noBatch) {
        setShowPage(false)
      }

    })
  }, [])
  useEffect(() => {
    const headers = {
      headers: {
        Authorization: localStorage.getItem('teacherToken')
      }
    }
    getmonthlyWorkDaysAPI(headers).then((response) => {
      
      if (response.data.workingDays.length !== 0) {
        setMonthData(response.data.workingDays)
        setShowData(true)
      }else if(response.data.noBatch){
        showPage(false)
      }
    })
  }, [])

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    setErrors({ ...error, [name]: "" });
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errors = validate(formValues);
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
          setFormValues(intialValues)
          const data = {
            ...formValues
          }
          const headers = {
            headers: {
              Authorization: localStorage.getItem('teacherToken')
            }
          }
          postWorkingDaysAPI(data, headers).then((response) => {
            if (response.data.alert) {
              Swal.fire({
                text: response.data.alert,
                confirmButtonColor: 'green',
                confirmButtonText: 'OK'
              })
            } else if (response.data.status) {
              message.success('Scuccesfully submitted')
              setMonthData(response.data.workingDays)
              setShowData(true)
            }
          })
        }
      })
    }
  }

  return (
    <div className='container'>
      {showPage ?
        <div className='container mt-5 mb-5'>
          <div className='d-flex justify-content-center align-items-center'>
            <div className='workDiv'>

              <div className='d-flex justify-content-center align-items-center'>
                <h5 className='titlestyle'>Add number of working days</h5>
              </div>

              <div className='d-flex flex-wrap justify-content-between align-items-center mb-1'>

                <div className='d-flex flex-column'>
                  <label className='ms-2' htmlFor="month">Select month</label>
                  <input className='workInpt ms-2 me-2 mt-2'
                    value={formValues.month}
                    onChange={handleChange}
                    name='month'
                    type="month"
                    min={startEndDate.startDate}
                    max={startEndDate.endDate}
                  />
                  {error.month && <p className="ms-2 text-danger">{error.month}</p>}
                </div>

                <div className='d-flex flex-column'>
                  <label className='ms-2' htmlFor="numberOfWorkingDays">Number of working days</label>
                  <input
                    value={formValues.numberOfWorkingDays}
                    onChange={handleChange}
                    name='numberOfWorkingDays'
                    className='workInpt ms-2 me-2 mt-2'
                    type="number"
                  />
                  {error.numberOfWorkingDays && <p className="ms-2 text-danger">{error.numberOfWorkingDays}</p>}
                </div>

                <button onClick={handleSubmit} className='submtbtn ms-2 me-2 '>Submit</button>

              </div>
            </div>
          </div>
          {
            showData ?
              <div className='container mt-4'>
                <div className='monthParentDivs'>
                  <div className='d-flex justify-content-center align-items-center'>
                    <h5 className='titlestyle mt-3 mb-4'>Monthly working days</h5>
                  </div>

                  <div className='container d-flex flex-wrap align-items-center monthlyData' >
                    {
                      monthData?.map((obj) => {
                        const dateStr = obj.month;
                        const date = new Date(dateStr);
                        const formattedDate = date.toLocaleString('en-US', { month: 'long', year: 'numeric' });
                        return (
                          <div key={obj._id} className='childOfMonthlyData ms-1 me-1'>
                            <div className='d-flex justify-content-center align-items-center'>
                              <p className='monthName'>{formattedDate}</p>
                            </div>
                            <div className='d-flex justify-content-center align-items-center' >
                              <p className='numberworkingDays'>{obj.numberOfWorkingDays} days</p>
                            </div>
                          </div>

                        )
                      })
                    }
                  </div>
                </div>
              </div>
              :
              <p className='mb-5'></p>
          }

        </div>
        :
        <p></p>
      }
    </div>
  )
}

export default AddWorkingDays

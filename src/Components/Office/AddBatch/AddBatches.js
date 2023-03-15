import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import './AddBatch.css'
import { message } from 'antd'
import validate from './BatchValidation';
import subjectValidate from './SubjectValidation'
import { availableTeachersAPI, addBatchAPI } from '../../../Services/OfficeServices';

function AddBatches() {


  const initialVlaues = {
    startDate: "", duration: "", fee: "", numberOfSeat: "", headOfTheBatch: "", remarks: ""
  };
  const subjectInitiaValues = { subject: "", teacher: "" }

  const [formValues, setFormValues] = useState(initialVlaues);
  const [error, setErrors] = useState({});
  const [subErrors, setSubErrors] = useState({});
  const [subjectValue, setSubjectValue] = useState(subjectInitiaValues);
  const [subjectValues, setSubjectValues] = useState([])
  const [teachers, setTeachers] = useState([]);
  const [allTeachers, setAllTeachers] = useState([])
  const navigate = useNavigate();


  useEffect(() => {
    const headers = {
      headers: {
          Authorization: localStorage.getItem("officeToken")
      }
  }
    availableTeachersAPI(headers).then((response) => {

      if (response.data.status) {
        setTeachers(response.data.teachers);
        setAllTeachers(response.data.allTeachers)
      } else {
        console.log(response);
      }
    })

  }, [])

  const onChangeHandle = (e) => {

    e.preventDefault();
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    setErrors({ ...error, [name]: "" });

  };

  const handleChange = (e) => {

    e.preventDefault();
    const { name, value } = e.target;
    setSubjectValue({ ...subjectValue, [name]: value });
    setSubErrors({ ...subErrors, [name]: "" });

  };

  const addSubHandle = (e) => {

    e.preventDefault();
    const subErrors = subjectValidate(subjectValue);

    if (Object.keys(subErrors).length !== 0) {
      setSubErrors(subErrors);
    } else {

      setSubjectValues([...subjectValues, subjectValue]);
      setSubjectValue(subjectInitiaValues);
    }

  }


  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate(formValues);
    if (Object.keys(errors).length !== 0) {
      setErrors(errors);
    } else {
      const data = {
        ...formValues,
        subjectValues
      }
      const headers = {
        headers: {
            Authorization: localStorage.getItem("officeToken")
        }
    }
      addBatchAPI(data,headers).then((response) => {
     
        if (response.data.status) {
          message.success('Successfully added new batch')
          navigate('/office/batches')
        } else {
          console.log(response.data)
        }
      })
    }

  }

  return (

    <div className='container'>
      <div className="container border-body  ">
        <div className=" d-flex align-items-center justify-content-center">
          <h5 className="text-decoration-underline ">Add new batch</h5>
        </div>
        <form className=" mb-3" onSubmit={handleSubmit} >
          <div className="d-flex flex-wrap justify-content-between">

            <div className="d-flex flex-column">
              <label className='ms-2 mt-3'>Starting date</label>
              <input
                value={formValues.startDate}
                onChange={onChangeHandle}
                name="startDate"
                className="input-tag "
                type="date"
              />
              {error.startDate && (<p className="ms-2 text-danger">{error.startDate}{window.scrollTo({ top: 60, behavior: "smooth" })}</p>)}
            </div>

            <div className="d-flex flex-column">
              <label className='ms-2 mt-3'>Duration in month</label>
              <input
                value={formValues.duration}
                onChange={onChangeHandle}
                name="duration"
                className="input-tag "
                type="number"
              />
              {error.duration && (<p className="ms-2 text-danger">{error.duration}{window.scrollTo({ top: 60, behavior: "smooth" })}</p>)}
            </div>

            <div class="d-flex flex-column">
              <label className='ms-2 mt-3'>Course fee</label>
              <input
                value={formValues.fee}
                onChange={onChangeHandle}
                name="fee"
                className="input-tag "
                type="number"
              />
              {error.fee && (<p className="ms-2 text-danger">{error.fee}{window.scrollTo({ top: 60, behavior: "smooth" })}</p>)}
            </div>

          </div>
          <div className="d-flex flex-wrap justify-content-between mt-4">

            <div class="d-flex flex-column">
              <label className='ms-2 mt-3'>Number of seat</label>
              <input
                value={formValues.numberOfSeat}
                onChange={onChangeHandle}
                name="numberOfSeat"
                className="input-tag "
                type="number"
              />
              {error.numberOfSeat && (<p className="ms-2 text-danger">{error.numberOfSeat}{window.scrollTo({ top: 60, behavior: "smooth" })}</p>)}
            </div>

            <div className="d-flex flex-column">
              <label className='ms-2 mt-3'>Head of the batch</label>
              <select

                value={formValues.headOfTheBatch}
                onChange={onChangeHandle}
                className="input-tag"
                name='headOfTheBatch'
                id=""
              >
                <option defaultValue disabled value=''>Available teachers</option>
                {
                  teachers.map((obj) => {
                    return (
                      <option value={obj.registerId}>{obj.name} ({obj.registerId})</option>
                    )
                  })
                }
              </select>
              {error.headOfTheBatch && (<p className="ms-2 text-danger">{error.headOfTheBatch}{window.scrollTo({ top: 60, behavior: "smooth" })}</p>)}
            </div>

            <div className="d-flex flex-column">
              <label className='ms-2 mt-3'>Remarks</label>
              <input
                placeholder='optional'
                value={formValues.remarks}
                onChange={onChangeHandle}
                name="remarks"
                className="input-tag "
                type="text"
              />
            </div>

          </div>
          <div className='d-flex flex-wrap justify-content-center mt-4'>

            <div className='subjectDiv'>
              <div className='d-flex justify-content-center mt-1'>
                <p className='p-tag'>Add subjects</p>
              </div>
              <div className='d-flex flex-wrap '>
                <div className="d-flex flex-column">
                  <input
                    className='ms-3 mb-3 mt-1 me-3 input-tag'
                    value={subjectValue.subject}
                    onChange={handleChange}
                    name='subject' type="text"
                    placeholder='Subject'

                  />
                  {subErrors.subject && (<p className="ms-4 text-danger">{subErrors.subject}{window.scrollTo({ top: 60, behavior: "smooth" })}</p>)}
                </div>
                <div className="d-flex flex-column">
                  <select
                    className='ms-3 mb-3 mt-1 me-3 input-tag'
                    value={subjectValue.teacher}
                    onChange={handleChange} name='teacher'
                    type="text" placeholder='Teacher'
                    id='subject'
                  >
                    <option defaultValue disabled value=''>Teacher</option>
                    {
                      allTeachers.map((obj) => {
                        return (
                          <option value={obj.name}>{obj.name} ({obj.registerId})</option>
                        )
                      })
                    }
                  </select>
                  {subErrors.teacher && (<p className="ms-4 text-danger">{subErrors.teacher}{window.scrollTo({ top: 60, behavior: "smooth" })}</p>)}

                </div>

              </div>
              <div className='d-flex justify-content-center mt-1'>
                <button
                  className='btn btn-secondary add-btn mb-3'
                  onClick={addSubHandle}
                >
                  Add
                </button>
              </div>

              {
                subjectValues.map((obj) => {
                  return (
                    <div className='d-flex justify-content-center '>
                      <div className='subjectAndTeacher container'>
                        <p className='mt-2'>{obj.subject}({obj.teacher})</p>
                        <i className='fas fa-times mt-3' onClick={() => {
                          return setSubjectValues(
                            subjectValues.filter((object) => object.subject !== obj.subject)
                          );
                        }}></i>
                      </div>
                    </div>
                  )
                })

              }

            </div>
          </div>

          <div className="d-flex flex-wrap justify-content-center mt-2">

            <div className="d-flex flex-column">
              <button
                className='btn btn-success rounded-3'
                type='submit'
              >
                Submit
              </button>
            </div>

          </div>

        </form>

      </div>
    </div>
  )
}

export default AddBatches

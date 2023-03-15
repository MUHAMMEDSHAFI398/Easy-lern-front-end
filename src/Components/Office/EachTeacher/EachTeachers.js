import React, { useState } from 'react';
import './EachTeacher.css';
import { useLocation, useNavigate } from "react-router-dom"
import Swal from 'sweetalert2'
import { message } from 'antd'
import { editTeachertAPI, getTeacherAPI, blockTeacherAPI, unBlockTeacherAPI } from '../../../Services/OfficeServices';
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBIcon,
  MDBListGroupItem,

} from 'mdb-react-ui-kit';


function EachTeachers() {

  const navigate = useNavigate()
  const location = useLocation();
  const initialvalues = { experience: "", salary: "" }
  const [formValues, setFormValues] = useState(initialvalues);
  const [teacherBlock, setTeacherBlock] = useState(location.state.teacher.isBlocked)

  const date_of_birth = location.state.teacher.date_of_birth
  const birthDate = new Date(date_of_birth);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const readableDate = birthDate.toLocaleDateString('en-US', options);


  const onChangeHandle = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });

  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const id = location.state.teacher._id
    const headers = {
      headers: {
          Authorization: localStorage.getItem("officeToken")
      }
  }
    editTeachertAPI(id, formValues,headers).then(() => {
      getTeacherAPI(id,headers).then((response) => {
        if (response.data.status) {
          navigate('/office/each-teacher', {
            state: {
              teacher: response.data.teacher
            }
          });
          setFormValues(initialvalues)
        }
      })

    }).catch((error) => {
      console.log(error);

    })
  }

  const handleBlock = (e) => {
    e.preventDefault();
    Swal.fire({

      text: "Are you sure you want to block this teacher?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'green',
      cancelButtonColor: 'red',
      confirmButtonText: 'Yes'

    }).then((result) => {
      if (result.isConfirmed) {
        const id = location.state.teacher._id
        const headers = {
          headers: {
              Authorization: localStorage.getItem("officeToken")
          }
      }
        blockTeacherAPI(id,headers).then(() => {
          message.success("This teacher has been blocked")
          setTeacherBlock(true)
        })
      }
    })



  }

  const handleUnBlock = (e) => {
    e.preventDefault();
    Swal.fire({

      text: "Are you sure you want to Unblock this teacher?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'green',
      cancelButtonColor: 'red',
      confirmButtonText: 'Yes'

    }).then((result) => {
      if (result.isConfirmed) {
        const id = location.state.teacher._id
        const headers = {
          headers: {
              Authorization: localStorage.getItem("officeToken")
          }
      }
        unBlockTeacherAPI(id,headers).then(() => {
          message.success("This teacher has been Unblocked")
          setTeacherBlock(false)
        })
      }
    })

  }

  return (
    <div>
      <div className='container'>
        <section style={{ backgroundColor: 'rgb(244, 243, 242)' }}>
          <MDBContainer className="py-5">


            <MDBRow>
              <MDBCol lg="4">

                <MDBCard className="mb-4">
                  <div className='borderDiv'>
                    <MDBCardBody className="text-center">
                      <MDBCardImage
                        src={location.state.teacher.image[0].url}
                        alt="avatar"
                        className="rounded-circle"
                        style={{ width: '150px' }}
                        fluid />
                      <p className="text-muted mb-1">{location.state.teacher.name}</p>
                      <p className="text-muted mb-4">{location.state.teacher.registerId}</p>
                      <div className="d-flex justify-content-center mb-2">
                        {
                          teacherBlock === false ?
                            <button onClick={handleBlock} className='btn btn-danger'>Block</button> :
                            <button onClick={handleUnBlock} className='btn btn-success'>Un block</button>
                        }


                      </div>
                    </MDBCardBody>
                  </div>
                </MDBCard>



                <MDBCard className="mb-4 mb-lg-0">
                  <div className='borderDiv'>
                    <MDBCardBody className="p-0">

                      <MDBListGroupItem className="d-flex justify-content-center align-items-center p-3">
                        <h5 className='contact-inf'>Contact information</h5>
                      </MDBListGroupItem>
                      <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                        <MDBIcon fas icon="envelope" style={{ color: '#55acee' }} />
                        <MDBCardText>{location.state.teacher.phone}</MDBCardText>
                      </MDBListGroupItem>
                      <hr className='mt-0 mb-1' />
                      <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                        <MDBIcon fas icon="phone-alt" style={{ color: '#55acee' }} />
                        <MDBCardText>{location.state.teacher.email}</MDBCardText>
                      </MDBListGroupItem>

                    </MDBCardBody>
                  </div>
                </MDBCard>


              </MDBCol>
              <MDBCol lg="8">
                <MDBCard className="mb-4">
                  <div className='borderDiv'>

                    <MDBCardBody>
                      <MDBRow>
                        <MDBCol sm="3">
                          <MDBCardText>Batch</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <MDBCardText className="text-muted">
                            {location.state.teacher.myBatch ? location.state.teacher.myBatch : 'Batch not Assigned'}
                          </MDBCardText>
                        </MDBCol>
                      </MDBRow>
                      <hr />
                      <MDBRow>
                        <MDBCol sm="3">
                          <MDBCardText>Date of birth</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <MDBCardText className="text-muted">{readableDate}</MDBCardText>
                        </MDBCol>
                      </MDBRow>
                      <hr />
                      <MDBRow>
                        <MDBCol sm="3">
                          <MDBCardText>Gender</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <MDBCardText className="text-muted">{location.state.teacher.gender}</MDBCardText>
                        </MDBCol>
                      </MDBRow>
                      <hr />
                      <MDBRow>
                        <MDBCol sm="3">
                          <MDBCardText>Quallification</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <MDBCardText className="text-muted">{location.state.teacher.qualification}</MDBCardText>
                        </MDBCol>
                      </MDBRow>
                      <hr />
                      <MDBRow>
                        <MDBCol sm="3">
                          <MDBCardText>Experiance</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <MDBCardText className="text-muted">{location.state.teacher.experience}</MDBCardText>
                        </MDBCol>
                      </MDBRow>
                      <hr />
                      <MDBRow>
                        <MDBCol sm="3">
                          <MDBCardText>Salary</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <MDBCardText className="text-muted">{location.state.teacher.salary}</MDBCardText>
                        </MDBCol>
                      </MDBRow>
                      <hr />
                      <MDBRow>
                        <MDBCol sm="3">
                          <MDBCardText>Address</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <MDBCardText className="text-muted">
                            {location.state.teacher.address.house_name},
                            {location.state.teacher.address.place},
                            {location.state.teacher.address.post},
                            {location.state.teacher.address.pin},
                            {location.state.teacher.address.district}
                          </MDBCardText>
                        </MDBCol>
                      </MDBRow>
                    </MDBCardBody>
                  </div>
                </MDBCard>




                <div className="container mb-5 borderDiv  rounded-3 ">
                  <div className=" d-flex align-items-center justify-content-center mt-3">
                    <h5 className="text-decoration-underline">Edit teacher details</h5>
                  </div>

                  <form className="mt-3 mb-3" onSubmit={handleSubmit}>
                    <div className="d-flex flex-wrap justify-content-between">

                      <div className="d-flex flex-column">

                        <input
                          value={formValues.salary}
                          onChange={onChangeHandle}
                          className="inputdiv rounded-3"
                          placeholder='Salary'
                          required name="salary"
                          type="text"
                        />
                      </div>

                      <div className="d-flex flex-column">

                        <input
                          value={formValues.experience}
                          onChange={onChangeHandle}
                          name="experience"
                          required placeholder='Experience'
                          className="inputdiv mt-4 rounded-3"
                          type="text"
                        />
                      </div>

                      <button className="submitButton btn btn-success mt-4" type="submit">Submit</button>

                    </div>

                  </form>

                </div>



              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </section>
      </div>
    </div>
  )
}

export default EachTeachers

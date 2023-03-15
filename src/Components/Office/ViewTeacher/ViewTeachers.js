import React, { useEffect, useState } from 'react'
import './ViewTeacher.css'
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import { message } from 'antd'
import { getTeachersAPI, getTeacherAPI, blockTeacherAPI, unBlockTeacherAPI } from '../../../Services/OfficeServices';

function ViewTeachers() {
  const [teachers, setTeachers] = useState([]);
  const navigate = useNavigate();
 let count=1;


  useEffect(() => {
    const headers = {
      headers: {
          Authorization: localStorage.getItem("officeToken")
      }
  }
    getTeachersAPI(headers).then((response) => {
      if (response.data.status) {
        setTeachers(response.data.teachers);
      } else {
        console.log(response);
      } 
    })
  }, [])


  const handleClick = async (id) => {
    const headers = {
      headers: {
          Authorization: localStorage.getItem("officeToken")
      }
  }
    getTeacherAPI(id,headers).then((response) => {
      if (response.data.status) {
        navigate('/office/each-teacher', {
          state: {
            teacher: response.data.teacher
          }
        });
      }
    })
  }
  const handleBlock = (id) => {
    Swal.fire({

      text: "Are you sure you want to block this teacher?",
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
        blockTeacherAPI(id,headers).then(() => {
          const setTeacher = teachers.filter((value) => {
            if (value._id === id) {
              value.isBlocked = true
            }
            return value;
          })
          message.success("This teacher has been blocked")
          setTeachers(setTeacher);
        })
      }
    })

  }

  const handleUnBlock = (id) => {
    Swal.fire({

      text: "Are you sure you want to Unblock this teacher?",
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
        unBlockTeacherAPI(id,headers).then(() => {
          const setTeacher = teachers.filter((value) => {
            if (value._id === id) {
              value.isBlocked = false
            }
            return value;
          })
          message.success("This teacher has been Unbloced")
          setTeachers(setTeacher);
        })
      }
    })

  }

  return (
    <div className='container' >

      <div className='container'>
        <div className='buttonTop' >
        <Link to="/office/leave-applications">
        <button className='buttonDiv'>Leave applications</button>
          </Link>
          <Link to="/office/add-teacher">
            <button className='buttonDiv ms-4'>Add teacher</button>
          </Link>
        </div>
        <div className="table-responsive">
          <table className="table-responsive table table-bordered table-striped mt-5">
            <thead>

              <tr>
                <th scope="col">SL NO</th>
                <th scope="col">Register id</th>
                <th scope="col">Name</th>
                <th scope="col">Contact</th>
                <th scope="col">Batch</th>
                <th scope="col">Salary</th>
                <th scope="col">Qualification</th>
                <th scope="col">Experiance</th>
                <th scope="col">Controlls</th>
                <th scope="col">View profile</th>
              </tr>

            </thead>

            <tbody>
              {
                teachers.map((obj) => {

                  return (
                    <tr key={obj._id}>
                      <th scope="row">{count++}</th>
                      <td>{obj.registerId}</td>
                      <td>{obj.name}</td>
                      <td>{obj.phone}</td>
                      <td>batch</td>
                      <td>{obj.salary}</td>
                      <td>{obj.qualification}</td>
                      <td>{obj.experience}</td>
                      <td>
                        {obj.isBlocked === false ?
                          <button onClick={() => handleBlock(obj._id)} className='block-button'>Block</button> :
                          <button onClick={() => handleUnBlock(obj._id)} className='unblock-button'>Un block</button>
                        }
                      </td>
                      <td>
                        <i onClick={() => handleClick(obj._id)} className="i-tags ms-4 fa fa-chevron-circle-right"></i>
                      </td>
                    </tr>
                  )

                })

              }
            </tbody>
          </table>
        </div>
      </div>



    </div>
  )
}

export default ViewTeachers





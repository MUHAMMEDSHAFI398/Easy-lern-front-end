import React, { useEffect, useState } from 'react'
import './ViewTeacher.css'
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import { message } from 'antd'
import { CDBCardBody, CDBDataTable, CDBContainer } from 'cdbreact';
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


  const data = () => {
    return {
      columns: [
        {
          label: 'NO',
          field: 'slno',
          width: 50,
        },
        {
          label: 'Register Id',
          field: 'registerId',
          width: 100,
          attributes: {
            'aria-controls': 'DataTable',
            'aria-label': 'Name',
          },
        },
        {
          label: 'Name',
          field: 'name',
          width: 190,
        },
        {
          label: 'Contact',
          field: 'phone',
          width: 105,
        },
        {
          label: 'Batch',
          field: 'batch',
          sort: 'disabled',
          width: 150,
        },

        {
          label: 'Salary',
          field: 'salary',
          sort: 'disabled',
          width: 90,
        },
        {
          label: 'Qualification',
          field: 'qualification',
          sort: 'disabled',
          width: 110,
        },
        {
          label: 'Experience',
          field: 'experience',
          sort: 'disabled',
          width: 101,
        },
        {
          label: 'Controlls',
          field: 'controlls',
          sort: 'disabled',
          width: 95,
        },
        {
          label: 'View',
          field: 'view',
          sort: 'disabled',
          width: 50,
        },
      ],
      rows: teachers.map((obj) => {
       
        return {
          key:obj._id,
          slno: count++,
          registerId: obj.registerId,
          name: obj.name,
          phone: obj.phone,
          batch:  obj.myBatch!== "" ? obj.myBatch : "No batch assigned",
          salary:obj.salary,
          qualification:obj.qualification,
          experience:obj.experience,
          paarentPhone: obj.parentPhone,
          controlls:
            obj.isBlocked === false ?
              <button onClick={() => handleBlock(obj._id)} className='block-button'>Block</button>
              :
              <button onClick={() => handleUnBlock(obj._id)} className='unblock-button'>Un block</button>,

          view: <i onClick={() => handleClick(obj._id)} className="i-tags ms-4 fa fa-chevron-circle-right"></i>


        }

      })
    };
  };

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
      </div>

      <div className='container mt-4'>
        <CDBContainer>
          <div className='container borderTeacherTable'>
            <div className='d-flex align-items-center justify-content-center'>
              <h5 className='mt-2' style={{textDecoration:"underline"}}>Teachers</h5>
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

export default ViewTeachers





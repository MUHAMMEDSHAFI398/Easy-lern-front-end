import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { CDBCardBody, CDBDataTable, CDBContainer } from 'cdbreact';
import './MyStudents.css'
import { getMyStudents } from '../../../Services/TeacherServices';
import { eachStudentAPI } from '../../../Services/TeacherServices';
import Swal from 'sweetalert2'
function MyStudents() {

  const [sutdents, setStudents] = useState([])
  const navigate = useNavigate()
  useEffect(() => {
    const headers = { headers: {
      Authorization: localStorage.getItem('teacherToken')
    }}
    getMyStudents(headers).then((response) => {
      if (response.data.status) {
        setStudents(response.data.students)
      } else {
        Swal.fire({
          text: "No batch is assigned for you",
          confirmButtonColor: 'green',
          confirmButtonText: 'close'
        })
      }
    })
  }, [])

  const handleClick = async (id) => {
    const headers = { headers: {
      Authorization: localStorage.getItem('teacherToken')
    }}
    eachStudentAPI(id,headers).then((response) => {
      navigate('/teacher/each-student', {
        state: {
          studentData: response.data.student
        }
      })
    })
  }


  const data = () => {
    return {
      columns: [
        {
          label: 'SL NO',
          field: 'slno',
          width: 55,
        },
        {
          label: 'Register id',
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
          width: 200,
        },
        {
          label: 'Phone',
          field: 'phone',
          width: 200,
        },
        {
          label: 'Parent name',
          field: 'parentName',
          sort: 'asc',
          width: 200,
        },
        {
          label: 'Education',
          field: 'education',
          sort: 'disabled',
          width: 150,
        },

        {
          label: 'View',
          field: 'view',
          sort: 'disabled',
          width: 80,
        },
      ],

      rows: sutdents?.map((student, index) => {


        return {
          slno: index + 1,
          registerId: student?.registerId,
          name: student?.name,
          phone: student?.phone,
          parentName: student?.parentName,
          education: student?.education,
          view: <i onClick={() => handleClick(student.registerId)} className="i-tags ms-4 fa fa-chevron-circle-right"></i>


        }

      })
    };
  };
  return (
    <div className='container'>

      <div className='container bodyParant'>
        <CDBContainer>
          <div className='container div-main'>
            <div className='d-flex align-items-center justify-content-center'>
              <h5 className='headdingTable'>Students</h5>
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

export default MyStudents

import React from 'react'
import { useEffect } from 'react'
import './StudentHome.css'
import { getHomeAPI } from '../../../Services/StudentServices'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../Redux/Action/Index';
import { Link } from 'react-router-dom';

function StudentHome() {

    const dispatch = useDispatch();
    const { storeStudentData } = bindActionCreators(actionCreators, dispatch);

    useEffect(() => {
        const headers = { headers: {
            Authorization: localStorage.getItem('studentToken')
          }}
        getHomeAPI(headers).then((response) => {
            storeStudentData(response.data.studentData)
        })
    }, [])

    const details = useSelector(state => state.studentData)
    const dateOfBirth = details.studentData.dateOfBirth
    const birthDate = new Date(dateOfBirth);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const readableDate = birthDate.toLocaleDateString('en-US', options);

  return (
    <div className='container'>
        <div className='parentHome container'>
            
        
            <div className='d-flex justify-content-end'>
                <Link to='/student/leave-applications'>
                <button className='btn btn-success homeBtns'> Apply for leave</button>
                </Link>
            </div>
            <div className='batch-deatails-parent-div'>

                <div className='d-flex justify-content-center'>
                    <h5 className='heading'>My profile</h5>
                </div>
                <div className='d-flex justify-content-center'>
                    <img className='img-div' src={details?.studentData?.image && details.studentData.image[0]?.url} alt="could not load" />
                </div>

                <div className='d-flex flex-wrap '>

                    <div className='batch-deatails-child d-flex flex-column align-items-center mt-3'>
                        <p><strong>Register id</strong></p>
                        <p>{details?.studentData?.registerId}</p>
                    </div>
                    <div className='batch-deatails-child d-flex flex-column align-items-center mt-3'>
                        <p><strong>Name</strong></p>
                        <p>{details?.studentData?.name}</p>
                    </div>
                    <div className='batch-deatails-child d-flex flex-column align-items-center mt-3'>
                        <p><strong>My batch</strong></p>
                        <p>{details?.studentData?.batch}</p>
                    </div>
                    <div className='batch-deatails-child d-flex flex-column align-items-center mt-3'>
                        <p><strong>Email</strong></p>
                        <p>{details?.studentData?.email}</p>
                    </div>

                    <div className='batch-deatails-child d-flex flex-column align-items-center mt-3'>
                        <p><strong>Phone</strong></p>
                        <p>{details?.studentData?.phone}</p>
                    </div>
                    <div className='batch-deatails-child d-flex flex-column align-items-center mt-3'>
                        <p><strong>Date of birth</strong></p>
                        <p>{readableDate}</p>
                    </div>
                    <div className='batch-deatails-child d-flex flex-column align-items-center mt-3'>
                        <p><strong>Parent</strong></p>
                        <p>{details?.studentData?.parentName}</p>
                    </div>
                    <div className='batch-deatails-child d-flex flex-column align-items-center mt-3'>
                        <p><strong>Parent phone</strong></p>
                        <p>{details?.studentData?.parentPhone}</p>
                    </div>
                    <div className='batch-deatails-child d-flex flex-column align-items-center mt-3'>
                        <p><strong>Last studied</strong></p>
                        <p>{details?.studentData?.institute}</p>
                    </div>
                    <div className='batch-deatails-child d-flex flex-column align-items-center mt-3'>
                        <p><strong>Address</strong></p>
                        <p>
                            {details?.studentData?.address?.house_name},
                            {details?.studentData?.address?.place}, <br />
                            {details?.studentData?.address?.post},
                            {details?.studentData?.address?.pin}, <br />
                            {details?.studentData?.address?.district},
                            {details?.studentData?.address?.state}
                        </p>
                    </div>



                </div>




            </div>

            </div>
        </div>
  )
}

export default StudentHome

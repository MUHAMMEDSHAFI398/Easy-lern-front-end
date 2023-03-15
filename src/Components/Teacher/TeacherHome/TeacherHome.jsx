import React from 'react'
import { useEffect } from 'react'
import './TeacherHome.css'
import { getHomeAPI } from '../../../Services/TeacherServices'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../Redux/Action/Index';
import { Link } from 'react-router-dom';

function TeacherHome() {

    const dispatch = useDispatch();
    const { storeTeacherData } = bindActionCreators(actionCreators, dispatch);

    useEffect(() => {
        const headers = { headers: {
            Authorization: localStorage.getItem('teacherToken')
          }}
        getHomeAPI(headers).then((response) => {
            storeTeacherData(response.data.teacherData)
        })
    }, [])


    const details = useSelector(state => state.teacherData)
    const date_of_birth = details.teacherData.date_of_birth
    const birthDate = new Date(date_of_birth);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const readableDate = birthDate.toLocaleDateString('en-US', options);


    return (
        <div className='container'>
        <div className='parentHome container'>
            

            
            <div className='d-flex justify-content-end'>
                <Link to='/teacher/leave-applications'>
                <button className='btn btn-success'> Apply for leave</button>
                </Link>
            </div>
            <div className='batch-deatails-parent-div'>

                <div className='d-flex justify-content-center'>
                    <h5 className='heading'>My profile</h5>
                </div>
                <div className='d-flex justify-content-center'>
                    <img className='img-div' src={details?.teacherData?.image && details.teacherData.image[0]?.url} alt="could not load" />
                </div>

                <div className='d-flex flex-wrap '>

                    <div className='batch-deatails-child d-flex flex-column align-items-center mt-3'>
                        <p><strong>Register id</strong></p>
                        <p>{details?.teacherData?.registerId}</p>
                    </div>
                    <div className='batch-deatails-child d-flex flex-column align-items-center mt-3'>
                        <p><strong>Name</strong></p>
                        <p>{details?.teacherData?.name}</p>
                    </div>
                    <div className='batch-deatails-child d-flex flex-column align-items-center mt-3'>
                        <p><strong>My batch</strong></p>
                        <p>{details?.teacherData?.myBatch === "" ? "Batch not Assigned" : details?.teacherData?.myBatch}</p>
                    </div>
                    <div className='batch-deatails-child d-flex flex-column align-items-center mt-3'>
                        <p><strong>Email</strong></p>
                        <p>{details?.teacherData?.email}</p>
                    </div>

                    <div className='batch-deatails-child d-flex flex-column align-items-center mt-3'>
                        <p><strong>Phone</strong></p>
                        <p>{details?.teacherData?.phone}</p>
                    </div>
                    <div className='batch-deatails-child d-flex flex-column align-items-center mt-3'>
                        <p><strong>Date of birth</strong></p>
                        <p>{readableDate}</p>
                    </div>
                    <div className='batch-deatails-child d-flex flex-column align-items-center mt-3'>
                        <p><strong>Qualification</strong></p>
                        <p>{details?.teacherData?.qualification}</p>
                    </div>
                    <div className='batch-deatails-child d-flex flex-column align-items-center mt-3'>
                        <p><strong>Experiance</strong></p>
                        <p>{details?.teacherData?.experience}</p>
                    </div>
                    <div className='batch-deatails-child d-flex flex-column align-items-center mt-3'>
                        <p><strong>Salary</strong></p>
                        <p>{details?.teacherData?.salary}</p>
                    </div>
                    <div className='batch-deatails-child d-flex flex-column align-items-center mt-3'>
                        <p><strong>Address</strong></p>
                        <p>
                            {details?.teacherData?.address?.house_name},
                            {details?.teacherData?.address?.place}, <br />
                            {details?.teacherData?.address?.post},
                            {details?.teacherData?.address?.pin}, <br />
                            {details?.teacherData?.address?.district},
                            {details?.teacherData?.address?.state}
                        </p>
                    </div>



                </div>




            </div>

            </div>
        </div>
    )
}

export default TeacherHome

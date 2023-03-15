import React, { useEffect, useState } from 'react'
import './profileUpdate.css'
import { message } from 'antd'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import validate from './validate'
import { updateProfileAPI } from '../../../Services/TeacherServices';

function ProfileUpdate() {
    const initialVlaues = { phone: "", email: "" }
    const addressInitialVlaues = { house_name: "", place: "", post: "", pin: "", district: "", state: "" }
    const [teacherData, setTeacherData] = useState(initialVlaues)
    const [address, setAddress] = useState(addressInitialVlaues)
    const [error, setErrors] = useState({})
    const navigate =useNavigate()

    const details = useSelector(state => state.teacherData.teacherData)
    useEffect(() => {
        setTeacherData(details);
        setAddress(details.address)
    }, [details]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTeacherData({ ...teacherData, [name]: value });
        setErrors({ ...error, [name]: "" });

    };
    const addressChangeHandle = (e) => {
        const { name, value } = e.target;
        setAddress({ ...address, [name]: value });
        setErrors({ ...error, [name]: "" });

    };

    const handleSubmit = (e) => {
        e.preventDefault()
        const errors = validate(teacherData, address);
        if (Object.keys(errors).length !== 0) {
            setErrors(errors);
        } else {
            const data={
                teacherData:teacherData,
                address:address
              }
              const headers = { headers: {
                Authorization: localStorage.getItem('teacherToken')
              }}
          updateProfileAPI(data,headers).then((response)=>{
            if(response.data.status){
                message.success('Successfully updated your profile')
                navigate('/teacher/home')
            }
          })
        }
    }

    return (
         <div className='container'>
        <div className="container border-line">

            <form className="formClass mb-3" onSubmit={handleSubmit}>
            <div className=" d-flex align-items-center justify-content-center ">
                <h5 className="text-decoration-underline mt-4 mb-5 ">Update profile</h5>
            </div>
                <div className="d-flex flex-wrap justify-content-between">
                    <div className="d-flex flex-column">
                        <label className='ms-2 mt-3'>Phone</label>
                        <input
                            onChange={handleChange}
                            value={teacherData?.phone}
                            name="phone"
                            className="input-tags"
                            id='name'
                            type="number"
                        />
                        {error.phone && (<p className="ms-2 text-danger">{error.phone}</p>)}
                    </div>
                    <div class="d-flex flex-column">
                        <label className='ms-2 mt-3'>Email</label>
                        <input
                            onChange={handleChange}
                            value={teacherData.email}
                            name="email"
                            className="input-tags"
                            type="string"
                        />
                        {error.email && (<p className="ms-2 text-danger">{error.email}{window.scrollTo({ top: 60, behavior: "smooth" })}</p>)}

                    </div>
                    <div class="d-flex flex-column">
                        <label className='ms-2 mt-3'>House name</label>
                        <input
                            onChange={addressChangeHandle}
                            value={address?.house_name}
                            name="house_name"
                            className="input-tags"
                            type="text"
                        />
                        {error.house_name && (<p className="ms-3 text-danger">{error.house_name}</p>)}

                    </div>
                    <div class="d-flex flex-column">
                        <label className='ms-2 mt-3'>Place</label>
                        <input
                            onChange={addressChangeHandle}
                            value={address?.place}
                            name="place"
                            className="input-tags"
                            type="text"
                        />
                        {error.place && (<p className="ms-3 text-danger">{error.place}</p>)}

                    </div>
                </div>

                <div className="d-flex flex-wrap justify-content-between mt-5 ">
                    <div className="d-flex flex-column">
                        <label className='ms-2 mt-3'>Post</label>
                        <input
                            onChange={addressChangeHandle}
                            value={address?.post}
                            name="post"
                            className="input-tags"
                            id='name'
                            type="text"
                        />
                        {error.post && (<p className="ms-3 text-danger">{error.post}</p>)}

                    </div>
                    <div class="d-flex flex-column">
                        <label className='ms-2 mt-3'>Pin code</label>
                        <input
                            onChange={addressChangeHandle}
                            value={address?.pin}
                            name="pin"
                            className="input-tags"
                            type="number"
                        />
                        {error.pin && (<p className="ms-3 text-danger">{error.pin}</p>)}

                    </div>
                    <div class="d-flex flex-column">
                        <label className='ms-2 mt-3'>District</label>
                        <input
                            onChange={addressChangeHandle}
                            value={address?.district}
                            name="district"
                            className="input-tags"
                            type="text"
                        />
                        {error.district && (<p className="ms-3 text-danger">{error.district}</p>)}

                    </div>
                    <div class="d-flex flex-column">
                        <label className='ms-2 mt-3'>State</label>
                        <input
                            onChange={addressChangeHandle}
                            value={address?.state}
                            name="state"
                            className="input-tags"
                            type="text"
                        />
                        {error.state && (<p className="ms-3 text-danger">{error.state}</p>)}

                    </div>
                </div>
                <div className="d-flex flex-wrap justify-content-center mt-5 mb-5">
                    <div className="d-flex flex-column">
                        <button className='btn btn-success rounded-3' type='submit'>Submit</button>
                    </div>
                </div>

            </form>
            </div>
        </div>
    )
}

export default ProfileUpdate


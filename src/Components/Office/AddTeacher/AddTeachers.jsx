import React, { useState } from 'react'
import './AddTeacher.css'
import { useNavigate } from "react-router-dom";
import { message } from 'antd'
import validate from './TeacherValidation';
import { addTeacherAPI } from '../../../Services/OfficeServices';

function AddTeachers() {
    const initialVlaues = {
        name: "", phone: "", email: "", date_of_birth: "", gender: "",
        salary: "", qualification: "", experience: "", remarks: "",
        house_name: "", place: "", post: "", pin: "", district: "", state: "", file: null
    };
    const [formValues, setFormValues] = useState(initialVlaues);
    const [imageURL, setImageURL] = useState(null);
    const [error, setErrors] = useState({});
    const [imageError, setImageError] = useState('')
    const navigate = useNavigate();

    const onChangeHandle = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
        setErrors({ ...error, [name]: "" });

    };
    const handleFileChange = event => {
        setFormValues({
            ...formValues,
            file: event.target.files[0]
        });
        const imageURL = URL.createObjectURL(event.target.files[0])
        setImageURL(imageURL);
        setImageError('')
        setErrors({ ...error, file: null });
    };


    const handleSubmit = (event) => {

        event.preventDefault();

        const data = new FormData();

        data.append("name", formValues.name);
        data.append("phone", formValues.phone);
        data.append("email", formValues.email);
        data.append("date_of_birth", formValues.date_of_birth);
        data.append("gender", formValues.gender);
        data.append("salary", formValues.salary);
        data.append("qualification", formValues.qualification);
        data.append("experience", formValues.experience);
        data.append("remarks", formValues.remarks);
        data.append("house_name", formValues.house_name);
        data.append("place", formValues.place);
        data.append("post", formValues.post);
        data.append("pin", formValues.pin);
        data.append("district", formValues.district);
        data.append("state", formValues.state);
        data.append("file", formValues.file);

        const errors = validate(formValues);
        if (Object.keys(errors).length !== 0) {
            setErrors(errors);
        } else {
            const headers = {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: localStorage.getItem("officeToken")
                },
            }
            addTeacherAPI(data,headers).then((resp) => {
                if (resp.data.imageError) {
                    setImageError(resp.data.imageError)
                } else {
                    message.success('Successfully added new teacher')
                    navigate('/office/teachers');
                }



            }).catch((error) => {
                console.log(error);

            })
        }

    }



    return (
        <div className='container'>
            <div className="container border-body">
                <div className=" d-flex align-items-center justify-content-center">
                    <h5 className="text-decoration-underline ">Add teacher</h5>
                </div>
                <form className=" mb-3" onSubmit={handleSubmit}>
                    <div className="d-flex flex-wrap justify-content-between">

                        <div className="d-flex flex-column">
                            <label className='ms-2 mt-3'>Name</label>
                            <input
                                value={formValues.name}
                                onChange={onChangeHandle}
                                name="name"
                                className="input-tag "
                                id='name'
                                type="text"
                            />
                            {error.name && (<p className="ms-2 text-danger">{error.name}{window.scrollTo({ top: 60, behavior: "smooth" })}</p>)}
                        </div>

                        <div class="d-flex flex-column">
                            <label className='ms-2 mt-3'>Phone</label>
                            <input
                                value={formValues.phone}
                                onChange={onChangeHandle}
                                name="phone"
                                className="input-tag "
                                type="number"
                            />
                            {error.phone && (<p className="ms-2 text-danger">{error.phone}{window.scrollTo({ top: 60, behavior: "smooth" })}</p>)}
                        </div>

                        <div className="d-flex flex-column">
                            <label className='ms-2 mt-3'>Email</label>
                            <input
                                value={formValues.email}
                                onChange={onChangeHandle}
                                name="email"
                                className="input-tag "
                                type="text"
                            />
                            {error.email && (<p className="ms-2 text-danger">{error.email}{window.scrollTo({ top: 60, behavior: "smooth" })}</p>)}

                        </div>


                    </div>
                    <div className="d-flex flex-wrap justify-content-between mt-4">

                        <div className="d-flex flex-column">
                            <label className='ms-2 mt-3'>Date of birth</label>
                            <input
                                value={formValues.date_of_birth}
                                onChange={onChangeHandle}
                                name="date_of_birth"
                                className="input-tag "
                                type="date"
                                max={new Date().toISOString().split("T")[0]}
                            />
                            {error.date_of_birth && (<p className="ms-3 text-danger">{error.date_of_birth}{window.scrollTo({ top: 60, behavior: "smooth" })}</p>)}
                        </div>

                        <div className="d-flex flex-column">
                            <label className='ms-2 mt-3'>Gender</label>

                            <select
                                name="gender"
                                id="gender"
                                value={formValues.gender}
                                onChange={onChangeHandle}
                                className="input-tag"
                                type='text'

                            >
                                <option disabled value=""></option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                            {error.gender && (<p className="ms-3 text-danger">{error.gender}{window.scrollTo({ top: 60, behavior: "smooth" })}</p>)}

                        </div>

                        <div className="d-flex flex-column">
                            <label className='ms-2 mt-3'>Salary</label>
                            <input
                                value={formValues.salary}
                                onChange={onChangeHandle}
                                name="salary"
                                className="input-tag "
                                type="number"
                            />
                            {error.salary && (<p className="ms-3 text-danger">{error.salary}{window.scrollTo({ top: 60, behavior: "smooth" })}</p>)}

                        </div>

                    </div>
                    <div className="d-flex flex-wrap justify-content-between mt-4">

                        <div className="d-flex flex-column">
                            <label className='ms-2 mt-3'>Qualification</label>
                            <input
                                value={formValues.qualification}
                                onChange={onChangeHandle}
                                name="qualification"
                                className="input-tag "
                                type="text"
                            />
                            {error.qualification && (<p className="ms-3 text-danger">{error.qualification}{window.scrollTo({ top: 60, behavior: "smooth" })}</p>)}
                        </div>

                        <div className="d-flex flex-column">
                            <label className='ms-2 mt-3'>Experiance</label>
                            <input
                                value={formValues.experience}
                                onChange={onChangeHandle}
                                name="experience"
                                className="input-tag "
                                type="number"
                            />
                            {error.experience && (<p className="ms-3 text-danger">{error.experience}{window.scrollTo({ top: 60, behavior: "smooth" })}</p>)}
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
                    <div className="d-flex flex-wrap justify-content-between mt-4">

                        <div className="d-flex flex-column">
                            <label className='ms-2 mt-3'>House name</label>
                            <input
                                value={formValues.house_name}
                                onChange={onChangeHandle}
                                name="house_name"
                                className="input-tag "
                                type="text"
                            />
                            {error.house_name && (<p className="ms-3 text-danger">{error.house_name}{window.scrollTo({ top: 60, behavior: "smooth" })}</p>)}

                        </div>

                        <div className="d-flex flex-column">
                            <label className='ms-2 mt-3'>Place</label>
                            <input
                                value={formValues.place}
                                onChange={onChangeHandle}
                                name="place"
                                className="input-tag "
                                type="text"
                            />
                            {error.place && (<p className="ms-3 text-danger">{error.place}{window.scrollTo({ top: 60, behavior: "smooth" })}</p>)}

                        </div>

                        <div className="d-flex flex-column">
                            <label className='ms-2 mt-3'>Post</label>
                            <input
                                value={formValues.post}
                                onChange={onChangeHandle}
                                name="post"
                                className="input-tag "
                                type="text"
                            />
                            {error.post && (<p className="ms-3 text-danger">{error.post}{window.scrollTo({ top: 60, behavior: "smooth" })}</p>)}

                        </div>

                    </div>
                    <div className="d-flex flex-wrap justify-content-between mt-4">

                        <div className="d-flex flex-column">
                            <label className='ms-2 mt-3'>Pincode</label>
                            <input
                                value={formValues.pin}
                                onChange={onChangeHandle}
                                name="pin"
                                className="input-tag "
                                type="number"
                            />
                            {error.pin && (<p className="ms-3 text-danger">{error.pin}{window.scrollTo({ top: 60, behavior: "smooth" })}</p>)}

                        </div>

                        <div className="d-flex flex-column">
                            <label className='ms-2 mt-3'>District</label>
                            <input
                                value={formValues.district}
                                onChange={onChangeHandle}
                                name="district"
                                className="input-tag "
                                type="text"
                            />
                            {error.district && (<p className="ms-3 text-danger">{error.district}{window.scrollTo({ top: 60, behavior: "smooth" })}</p>)}

                        </div>

                        <div className="d-flex flex-column">
                            <label className='ms-2 mt-3'>State</label>
                            <input
                                value={formValues.state}
                                onChange={onChangeHandle}
                                name="state"
                                className="input-tag "
                                type="text"
                            />
                            {error.state && (<p className="ms-3 text-danger">{error.state}{window.scrollTo({ top: 60, behavior: "smooth" })}</p>)}

                        </div>

                    </div>
                    <div className="d-flex flex-wrap justify-content-center mt-4">

                        {imageURL && <img className='imagedisplay' src={imageURL} alt="could not load " />}

                    </div>

                    <div className="d-flex flex-wrap justify-content-center mt-2">

                        <div className="d-flex flex-column">
                            <input
                                accept='image/*'
                                name='file'
                                onChange={handleFileChange}
                                className="input-tag form-control"
                                type="file" id="formFile"

                            />
                            {error.file && (<p className="ms-2 text-danger">{error.file}{window.scrollTo({ top: 60, behavior: "smooth" })}</p>)}
                            {imageError && (<p className="ms-2 text-danger">{imageError}{window.scrollTo({ top: 500, behavior: "smooth" })}</p>)}

                        </div>

                    </div>
                    <div className="d-flex flex-wrap justify-content-center mt-2">

                        <div className="d-flex flex-column">
                            <button className='btn btn-success rounded-3' type='submit'>Submit</button>
                        </div>

                    </div>

                </form>
            </div>
        </div>
    )
}

export default AddTeachers

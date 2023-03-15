import React, { useEffect, useState } from 'react'
import './AddStudent.css'
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import validate from './StudentValidation';
import { availableBatchAPI, addStudentAPI } from '../../../Services/OfficeServices';

function AddStudents() {

    const initialVlaues = {
        name: "", phone: "", email: "", dateOfBirth: "", gender: "",
        parentName: "", parentPhone: "", education: "", institute: "", batch: "",
        house_name: "", place: "", post: "", pin: "", district: "", state: "", file: null
    };

    const [batches, setBatches] = useState([]);
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

    useEffect(() => {
        const headers = {
            headers: {
                Authorization: localStorage.getItem("officeToken")
            }
        }
        availableBatchAPI(headers).then((response) => {
            if (response.data.status) {
                setBatches(response.data.batches);

            } else {
                console.log(response);
            }
        })
    }, [])

    const handleSubmit = (event) => {

        event.preventDefault();

        const data = new FormData();

        data.append("name", formValues.name);
        data.append("phone", formValues.phone);
        data.append("email", formValues.email);
        data.append("dateOfBirth", formValues.dateOfBirth);
        data.append("gender", formValues.gender);
        data.append("parentName", formValues.parentName);
        data.append("parentPhone", formValues.parentPhone);
        data.append("education", formValues.education);
        data.append("institute", formValues.institute); 
        data.append("batch", formValues.batch);
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
            addStudentAPI(data,headers).then((resp) => {
                if (resp.data.imageError) {
                    setImageError(resp.data.imageError)
                } else {
                    message.success('Successfully added new student')
                    navigate('/office/students');
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
                    <h5 className="text-decoration-underline ">Add student</h5>
                </div>
                <form className=" mb-3" onSubmit={handleSubmit} >
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

                        <div className="d-flex flex-column">
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
                                value={formValues.dateOfBirth}
                                onChange={onChangeHandle}
                                name="dateOfBirth"
                                className="input-tag "
                                type="date"
                                max={new Date().toISOString().split("T")[0]}
                            />
                            {error.dateOfBirth && (<p className="ms-2 text-danger">{error.dateOfBirth}{window.scrollTo({ top: 60, behavior: "smooth" })}</p>)}

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
                            {error.gender && (<p className="ms-2 text-danger">{error.gender}{window.scrollTo({ top: 60, behavior: "smooth" })}</p>)}
                        </div>

                        <div className="d-flex flex-column">
                            <label className='ms-2 mt-3'>Parent name</label>
                            <input
                                value={formValues.parentName}
                                onChange={onChangeHandle}
                                name="parentName"
                                className="input-tag "
                                type="text"
                            />
                            {error.parentName && (<p className="ms-2 text-danger">{error.parentName}{window.scrollTo({ top: 60, behavior: "smooth" })}</p>)}

                        </div>

                    </div>
                    <div className="d-flex flex-wrap justify-content-between mt-4">

                        <div className="d-flex flex-column">
                            <label className='ms-2 mt-3'>Parent phone</label>
                            <input
                                value={formValues.parentPhone}
                                onChange={onChangeHandle}
                                name="parentPhone"
                                className="input-tag "
                                type="number"
                            />
                            {error.parentPhone && (<p className="ms-2 text-danger">{error.parentPhone}{window.scrollTo({ top: 60, behavior: "smooth" })}</p>)}
                        </div>

                        <div className="d-flex flex-column">
                            <label className='ms-2 mt-3'>Educaton</label>
                            <input
                                value={formValues.education}
                                onChange={onChangeHandle}
                                name="education"
                                className="input-tag "
                                type="text"
                            />
                            {error.education && (<p className="ms-2 text-danger">{error.education}{window.scrollTo({ top: 60, behavior: "smooth" })}</p>)}
                        </div>

                        <div className="d-flex flex-column">
                            <label className='ms-2 mt-3'>Last studied institute</label>
                            <input
                                value={formValues.institute}
                                onChange={onChangeHandle}
                                name="institute"
                                className="input-tag "
                                type="text"
                            />
                            {error.institute && (<p className="ms-2 text-danger">{error.institute}{window.scrollTo({ top: 60, behavior: "smooth" })}</p>)}
                        </div>

                    </div>
                    <div className="d-flex flex-wrap justify-content-center mt-4">
                        <div className="d-flex flex-column">
                            <label className='ms-2 mt-3'>Available batch</label>
                            <select
                                value={formValues.batch}
                                onChange={onChangeHandle}
                                name='batch' className="input-tag"
                                id="batch"
                            >
                                <option defaultValue disabled value=''>Batch</option>

                                {
                                    batches.map((obj) => {
                                        return (
                                            <option value={obj.registerId}>{obj.registerId}</option>
                                        )
                                    })
                                }
                            </select>
                            {error.batch && (<p className="ms-2 text-danger">{error.batch}{window.scrollTo({ top: 60, behavior: "smooth" })}</p>)}

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
                            {error.house_name && (<p className="ms-2 text-danger">{error.house_name}{window.scrollTo({ top: 60, behavior: "smooth" })}</p>)}
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
                            {error.place && (<p className="ms-2 text-danger">{error.place}{window.scrollTo({ top: 60, behavior: "smooth" })}</p>)}
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
                            {error.post && (<p className="ms-2 text-danger">{error.post}{window.scrollTo({ top: 60, behavior: "smooth" })}</p>)}
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
                            {error.pin && (<p className="ms-2 text-danger">{error.pin}{window.scrollTo({ top: 60, behavior: "smooth" })}</p>)}
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
                            {error.district && (<p className="ms-2 text-danger">{error.district}{window.scrollTo({ top: 60, behavior: "smooth" })}</p>)}
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
                            {error.state && (<p className="ms-2 text-danger">{error.state}{window.scrollTo({ top: 60, behavior: "smooth" })}</p>)}
                        </div>

                    </div>
                    <div className="d-flex flex-wrap justify-content-center mt-4" >
                        {imageURL && <img className='imagedisplay' src={imageURL} alt="couldn't get" />}
                    </div>

                    <div className="d-flex flex-wrap justify-content-center mt-2">

                        <div className="d-flex flex-column">
                            <input

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

export default AddStudents

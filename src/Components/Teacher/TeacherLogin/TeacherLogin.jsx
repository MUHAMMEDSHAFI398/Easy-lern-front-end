import React, { useState } from 'react'
import { MDBContainer, MDBCol, MDBRow, MDBInput } from 'mdb-react-ui-kit';
import { useNavigate } from "react-router-dom";
import './TeacherLogin.css'
import axios from '../../../axios'


function TeacherLogin() {
    const initialVlaues = { registerId: "", password: "" };
    const [formValues, setFormValues] = useState(initialVlaues);
    const navigate = useNavigate();

    const [error, setError] = useState('')

    const onChangeHandle = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
        setError('')
    };
    const handleSubmit = (event) => {
        event.preventDefault();

        axios.post('/teacher/login', {

            registerId: formValues.registerId,
            password: formValues.password,

        }).then((response) => {
            if (response.data.error) {
                setError(response.data.error)
            } else {
                const jwtToken = response.data.token
                localStorage.setItem("teacherToken", jwtToken);
                navigate('/teacher/home');
            }


        }).catch((error) => {
            console.log(error);

        })
    }


    return (

        <div className='border-login container  mb-5 '  >
            <MDBContainer fluid className="p-3 my-5 h-custom">
                <MDBRow>
                    <MDBCol col='10' md='6'>
                        <img className='image' src="/images/girl-1.png" alt="couldn't load " />
                    </MDBCol>
                    <MDBCol col='4' md='6'>
                        <div className='border-login ' >
                            <div className="d-flex flex-row align-items-center justify-content-center">
                                <h1 className="mb-5 mt-3">Login</h1>
                            </div>

                            <form onSubmit={handleSubmit} >
                                
                                <p className='ms-4 mb-1'>Register Id</p>
                                <MDBInput
                                    className='input'
                                    value={formValues.registerId}
                                    onChange={onChangeHandle}
                                    wrapperClass='mb-4 ms-4 me-4'
                                    name='registerId'
                                    id='formControlLg'
                                    type='text' size="lg"
                                    required
                                />

                                <p className='ms-4 mb-1'>Passwword</p>
                                <MDBInput
                                    className='input'
                                    wrapperClass='mb-4 ms-4 me-4'
                                    value={formValues.password}
                                    onChange={onChangeHandle}
                                    name='password'
                                    id='formControlLg'
                                    type='password' size="lg"
                                    required
                                    max={new Date().toISOString().split("T")[0]}
                                />
                                {error && <p className="ms-2 text-danger">{error}</p>}

                                <MDBInput
                                    type='submit'
                                    value='Login'
                                    id='formControlLg'
                                    size="lg"
                                    className='submit-login btn btn-success mt-3'
                                    wrapperClass='mb-4 ms-4 me-4'
                                />

                            </form>
                        </div>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </div>

    )
}

export default TeacherLogin

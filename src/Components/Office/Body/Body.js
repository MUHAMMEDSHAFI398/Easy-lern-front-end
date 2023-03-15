import React, { useState } from 'react'
import { MDBContainer, MDBCol, MDBRow, MDBInput } from 'mdb-react-ui-kit';
import { useNavigate } from "react-router-dom";
import './Body.css'
import { officeLoginAPI } from '../../../Services/OfficeServices';



function Body() {

  const [error, setError] = useState("")
  const initialVlaues = { email: "", password: "" };
  const [formValues, setFormValues] = useState(initialVlaues);
  const navigate = useNavigate();

  const onChangeHandle = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    officeLoginAPI(formValues).then((response) => {
      if (response.data.status) {
        const jwtToken = response.data.token
        localStorage.setItem("officeToken", jwtToken);
        navigate('/office/home');
      } else {
        setError(response.data.errors)
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
            <img className='image' src="/images/girl-1.png" alt="" />
          </MDBCol>

          <MDBCol col='4' md='6'>

            <div className='border-login ' >

              <div className="d-flex flex-row align-items-center justify-content-center">
                <h1 className="mb-5 mt-3">Login</h1>

              </div>

              <form onSubmit={handleSubmit}>
                <MDBInput
                  className='input'
                  required
                  value={formValues.email}
                  onChange={onChangeHandle}
                  wrapperClass='mb-4 ms-4 me-4'
                  name='email'
                  placeholder='Email' id='formControlLg'
                  type='email' size="lg"
                />

                <MDBInput
                  className='input'
                  wrapperClass='mb-4 ms-4 me-4 mt-5'
                  required
                  name='password'
                  placeholder='Password' id='formControlLg'
                  type='password' size="lg"
                  value={formValues.password}
                  onChange={onChangeHandle}

                />
                {error && <p className="ms-2 text-danger">{error}</p>}

                <MDBInput className='submit-login btn btn-success mt-4'
                  wrapperClass='mb-4 ms-4 me-4'
                  type='submit' value='Login'
                  id='formControlLg' size="lg"
                />
              </form>

            </div>



          </MDBCol>

        </MDBRow>


      </MDBContainer>
    </div>

  )
}

export default Body



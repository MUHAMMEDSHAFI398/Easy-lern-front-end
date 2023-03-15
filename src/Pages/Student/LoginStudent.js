import React from 'react'
import Logo from '../../Components/Office/Logo/Logo'
import StudentLogin from '../../Components/Student/StudentLogin/StudentLogin'

function LoginStudent() {
  return (
    <div>
        <div className='ms-5 mt-3'>
        <Logo/>
      </div>
      <StudentLogin/>
    </div>
  )
}

export default LoginStudent

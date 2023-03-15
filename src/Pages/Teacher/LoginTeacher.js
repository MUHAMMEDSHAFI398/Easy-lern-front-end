import React from 'react'
import Logo from '../../Components/Office/Logo/Logo'
import TeacherLogin from '../../Components/Teacher/TeacherLogin/TeacherLogin'

function LoginTeacher() {
  return (
    <div>
      <div className='ms-5 mt-3'>
        <Logo/>
      </div>
      <TeacherLogin/>
    </div>
  )
}

export default LoginTeacher

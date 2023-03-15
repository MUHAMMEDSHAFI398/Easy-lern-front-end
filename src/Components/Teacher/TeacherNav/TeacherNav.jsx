import React from 'react'
import Logo from '../../Office/Logo/Logo'
import './TeacherNav.css'
import { message } from 'antd'
import { useNavigate, Link, useLocation } from 'react-router-dom';


function TeacherNav() {

  const navigate = useNavigate()
  const handleLogout = () => {  
    localStorage.removeItem("teacherToken")
    message.success("Successfully logged out")
    navigate('/teacher')
  }

  const location = useLocation();

  return (
    <nav className="navbar navbar-expand-lg TeacherNavParent" >
      <div className="container-fluid">
        <Logo />
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav first-nav">

            <Link className={location.pathname === '/teacher/home' ? 'hilite' : 'non-hilite'} to='/teacher/home'>
              <p className="ms-4"  >Home</p>
            </Link>

            <Link className={location.pathname === '/teacher/my-batch' ? 'hilite' : 'non-hilite'} to='/teacher/my-batch'>
              <p className="ms-4"  >My batch</p>
            </Link>

            <Link className={location.pathname === '/teacher/my-students' ? 'hilite' : 'non-hilite'} to='/teacher/my-students'>
              <p className="ms-4"  >My students</p>
            </Link>

            <Link className={location.pathname === '/teacher/update-profile' ? 'hilite' : 'non-hilite'} to='/teacher/update-profile'>
              <p className="ms-4" >Update profile</p>
            </Link>

            <Link className={location.pathname === '/teacher/leave-applications' ? 'hilite' : 'non-hilite'} to='/teacher/leave-applications'>
              <p className="ms-4" >Leave history</p>
            </Link>

            <Link className={location.pathname === '/teacher/student-leaves' ? 'hilite' : 'non-hilite'} to='/teacher/student-leaves'>
              <p className="ms-4" >Student leaves</p>
            </Link>

            <p className="non-hilite ms-4" style={{ cursor: "pointer" }} onClick={handleLogout}  >Logout</p>

          </div>
        </div>
      </div>
    </nav>
  )
}

export default TeacherNav

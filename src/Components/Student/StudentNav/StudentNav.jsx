import React from 'react'
import Logo from '../../Office/Logo/Logo'
import './StudentNav.css'
import { message } from 'antd'
import { useNavigate, Link, useLocation } from 'react-router-dom';



function StudentNav() {
    const location = useLocation()
    const navigate = useNavigate()
    
    const handleLogout = () => {  
        localStorage.removeItem("studentToken")
        message.success("Successfully logged out")
        navigate('/student')
      }

    return (
        <div>
            <nav className="navbar navbar-expand-lg studentNavParent" >
                <div className="container-fluid">
                    <Logo />
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav firstChild">

                            <Link className={location.pathname === '/student/home' ? 'hilites' : 'non-hilites'} to='/student/home'>
                                <p className="ms-4"  >Home</p>
                            </Link>

                            <Link className={location.pathname === '/student/history' ? 'hilites' : 'non-hilites'} to='/student/history'>
                                <p className="ms-4"  >My history</p>
                            </Link>

                            <Link className={location.pathname === '/student/leave-applications' ? 'hilites' : 'non-hilites'} to='/student/leave-applications'>
                                <p className="ms-4"  >Leave history</p>
                            </Link>

                            <Link className={location.pathname === '/student/payments' ? 'hilites' : 'non-hilites'} to='/student/payments'>
                                <p className="ms-4"  >Payments</p>
                            </Link>



                            <p className="non-hilites ms-4" style={{ cursor: "pointer" }} onClick={handleLogout} >Logout</p>

                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default StudentNav

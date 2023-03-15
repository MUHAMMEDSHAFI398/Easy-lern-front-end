import React from 'react'
import Logo from '../../Office/Logo/Logo'
import { Link } from 'react-router-dom'
import './NavBar.css'
function NavBar() {

    return (

            <div className='parentNav'>
            <div className='d-flex flex-wrap justify-content-between '>
                <Logo />
                <div className=' d-flex flex-column align-items-center'>
                    <h1 className='Nav-title'>EASY LEARN</h1>
                    <p className='Nav-sub-title'>The right track towards the goal</p>
                </div>
                <div className="dropdown">
                    <button className='LoginButton'>Login</button>
                    <div className="dropdown-content">
                        <Link to='/office' ><p>Office login</p></Link>
                        <Link to='/teacher'><p>Teacher login</p></Link>
                        <Link to='/student'><p>Student login</p></Link>
                    </div>
                </div>
            </div>
        </div> 
        
       

    )
}

export default NavBar

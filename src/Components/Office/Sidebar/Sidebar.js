import React from 'react';
import Logo from '../Logo/Logo';
import './Sidebar.css'
import { message } from 'antd'
import { NavLink, useNavigate } from 'react-router-dom';

import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';

function Sidebar() {

  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem("officeToken")
    message.success("Logout successfully")
    navigate('/office')
  }
  return (
    <div style={{ display: 'flex', minHeight: "100vh" }}>
      <CDBSidebar textColor="#fff" style={{ backgroundColor: 'rgb(206, 206, 205)', color: 'black' }} >
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <a href="/" className="text-decoration-none" style={{ color: 'inherit' }}>
            Sidebar
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <Logo />
          <CDBSidebarMenu >

            <NavLink  to="/office/home" activeclassname="activeClicked">
              <CDBSidebarMenuItem style={{ color: 'black' }} icon="home">Dashboard</CDBSidebarMenuItem>
            </NavLink>

            <NavLink  to="/office/batches" activeclassname="activeClicked">
              <CDBSidebarMenuItem style={{ color: 'black' }} icon="table">Batches</CDBSidebarMenuItem>
            </NavLink>

            <NavLink  to="/office/teachers" activeclassname="activeClicked">
              <CDBSidebarMenuItem style={{ color: 'black' }} icon="user">Teachers</CDBSidebarMenuItem>
            </NavLink>

            <NavLink  to="/office/students" activeclassname="activeClicked">
              <CDBSidebarMenuItem style={{ color: 'black' }} icon="users">Students</CDBSidebarMenuItem>
            </NavLink>

            <NavLink  to="/office/payments" target="_blank" activeclassname="activeClicked">
              <CDBSidebarMenuItem style={{ color: 'black' }} icon="exclamation-circle">Payments</CDBSidebarMenuItem>
            </NavLink>

            <div className='logout'>
              <CDBSidebarMenuItem onClick={handleLogout} style={{ color: 'black' }} icon="exclamation-circle">Logout</CDBSidebarMenuItem>
            </div>


          </CDBSidebarMenu>
        </CDBSidebarContent>


      </CDBSidebar>
    </div>
  )
}

export default Sidebar

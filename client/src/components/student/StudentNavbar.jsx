import React from 'react'
import { NavLink } from 'react-router-dom'

const StudentNavbar = () => {
  return (
    <div className='navbar'>
    <div className='title'>Teacher Dashboard</div>
    <div className='nav-elements'>
        <NavLink style={({ isActive}) =>{return { color: isActive ? "bisque" : ""}}} className='nav-element' to="/student/home">Home</NavLink>
        <NavLink style={({ isActive}) =>{return { color: isActive ? "bisque" : ""}}} className='nav-element' to="/student/courses">courses</NavLink>
        <NavLink style={({ isActive}) =>{return { color: isActive ? "bisque" : ""}}} className='nav-element' to="/student/assignments">Assignments</NavLink>
        <NavLink style={({ isActive}) =>{return { color: isActive ? "bisque" : ""}}} className='nav-element' to="/student/profile">profile</NavLink>

    </div>
</div>
  )
}

export default StudentNavbar
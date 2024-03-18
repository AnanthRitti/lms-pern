import React from 'react'
import { NavLink , Link } from 'react-router-dom'

const Nav = () => {
  return (
    <div className='navbar'>
        <div className='title'>Teacher Dashboard</div>
        <div className='nav-elements'>
            <NavLink style={({ isActive}) =>{return { color: isActive ? "bisque" : ""}}} className='nav-element' to="/teacher/home">Home</NavLink>
            <NavLink style={({ isActive}) =>{return { color: isActive ? "bisque" : ""}}} className='nav-element' to="/teacher/courses">courses</NavLink>
            <NavLink style={({ isActive}) =>{return { color: isActive ? "bisque" : ""}}} className='nav-element' to="/teacher/assignments">Assignments</NavLink>
            <NavLink style={({ isActive}) =>{return { color: isActive ? "bisque" : ""}}} className='nav-element' to="/teacher/profile">profile</NavLink>

        </div>
    </div>
  )
}

export default Nav
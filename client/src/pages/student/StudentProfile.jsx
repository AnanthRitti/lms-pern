import React from 'react'
import StudentNavbar from '../../components/student/StudentNavbar'
import Logout from '../../components/Logout'

const StudentProfile = () => {
  return (
    <div className='profile'>
        <StudentNavbar/>
        <Logout/>
    </div>
  )
}

export default StudentProfile
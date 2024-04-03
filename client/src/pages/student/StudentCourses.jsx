import React, { useEffect, useState } from 'react'
import StudentNavbar from '../../components/student/StudentNavbar'
import axios from 'axios'
import StudentCourseList from '../../components/student/StudentCoursesList'

const StudentCourses = () => {

    const [data,setData]= useState([])

    async function getCourses(){
        try{
          const response = await axios.get("http://localhost:3000/student/courses",{ withCredentials: true })
          const data = response.data
          setData(data)
          // console.log(response.data)
    
    
        }
        catch(err){
          // console.log(err)
        }
      }

      useEffect(()=>{getCourses()},[])

  return (
    <div>
        <StudentNavbar/>
        <div className='courses-page'>
            { data?data.map((item) => <StudentCourseList key={item.course_id} data={item} />) : (<div>no course found</div>) }
        </div>
    </div>  
  )
}

export default StudentCourses
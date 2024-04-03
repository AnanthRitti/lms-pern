import React, { useEffect, useState } from 'react'
import Nav from '../../components/teacher/Nav'
import { useDispatch } from 'react-redux';
import { addCourse } from '../../redux/features/course/courseSlice';
import { Cookies, useCookies } from 'react-cookie';
import axios from "axios";
import CoursesList from '../../components/teacher/CoursesList';
import { useNavigate } from 'react-router-dom';

const TeacherCourses = () => {
  const  [cookie,setCookie] = useCookies()
  const [name,setName] = useState("");
  const [grade,setGrade] = useState("");
  const [enrollKey,setEnrollKey] = useState("");
  const [data,setData]= useState()
  const [showModel , setShowModel] = useState(false)
  const navigateto = useNavigate()
  // const obj = {id : cookie.userId, name : name , class : grade}
  // const dispatch = useDispatch()

  async function handleSubmit(e){
    const course = {
      userId: cookie.userId,
      courseName : name,
      courseClass : grade,
      enrollKey : enrollKey
    }
      try{
        console.log(course)
        const response = await axios.post("http://localhost:3000/teacher/courses/",course,{ withCredentials: true })
        console.log(response)
        // dispatch(addCourse(course))
        getCourses()
        setShowModel(false)
        document.body.style.overflow="visible"
      }
      catch(err){
        console.log(err)
        navigateto("/login")
      }

      
  }

  async function getCourses(){
    try{
      const response = await axios.get(`http://localhost:3000/teacher/courses/${cookie.userId}`,{ withCredentials: true })
      const data = response.data.rows
      setData(data)
      console.log(response.data)


    }
    catch(err){
      console.log(err)
      navigateto("/login")
    }
  }

  useEffect(() =>{getCourses()},[])

  return (
    <div >
         <Nav/> 
         <button id='add-course-button' onClick={() => {document.body.style.overflow="hidden" ; setShowModel(true)}}>ADD COURSE</button>
         <div  >
         {showModel?<div className='course-overlay'>
          <div className='course-model'>
          <button id='course-cross-btn' onClick={() => {setShowModel(false);  document.body.style.overflow="visible"}}>✖</button>
          <input type='text' placeholder='name' onChange={(e) => setName(e.target.value)} />
           
            <input type='text' placeholder='class' onChange={(e) => setGrade(e.target.value)} />
            <input type='text' placeholder='Enrollment key' onChange={(e) => setEnrollKey(e.target.value)} />
            <button id='course-save-btn' onClick={(e) => {handleSubmit(e)}} > SAVE </button>
          </div>
         </div>: <div></div>}

            <div className='courses-page'>
           { data?data.map((item) => <CoursesList key={item.course_id} data={item}/>) : (<div>no course found</div>) }
           </div>
         </div>
    </div>
  )

  }
export default TeacherCourses
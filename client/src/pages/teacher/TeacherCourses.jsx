import React, { useEffect, useState } from 'react'
import Nav from '../../components/teacher/Nav'
import { useDispatch } from 'react-redux';
import { addCourse } from '../../redux/features/course/courseSlice';
import { Cookies, useCookies } from 'react-cookie';
import axios from "axios";
import CoursesRender from '../../components/teacher/CoursesRender';

const TeacherCourses = () => {
  const  [cookie,setCookie] = useCookies()
  const [name,setName] = useState("");
  const [grade,setGrade] = useState("");
  const [data,setData]= useState()
  // const obj = {id : cookie.userId, name : name , class : grade}
  const dispatch = useDispatch()

  async function handleSubmit(e){
    const course = {
      userId: cookie.userId,
      courseName : name,
      courseClass : grade
    }
      try{
        console.log(course)
        const response = await axios.post("http://localhost:3000/teacher/courses/",course)
        console.log(response)
        dispatch(addCourse(course))
        getCourses()
      }
      catch(err){
        console.log(err)
      }

      
  }

  async function getCourses(){
    try{
      const response = await axios.get(`http://localhost:3000/teacher/courses/${cookie.userId}`)
      const data = response.data.rows
      setData(data)
      console.log(response.data.rows)


    }
    catch(err){
      console.log(err)
    }
  }

  useEffect(() =>{getCourses()},[])

  return (
    <div>
         <Nav/>
         <div  >
            <input type='text' placeholder='name' onChange={(e) => setName(e.target.value)} />
            <input type='text' placeholder='class' onChange={(e) => setGrade(e.target.value)} />
            <button onClick={(e) => {handleSubmit(e)}} > ADD COURSE</button>
            <div className='courses-page'>
           { data?data.map((item) => <CoursesRender key={item.course_id} data={item}/>) : (<div>no course found</div>) }
           </div>
         </div>
    </div>
  )

  }
export default TeacherCourses
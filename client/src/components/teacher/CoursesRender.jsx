import React from 'react'

const CoursesRender = ({data}) => {
  return (
    <div className='course-box'>
      <img className='course-img' src='https://www.guvi.in/blog/wp-content/uploads/2023/10/web-development-course-1200x675.webp'/> 

      <p className='course-title'>Subject: {data.course_name}</p>
      <p className='course-class'>Class: {data.cou_class}</p>
      <button>View</button>

    </div>
  )
}

export default CoursesRender
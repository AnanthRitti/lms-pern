import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { nanoid } from '@reduxjs/toolkit';
import StudentNavbar from '../../components/student/StudentNavbar';

const StudentCourse = () => {
    const params = useParams()
    const [notes , setNotes] = useState([])



    async function getNotes(){

        const response = await axios.get(`http://localhost:3000/student/courses/course/${params.course_id}`, { withCredentials: true })
        console.log(response.data)
        setNotes(response.data)

    }


    useEffect(()=> {getNotes()},[])

    return (
        <div>
    <StudentNavbar/>

  <div className='notes-page'>

    <div className='notes-container'>
        <header>
            <h2>Notes</h2>
        </header>

        <div className='notes'>
            {notes.length?notes.map((item)=> {return (
                <div className='notes-box' key={item.file_id}> 
                    <p >{item.file_name}</p>
                    <div>
                    <button ><a href={item.file_url}>OPEN</a></button>
                    </div>

                </div>)}) 
                : <div>No notes are added</div>}
        </div>
    </div>
</div>
        </div>
    );
}

export default StudentCourse



import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { nanoid } from '@reduxjs/toolkit';
import Nav from '../../components/teacher/Nav';

const Course = () => {
    const params = useParams();
    const [showForm , setShowForm]= useState(false)
    const [notes , setNotes] = useState([])
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent default form submission
        setLoading(true); // Set loading state to true while submitting

        const formData = new FormData(event.target);
        
        try {
            const response = await axios.post(`http://localhost:3000/teacher/courses/course/${params.course_id}`, formData);
            setResponse(response.data);
        } catch (error) {
            console.error('Error submitting form:', error);
        } finally {
            setLoading(false); // Set loading state back to false when submission is complete
            getNotes() 
            setShowForm(false)
        }
    };

    async function getNotes(){

        const response = await axios.get(`http://localhost:3000/teacher/courses/course/${params.course_id}`)
        console.log(response.data)
        setNotes(response.data)

    }

    async function deleteNotes(file_id){
        console.log(file_id)
        const response= await axios.delete(`http://localhost:3000/teacher/courses/course/${params.course_id}`,{ data: { file_id: file_id } })
        console.log(response)
        getNotes()
    }

    useEffect(()=> {getNotes()},[])

    return (
        <div>
    <Nav/>

  <div className='notes-page'>

    <div className='notes-container'>
        <header>
            <h2>Notes</h2>
            <button onClick={() => {setShowForm (true)}}>Add Notes</button>
        </header>

        {showForm &&                 
        <form className='file-form' onSubmit={handleSubmit} encType="multipart/form-data">
            <input placeholder='File Name' type='text' name='file_name' required/>
            <input  name='file' type='file' required/>
            <button type='submit' disabled={loading}>
                {loading ? 'Uploading...' : 'Upload'}
            </button>
            <button onClick={()=>{setShowForm(false)}}>Cancel</button>
        </form>}

        {loading && (
            <div className='loading-container'>
                <div className='loading-spinner'></div>
            </div>
        )}

        {response && (
            <div className='response'>
                Response: {response}
            </div>
        )}

        <div className='notes'>
            {notes.length?notes.map((item)=> {return (
                <div className='notes-box' key={item.file_id}> 
                    <p >{item.file_name}</p>
                    <div>
                    <button ><a href={item.file_url}>OPEN</a></button>
                    <button onClick={() => {deleteNotes(item.file_id)}}>DELETE</button>
                    </div>

                </div>)}) 
                : <div>No notes are added</div>}
        </div>
    </div>
</div>
        </div>
    );
}

export default Course;

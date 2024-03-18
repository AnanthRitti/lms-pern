import { createSlice , nanoid } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {

  courses : []

}

export const courseSlice = createSlice({
  name: 'course',
  initialState,
  reducers: {
    addCourse : (state , action) =>{
        state.courses.push(action.payload)
      },
    // getCourses: async (state , action) =>{
        
    //  }

  

  },
})


export const { addCourse } = courseSlice.actions

export default courseSlice.reducer
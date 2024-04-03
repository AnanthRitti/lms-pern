import db from "../../db/db.js"
import uploadOnCloudinary from "../../../utils/cloudinary.js"

const addFile = async (req,res)=>{
    try{
      const response= await uploadOnCloudinary(req.file.path) 
      res.json("file uploaded")
      const data = await db.query(`INSERT INTO files (course_id , file_name , file_url) 
      VALUES ($1,$2,$3)`, [req.params.course_id , req.body.file_name,response.url ])
      console.log(data)
    }
    catch(err){
      console.log(err)
    }
}  

const listFiles =  async (req,res)=>{
    try{
      
    
      const response = await db.query(`SELECT * FROM files WHERE course_id=$1 `, [req.params.course_id])
    //   console.log(response.rows)
      res.json(response.rows)
      
    }
    catch(err){
      console.log(err)
    }
}

const deleteFile = async (req,res)=>{
    try{
      
        console.log(req.body.file_id)
    
      const response = await db.query(`DELETE FROM files WHERE file_id=$1 `, [req.body.file_id])
      console.log(response)
      res.json(response)
      
    }
    catch(err){
      console.log(err)
    }
  
  //    res.json(response.url)
  //    res.json(url)
  
  }


export {
    addFile,
    listFiles,
    deleteFile
}
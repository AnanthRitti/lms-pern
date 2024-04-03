import db from "../../db/db.js"

const addCourse = async (req,res) =>{
    try{
        const  {userId , courseName , courseClass,enrollKey } = req.body
        const response =  await db.query(`INSERT INTO courses (user_id , course_name , cou_class, enrollment_key)
        VALUES ($1,$2,$3,$4)`,[userId ,courseName,courseClass,enrollKey])
        res.json(response)
    }
    catch(err){
        console.log(err)
    }

}


export {
    addCourse
}
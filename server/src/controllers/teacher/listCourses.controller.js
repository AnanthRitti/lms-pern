import db from "../../db/db.js"

const listCourses = async (req,res) =>{
    const {id}= req.params
    // console.log(req.params)
    const response = await db.query("SELECT * FROM courses WHERE user_id=$1",[id])
    res.json(response)

}


export {
    listCourses
}
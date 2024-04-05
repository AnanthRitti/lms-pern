import db from "../../db/db.js"

const listAllFiles = async (req,res) =>{
    const courseID=req.params.course_id;
    const response = await db.query("SELECT * FROM files where course_id=$1",[courseID])
    console.log(response.rows)
    res.json(response.rows)

}


export {
    listAllFiles
}
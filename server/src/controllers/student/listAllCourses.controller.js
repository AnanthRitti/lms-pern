import db from "../../db/db.js"

const listAllCourse = async (req,res) =>{

    const response = await db.query("SELECT * FROM courses")
    console.log(response.rows)
    res.json(response.rows)

}


export {
    listAllCourse
}
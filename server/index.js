import express from "express";
import db from './db.js';
import cors from "cors";
import bcrypt from 'bcrypt'
import jsonwebtoken from 'jsonwebtoken'
import cookieParser from "cookie-parser";

const app = express();
const port = 3000;

app.use(cors({
   origin : ["http://localhost:5173","http://localhost:5173/login"],
   methods : ["GET","POST"],
   credentials:true 
}
));
app.use(cookieParser())
app.use(express.json())

const varifyUser = (req,res,next) => {
    const token = req.cookies.authToken
    console.log(token)
    jsonwebtoken.verify(token , 'secret',(err,decoded) => {
        console.log(token)
        if(err) return res.json('please login')
        next()
    })
}

app.get("/",varifyUser ,(req,res) => {
    res.json("success")
});

app.post("/login",async (req,res) => {
    console.log(req.body)
    const {Username , Password} = req.body
    const login = await db.query(`SELECT * FROM users WHERE user_username=$1 AND user_password=$2`,[Username,Password])
    console.log(login.rows)
    console.log(Username)
    console.log(Password)
    if (!login.rows.length) return res.json({ detail: 'user does not exist' })
    else {
        const token = jsonwebtoken.sign({ Username }, 'secret', { expiresIn: '1hr' });
        res.json({ userId : login.rows[0].user_id , 'Type': login.rows[0].user_type, 'token': token });
    }
})


app.post("/teacher/courses/",async (req,res) =>{
    try{
        const  {userId , courseName , courseClass } = req.body
        const response =  await db.query(`INSERT INTO courses (user_id , course_name , cou_class)
        VALUES ($1,$2,$3)`,[userId ,courseName,courseClass])
        res.json(response)
    }
    catch(err){
        console.log(err)
    }

} )

app.get("/teacher/courses/:id",async (req,res) =>{
    const {id}= req.params
    // console.log(req.params)
    const response = await db.query("SELECT * FROM courses WHERE user_id=$1",[id])
    res.json(response)

})


app.listen(port, () => {
    console.log("Serving running on 3000...");
});

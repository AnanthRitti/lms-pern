import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import verifyUser from "./middlewares/varifyUser.middleware.js";

const app = express();

app.use(cors({
    origin : ["http://localhost:5173","http://localhost:5173/login"],
    methods : ["GET","POST","DELETE"],
    credentials:true 
 }
 ));
 app.use(cookieParser())
 app.use(express.json())
 app.use(express.urlencoded({
     extended: false
     }));  
   

import loginroute from './routes/login.route.js'  
import teacherroute from './routes/teacher.route.js'
import studentroute from './routes/student.route.js'




app.use('/login', loginroute)
app.use('/teacher', verifyUser , teacherroute)
app.use('/student', verifyUser , studentroute)

 export default app    
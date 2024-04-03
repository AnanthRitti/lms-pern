import { Router } from 'express';
import { listAllCourse } from '../controllers/student/listAllCourses.controller.js';



const router = Router();

router.route("/courses").get( listAllCourse)


export default router
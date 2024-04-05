import { Router } from 'express';
import { listAllCourse } from '../controllers/student/listAllCourses.controller.js';
import { listAllFiles } from '../controllers/student/listAllFiles.js';


const router = Router();

router.route("/courses").get( listAllCourse)
router.route("/courses/course/:course_id").get(listAllFiles)


export default router
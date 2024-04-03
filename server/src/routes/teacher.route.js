import { Router } from "express";
import { addCourse } from "../controllers/teacher/addCourse.controller.js";
import { listCourses } from "../controllers/teacher/listCourses.controller.js";
import upload from "../middlewares/multer.middleware.js";
import { addFile, deleteFile, listFiles } from "../controllers/teacher/file.controller.js";

const router = Router()

router.route("/courses").post( addCourse)
router.route("/courses/:id").get(listCourses)
router.route("/courses/course/:course_id").post(upload.single("file"),addFile)
.get(listFiles)
.delete(deleteFile)


export default router
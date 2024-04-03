import { Router } from 'express';
import { userLogin } from '../controllers/userLogin.controller.js';


const router = Router();

router.route("/").post(userLogin)


export default router
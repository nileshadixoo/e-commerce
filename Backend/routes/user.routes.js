import {Router} from 'express';
import { loginUser, logoutUser, registerUser } from '../controllers/user.controller.js';
import { userAuth } from '../middlewares/auth.middleware.js';

const router = Router();
router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/logout').get(userAuth,logoutUser)


export default router
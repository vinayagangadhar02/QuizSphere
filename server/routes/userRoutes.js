import express from 'express'
import { signupUser, loginUser } from '../controllers/userAuthController.js'; 


const router=express.Router()

router.post('/userSignup',signupUser);
router.post('/userLogin', loginUser);

export default router

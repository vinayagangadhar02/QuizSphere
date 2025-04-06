import express from 'express'
import { signupAdmin, loginAdmin } from '../controllers/adminAuthController.js'


const router=express.Router()

router.post('/adminSignup',signupAdmin);
router.post('/adminLogin', loginAdmin);

export default router

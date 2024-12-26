import express from 'express'
import { authentication} from '../middlewares/authMiddleware'
import { signupUser } from '../controllers/authController'

const router=express.Router()

router.post('/signup',signupUser,authentication);

export default router

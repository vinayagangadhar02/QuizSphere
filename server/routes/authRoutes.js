import express from 'express'
import { authSignUp } from '../middlewares/authMiddleware'
const app=express()

app.get('/signup',authSignUp)

import express from 'express'
const app=express()

const authSignUp=(req,res,next)=>{
const {name,email,password}=req.body;
if (!name || !email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  next();
}
export {authSignUp}

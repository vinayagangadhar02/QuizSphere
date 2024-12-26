import bcrypt from 'bcryptjs'
import User from '../models/User';

export const signupUser=async (req,res)=>{
    const {name,email,password}=req.body;
    try{
        if(!name||!email||!password){
            return res.status(400).json({error:"All fields are required"});
        }
        const existingUser=await User.findOne({email:email});
        if(existingUser){
            return res.status(400).json({ error: 'Email is already taken' });
        }
        const hashedPassword=await bcrypt.hash(password,10);

        const newUser=new User({
            name,
            email,
            password:hashedPassword,
        })
        await newUser.save()
        return res.status(201).json({ message: 'User created successfully' });
    }
    catch(error){
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

}
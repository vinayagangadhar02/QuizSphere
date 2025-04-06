import mongoose from 'mongoose';

const adminSchema=new mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String ,required:true},
    password:{type:String,required:true},
    resetOTP: String,
    resetOTPExpires: Date,

})

const Admin=mongoose.model('admin',adminSchema);
export default Admin;
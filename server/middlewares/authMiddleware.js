
import jwt from 'jsonwebtoken';


const authentication=(req,res,next)=>{
const token=req.header('Authorization')?.split(' ')[1];
if(!token){
    return res.status(403).json({ message: 'No token, authorization denied' });
}
try{
const decoded=jwt.verify(token,123);
req.user=decoded;
next();
}
catch (error) {
    res.status(401).json({ message: 'Invalid or expired token' });
}
}
export {authentication}

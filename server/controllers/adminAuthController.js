import bcrypt from 'bcryptjs';
import  Admin from '../models/Admin.js';
import jwt from 'jsonwebtoken';


const JWT_SECRET = process.env.JWT_SECRET;

 const signupAdmin = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ error: 'Email is already taken' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({
      name,
      email,
      password: hashedPassword,
    });

    await newAdmin.save();

    const token = jwt.sign({ id: newAdmin._id }, JWT_SECRET, { expiresIn: '1h' });

    return res.status(201).json({ token, admin: { id: newAdmin._id, name, email } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

 const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
 
  try {
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
   

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: admin._id }, JWT_SECRET, { expiresIn: '1h' });

    return res.status(200).json({ token, admin: { id: admin._id, name: admin.name, email: admin.email } });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
 export {signupAdmin,loginAdmin}
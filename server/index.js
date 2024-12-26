
import express from 'express'
import cors from 'cors'
import connectDB from './config/db.js'
import signupRoutes from './routes/signupRoutes.js';

const app = express() 
connectDB();

app.use(cors());
app.use(express.json());

app.use('/api',signupRoutes);

app.listen(3000, () => {
  console.log('Server is running on port 3000')
})

import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import adminRoutes from './routes/adminRoutes.js'
import subjectRoutes from './routes/subjectRoutes.js'
import questionRoutes from './routes/questionRoutes.js'
import resultsRoutes from './routes/resultsRoutes.js';
import adminResetPassRoute from './routes/adminResetPassRoute.js'
import userResetPassRoute from './routes/userResetPassRoute.js'

const app = express();

await connectDB();

app.use(cors());
app.use(express.json());

app.use('/api', adminRoutes);
app.use('/api', userRoutes);
app.use('/api',subjectRoutes)
app.use('/api/questions', questionRoutes);
app.use('/api',resultsRoutes)
app.use('/api',adminResetPassRoute)
app.use('/api',userResetPassRoute)

const PORT =  3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

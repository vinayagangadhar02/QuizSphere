import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import adminRoutes from './routes/adminRoutes.js'
import subjectRoutes from './routes/subjectRoutes.js'
import questionRoutes from './routes/questionRoutes.js'
// import { submitQuiz } from './controllers/resultsController.js';
import adminResetPassRoute from './routes/adminResetPassRoute.js'


const app = express();

await connectDB();

app.use(cors());
app.use(express.json());

app.use('/api', adminRoutes);
app.use('/api', userRoutes);
app.use('/api',subjectRoutes)
app.use('/api/questions', questionRoutes);
// app.use('/api',submitQuiz)
app.use('/api',adminResetPassRoute)

const PORT =  3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

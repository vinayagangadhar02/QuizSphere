import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import signupRoutes from './routes/signupRoutes.js';
import subjectRoutes from './routes/subjectRoutes.js'
import questionRoutes from './routes/questionRoutes.js'
import { submitQuiz } from './controllers/resultsController.js';



const app = express();

await connectDB();

app.use(cors());
app.use(express.json());

app.use('/api', signupRoutes);
app.use('/api',subjectRoutes)
app.use('/api/questions', questionRoutes);
app.use('/api',submitQuiz)

const PORT =  3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

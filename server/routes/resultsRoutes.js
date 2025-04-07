import express from 'express';
import { submitQuiz,getQuizResults } from '../controllers/resultsController.js';
import { authentication } from '../middlewares/authMiddleware.js';
const router = express.Router();

router.post('/submit-quiz',authentication,submitQuiz)
router.get('/results',authentication,getQuizResults);

export default router
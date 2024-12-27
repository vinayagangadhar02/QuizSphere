import express from 'express';
import { addQuestion, updateQuestion, deleteQuestion, getQuestionsBySubject } from '../controllers/questionController.js';

const router = express.Router();

router.post('/add', addQuestion);
router.put('/update', updateQuestion);
router.delete('/delete', deleteQuestion);
router.get('/:subjectId', getQuestionsBySubject);

export default router;

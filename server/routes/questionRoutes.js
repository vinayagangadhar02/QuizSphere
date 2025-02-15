import express from 'express';
import { addQuestion, updateQuestion, deleteQuestion, getQuestionsBySubject,getQuestionsBySubjectForUsers } from '../controllers/questionController.js';

const router = express.Router();

router.post('/add', addQuestion);
router.put('/update', updateQuestion);
router.delete('/delete', deleteQuestion);
router.get('/:subjectId', getQuestionsBySubject);
router.get('/question/:subjectId',getQuestionsBySubjectForUsers)

export default router;

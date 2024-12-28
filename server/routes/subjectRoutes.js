import express from 'express';
import {getAllSubjects, createSubject ,getSubjectById} from '../controllers/subjectController.js';
import { authentication } from '../middlewares/authMiddleware.js';

const router = express.Router();


router.post('/subject',authentication,createSubject);


router.get('/subject',authentication,getAllSubjects);

router.get('subject/:id',authentication, getSubjectById);

export default router;

import express from 'express';
import {getAllSubjects, createSubject } from '../controllers/subjectController.js';
import { authentication } from '../middlewares/authMiddleware.js';

const router = express.Router();


router.post('/page1',authentication,createSubject);


router.get('/page1',authentication,getAllSubjects);

export default router;

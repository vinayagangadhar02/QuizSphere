
import mongoose from 'mongoose';

const quizResultSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  subjectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
  score: { type: Number, required: true }


});

export const QuizResult = mongoose.model('QuizResult', quizResultSchema);

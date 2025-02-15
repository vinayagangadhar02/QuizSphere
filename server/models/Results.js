
import mongoose from 'mongoose';

const quizResultSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  quizId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true },
  score: { type: Number, required: true },
  percentage: { type: Number, required: true },
  message: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

export const QuizResult = mongoose.model('QuizResult', quizResultSchema);

import { QuizResult } from '../models/Results.js';
import Question from '../models/Question.js';


export const calculateScore = async (subjectId, questionIds, userAnswers) => {
  try {
    const questions = await Question.find({
      _id: { $in: questionIds },
      subjectId: subjectId
    });

    const questionMap = new Map();
    questions.forEach(q => questionMap.set(q._id.toString(), q));

    let score = 0;
    for (let i = 0; i < questionIds.length; i++) {
      const question = questionMap.get(questionIds[i]);
      const correctAnswerIndex = parseInt(question.correctAnswer); 
      const correctAnswerValue = question.answers[correctAnswerIndex]; 
      const userAnswer = userAnswers[i]; 
   
      if (userAnswer === correctAnswerValue) {
        score++;
      }
    }

    return score;
  } catch (error) {
    console.error('Error calculating score:', error);
    throw error;
  }
};



export const submitQuiz = async (req, res) => {
  const { subjectId, questionIds, answers } = req.body;

  try {
    const score = await calculateScore(subjectId, questionIds, answers);
    const userId = req.user.id;

    const quizResult = await QuizResult.findOneAndUpdate(
      { userId, subjectId },             
      { score },                          
      { new: true, upsert: true }        
    );

    res.json({ success: true, score: quizResult.score });
  } catch (error) {
    console.error('Error processing quiz submission:', error);
    res.status(500).json({ message: 'Error processing quiz submission' });
  }
};


  
export const getQuizResults = async (req, res) => {
  const userId = req.user.id;
  const { subjectId } = req.query;

  try {
 
    const quizResult = await QuizResult.findOne({ userId, subjectId });

    const score = quizResult ? quizResult.score : 0;

    res.status(200).json({ success: true, score });
  } catch (error) {
    console.error('Error fetching quiz results:', error);
    res.status(500).json({ success: false, message: 'Error fetching quiz results' });
  }
};

  
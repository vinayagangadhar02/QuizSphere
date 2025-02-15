import { QuizResult } from '../models/Results.js';
import Question from '../models/Question.js';


async function calculateScore(submissionData) {
  let score = 0;

  for (const submission of submissionData) {
    const question = await Question.findById(submission.questionId);
    if (question && submission.selectedAnswer === question.correctAnswer) {
      score++;
    }
  }

  const percentage = (score / submissionData.length) * 100;
  let message = '';
  if (percentage >= 80) {
    message = 'Excellent work!';
  } else if (percentage >= 60) {
    message = 'Good job!';
  } else {
    message = 'Keep practicing!';
  }

  return { score, percentage, message };
}


export const submitQuiz = async (req, res) => {
  const { submissionData, userId, quizId } = req.body;

  try {

    const { score, percentage, message } = await calculateScore(submissionData);

    const quizResult = new QuizResult({
      userId,      
      quizId,     
      score,        
      percentage,   
      message,   
    });

    await quizResult.save();

    // Send response back to the user
    res.json({ score, percentage, message });
  } catch (error) {
    console.error('Error processing quiz submission:', error);
    res.status(500).json({ message: 'Error processing quiz submission' });
  }
};




export const getQuizResults = async (req, res) => {
    const { userId, quizId } = req.query;
  
    try {
      // Build query object dynamically based on provided filters
      const query = {};
      if (userId) query.userId = userId;
      if (quizId) query.quizId = quizId;
  
      // Fetch results from the database
      const quizResults = await QuizResult.find(query).populate('userId quizId');
  
      // Send response back to the client
      res.status(200).json({ success: true, data: quizResults });
    } catch (error) {
      console.error('Error fetching quiz results:', error);
      res.status(500).json({ success: false, message: 'Error fetching quiz results' });
    }
  };
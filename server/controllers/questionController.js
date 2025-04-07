import Question from '../models/Question.js';

export const addQuestion = async (req, res) => {
  const { subjectId, question, answers, correctAnswer } = req.body;

  try {
    const newQuestion = new Question({ subjectId, question, answers, correctAnswer });
    await newQuestion.save();
    res.status(201).json(newQuestion);
  } catch (error) {
    res.status(500).json({ message: 'Error adding question', error });
  }
};

export const updateQuestion = async (req, res) => {
  const { questionId, updatedQuestion } = req.body;

  try {
    const question = await Question.findByIdAndUpdate(questionId, updatedQuestion, { new: true });
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }
    res.status(200).json(question);
  } catch (error) {
    res.status(500).json({ message: 'Error updating question', error });
  }
};

export const deleteQuestion = async (req, res) => {
  const { questionId } = req.body;

  try {
    const question = await Question.findByIdAndDelete(questionId);
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }
    res.status(200).json({ message: 'Question deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting question', error });
  }
};

export const getQuestionsBySubject = async (req, res) => {
  const { subjectId } = req.params;

  try {
    const questions = await Question.find({ subjectId });
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching questions', error });
  }
};







function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  const result = array.slice(0, 10);
  
  return result;
}

export const getQuestionsBySubjectForUsers = async (req, res) => {
  try {
    const { subjectId } = req.params;
    const rawQuestions = await Question.find({ subjectId }).select('_id question answers');

    if (!rawQuestions || rawQuestions.length === 0) {
      return res.status(404).json({ message: 'No questions found for this subject' });
    }

    
  
    

    const questions = rawQuestions.map(q => q.toObject());
    
    res.json(shuffleArray(questions).slice(0, 10));

  } catch (error) {
    console.error('❌ Error fetching questions:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};



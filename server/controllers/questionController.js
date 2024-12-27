import Question from '../models/Question.js';

export const addQuestion = async (req, res) => {
  const { subjectId, questionText, answers, correctAnswer } = req.body;

  try {
    const newQuestion = new Question({ subjectId, questionText, answers, correctAnswer });
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

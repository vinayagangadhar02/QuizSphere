import Subject from '../models/Subject.js';


export const createSubject = async (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({ message: 'Title and description are required' });
  }

  try {
    const newSubject = new Subject({ title, description });
    await newSubject.save();
    res.status(201).json({ message: 'Subject added successfully', subject: newSubject });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error saving subject' });
  }
};

export const getAllSubjects = async (req, res) => {
    try {
      const subjects = await Subject.find();
      return res.status(200).json(subjects);

    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error fetching subjects' });
    }
  };



export const getSubjectById = async (req, res) => {
  try {
    const { subjectId } = req.params;
    console.log(subjectId)
    console.log("heloooooooooooooooooooooooooooooooooooooooooo")
    const subject = await Subject.findById(subjectId);

    if (!subject) {
      return res.status(404).json({ message: 'Subject not found' });
    }

    res.json(subject);  // Return the subject data if found
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};




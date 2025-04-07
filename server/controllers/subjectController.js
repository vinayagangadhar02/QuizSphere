import Subject from '../models/Subject.js';


export const createSubject = async (req, res) => {
  let { title, description } = req.body; 

  if (!title || !description) {
    return res.status(400).json({ message: 'Title and description are required' });
  }


  title = title.trim().toLowerCase().replace(/\b\w/g, char => char.toUpperCase());

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
    const id  = req.params.id;
    const subject = await Subject.findById(id);

    if (!subject) {
      return res.status(404).json({ message: 'Subject not found' });
    }

    res.json(subject); 
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};




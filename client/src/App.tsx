import React from 'react';
import { useParams } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../src/pages/page'
import Signup from '../../client/src/pages/signup'
import Login from '../../client/src/pages/login';
import Home1 from './pages/Admin/page1';
import QuestionForm from './components/AddQuestions';
import InstructionsPage from './pages/Users/InstructionsPage';
import QuizPage from './pages/Users/QuizPage';
import TakeQuiz from './components/SubjectCard1';


const App: React.FC = () => {
  return (
    <Router>
      
        <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/page1" element={<Home1 />} />
          <Route path="/take-quiz" element={<TakeQuiz/>}/>
          <Route path="/subpage" element={<InstructionsPage />} />
          <Route path="/instructions/:subjectId" element={<InstructionsPage />} />
          <Route path="/quiz/:subjectId" element={<QuizPageWrapper />} />
          <Route path="/add-questions/:subjectId" element={<QuestionForm />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
     
    </Router>
  );
};
const QuizPageWrapper = () => {
  const { subjectId } = useParams<{ subjectId: string }>();

  if (!subjectId) {
    // Handle the case where subjectId is undefined
    return <div>Error: Subject ID is missing</div>;
  }

  return <QuizPage subjectId={subjectId} />;
};
export default App;

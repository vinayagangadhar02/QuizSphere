import React from 'react';
import { useParams } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../src/pages/page'
import UserLogin from './pages/Users/login';
import AdminLogin from './pages/Admin/login';
import UserSignup from './pages/Users/signup';
import AdminSignup from './pages/Admin/signup';
import Home1 from './pages/Admin/page1';
import QuestionForm from './components/AddQuestions';
import InstructionsPage from './pages/Users/InstructionsPage';
import QuizPage from './pages/Users/QuizPage';
import TakeQuiz from './components/SubjectCard1';
import ConfirmPage from './pages/Users/ConfirmPage';
import ResultsPage from './pages/Users/ResultsPage';
import AdminForgotPassword from './pages/Admin/passwordReset';
import AdminSetNewPassword from './pages/Admin/adminNewPass';
import UserForgotPassword from './pages/Users/passwordReset';
import UserSetNewPassword from './pages/Users/userNewPass';


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
          <Route path="/user-signup" element={<UserSignup />} />
          <Route path="/user-login" element={<UserLogin />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin-signup" element={<AdminSignup />} />
          <Route path="/confirmpage/:subjectId" element={<ConfirmPage/>} />
          <Route path="/results" element={<ResultsPage/>} />
          <Route path="/admin-reset" element={<AdminForgotPassword/>} />
          <Route path="/admin-set-password" element={<AdminSetNewPassword />} />
          <Route path="/user-reset" element={<UserForgotPassword/>} />
          <Route path="/user-set-password" element={<UserSetNewPassword />} />


        </Routes>
     
    </Router>
  );
};
const QuizPageWrapper = () => {
  const { subjectId } = useParams<{ subjectId: string }>();

  if (!subjectId) {
    
    return <div>Error: Subject ID is missing</div>;
  }

  return <QuizPage subjectId={subjectId} />;
};
export default App;

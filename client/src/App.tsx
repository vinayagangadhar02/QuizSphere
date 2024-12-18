import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../src/pages/page'
import Signup from '../../client/src/pages/signup'
import Login from '../../client/src/pages/login';

const App: React.FC = () => {
  return (
    <Router>
      
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
     
    </Router>
  );
};

export default App;

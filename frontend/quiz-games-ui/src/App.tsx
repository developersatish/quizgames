import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './components/auth/signup';
import Dashboard from './pages/dashboard';
import Login from './components/auth/login';
import Quiz from './pages/quiz';


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={Dashboard} />
        <Route path="/login" Component={Login} />
        <Route path="/signup" Component={Signup} />
        <Route path="/quiz" Component={Quiz} />
      </Routes>
    </Router>
  );
};

export default App;

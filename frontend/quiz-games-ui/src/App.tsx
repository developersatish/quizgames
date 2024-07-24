import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './components/auth/signup';
import Dashboard from './pages/dashboard';
import Login from './components/auth/login';
import Quiz from './pages/quiz';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import './App.css'; // Import custom CSS
import LeaderBoard from './pages/leaderboard';
import QuizNavigate from './components/auth/nav';
import QuizSummery from './pages/quizsummery';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './context/LoginRoute';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <QuizNavigate />
        <Container fluid className="d-flex vh-100 container-centered">
          <Row className="m-auto">
            <Col>
              <div className="content">
                <Routes>
                  <Route path="/" element={<PrivateRoute element={<Dashboard />} />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/quiz" element={<PrivateRoute element={<Quiz />} />} />
                  <Route path="/quiz/summery" element={<PrivateRoute element={<QuizSummery />} />} />
                  <Route path="/leaderboard" element={<PrivateRoute element={<LeaderBoard />} />} />
                </Routes>
              </div>
            </Col>
          </Row>
        </Container>
      </Router>
    </AuthProvider>
  );
};

export default App;

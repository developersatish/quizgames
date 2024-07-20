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

const App = () => {


  return (
    <>
      <QuizNavigate />
      <Container fluid className="d-flex vh-100 container-centered">
        <Row className="m-auto">
          <Col>
            <div className="content">
              <Router>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/quiz" element={<Quiz />} />
                  <Route path="/leaderboard" element={<LeaderBoard />} />
                </Routes>
              </Router>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default App;

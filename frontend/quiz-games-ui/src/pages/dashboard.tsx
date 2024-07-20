import React from 'react';
import { Badge, Button, Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../services/httpService';

const Dashboard = () => {
    const navigate = useNavigate();
    const user = getUser();
    const quiz = () => {
        navigate('/quiz');
    };

    const leaderboard = () => {
        navigate('/leaderboard');
    };
    return (
        <Row>
            <Col className="mx-auto">
                <div className="border p-4 bg-light shadow rounded">
                    <h1 className='text-center'>
                        Lets play the Quiz!<br />
                        <Badge bg="success" as={Button} onClick={leaderboard} className='m-4' >
                            Leaderboard
                        </Badge>
                        <Badge bg="primary" as={Button} onClick={quiz} className='m-4' >
                            Start
                        </Badge>                        
                    </h1>
                </div>
            </Col>
        </Row>
    );
};

export default Dashboard;

import React, { useEffect, useState } from 'react';
import { Badge, Button, Col, ListGroup, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import useAuth from '../components/auth/useAuth';
import { getTopUsers, TopUsers } from '../services/questionsService';

const LeaderBoard = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [topUsers, setTopUsers] = useState<TopUsers[]>([]);
    const navigate = useNavigate();

    const startBtn = () => {
        navigate('/quiz');
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getTopUsers();
                setTopUsers(result?.users);
            } catch (error) {
                setError('Failed to fetch data.');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);


    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <Row>
            <Col className="mx-auto">
                <div className="border p-4 bg-light shadow rounded">

                    <h2 className="text-center mt-4">Top Players</h2>
                    {Array.isArray(topUsers) && topUsers.length > 0 ? (
                        <ListGroup variant="flush" className="mt-4">
                            {topUsers.map((user, index) => (
                                <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
                                    <span>{user.username}</span>
                                    <Badge bg="success">{user.score}</Badge>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    ) : (
                        <p>No top users to display.</p>
                    )}

                    <h4 className="text-center">
                        <Badge bg="secondary" as={Button} onClick={startBtn} className="m-4">
                            Lets Play !
                        </Badge>
                    </h4>
                </div>
            </Col>
        </Row>
    );
};

export default LeaderBoard;
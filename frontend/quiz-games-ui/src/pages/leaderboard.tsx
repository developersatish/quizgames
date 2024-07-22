import React, { useEffect, useState } from 'react';
import { Alert, Badge, Button, Col, ListGroup, Row, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import useAuth from '../components/auth/useAuth';
import { getTopUsers, TopUsers } from '../services/questionsService';
import { getUser } from '../services/httpService';

const LeaderBoard = () => {
    useAuth();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [topUsers, setTopUsers] = useState<TopUsers>();
    const navigate = useNavigate();

    const startBtn = () => {
        navigate('/quiz');
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const user = getUser();
                const result = await getTopUsers(+user.id);
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

                    <h2 className="text-center mt-4">Top 3 Players</h2>

                    {topUsers?.topUsers && Array.isArray(topUsers?.topUsers) && topUsers?.topUsers.length > 0 ? (
                        <Table striped bordered hover className="mt-4">
                            <thead>
                                <tr>
                                    <th>Rank</th>
                                    <th>Username</th>
                                    <th>Score</th>
                                </tr>
                            </thead>
                            <tbody>
                                {topUsers?.topUsers.map((user, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{user.username}</td>
                                        <td>
                                            <Badge bg="success">{user.score}</Badge>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    ) : (
                        <p>No top users to display.</p>
                    )}
                    {topUsers?.yourRank !== null && (
                        <Alert variant="info" className="text-center">
                            Your Position: {topUsers?.yourRank}
                        </Alert>
                    )}
                    <h5 className="text-center">
                        Let's play the Quiz!
                        <br />
                        <Badge bg="secondary" as={Button} onClick={startBtn} className="m-4">
                            Start
                        </Badge>
                    </h5>
                </div>

            </Col>
        </Row>
    );
};

export default LeaderBoard;
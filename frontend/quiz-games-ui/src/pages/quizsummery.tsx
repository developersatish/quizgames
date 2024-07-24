import { useEffect, useState } from 'react';
import { getQuestionSummery, Question } from '../services/questionsService';
import { Badge, Button, Card, Container, ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../services/httpService';

const QuizSummery = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [questionsSummery, setQuestionsSummery] = useState<Question[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const user = getUser();
                const result = await getQuestionSummery(+user.id);
                setQuestionsSummery(result);
            } catch (error) {
                setError('Failed to fetch data.');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);


    const home = () => {
        navigate('/');
    }
    const leaderboard = () => {
        navigate('/leaderboard');
    }


    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <Container>
            <h2>Your Summary</h2>
            {questionsSummery.map((question) => (
                <Card
                    key={question.QID}
                    className="mb-3"
                    bg={question.IsCorrect ? 'success' : 'danger'}
                    text="white"
                >
                    <Card.Body>
                        <Card.Title>{question.Question}</Card.Title>
                        <ListGroup variant="flush">
                            <ListGroup.Item>A: {question.A}</ListGroup.Item>
                            <ListGroup.Item>B: {question.B}</ListGroup.Item>
                            <ListGroup.Item>C: {question.C}</ListGroup.Item>
                            <ListGroup.Item>D: {question.D}</ListGroup.Item>
                        </ListGroup>
                        <Card.Text>Your Answer: {question.Answer}</Card.Text>
                    </Card.Body>
                </Card>
            ))}

            <h5 className="text-center">
                <Badge bg="primary" as={Button} onClick={leaderboard} className="m-4">
                    Go to leaderboard
                </Badge>
            </h5>
        </Container>
    );
};

export default QuizSummery;

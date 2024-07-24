import React, { useEffect, useState } from 'react';
import { getAllQuestion, Question, Score, SelectedAnswer, submitScore } from '../services/questionsService';
import { Card, Button, Form, Container, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../services/httpService';

const Quiz = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [correctAnswers, setCorrectAnswers] = useState<SelectedAnswer[]>([]);
    const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
    const [timeLeft, setTimeLeft] = useState<number>(60);
    const [timeout, setTimeoutState] = useState<boolean>(false);
    const [questionAttempted, setQuestionAttempted] = useState<number>(0);
    const [submitResult, setSubmitResult] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getAllQuestion();
                setQuestions(result);
            } catch (error) {
                setError('Failed to fetch data.');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime <= 1) {
                    clearInterval(timer);
                    setTimeoutState(true);
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);


    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedAnswer(null);
            setIsAnswerCorrect(null);
        }
    };

    const submitQuiz = async () => {
        const user = getUser();
        const score: Score = {
            id: +user.id,
            selectedAsnsers: correctAnswers
        }
        try {
            await submitScore(score);
            setTimeoutState(false);
            summery();
        } catch (error) {
            setError('Failed to fetch data.');
        }
    };

    const answerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selected = e.target.value;
        setSelectedAnswer(selected);
        setQuestionAttempted(questionAttempted + 1);
        const isCorrect = selected === questions[currentQuestionIndex].Answer;
        setIsAnswerCorrect(isCorrect);
        const ans: SelectedAnswer = {
            SelectedQid: questions[currentQuestionIndex].Answer,
            QID: questions[currentQuestionIndex].QID,
            IsCorrect: isCorrect
        }
        setCorrectAnswers([...correctAnswers, ans]);
    };
    const home = () => {
        navigate('/');
    }
    const summery = () => {
        navigate('summery');
    }
    const currentQuestion = questions[currentQuestionIndex];

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <Container className="mt-5">
            {currentQuestion && (
                <Card>
                    <Card.Body>
                        {submitResult ?
                            (<Alert variant="success"> Your Score {correctAnswers.length}/{questions.length}<Alert.Link href="#" onClick={summery}><br />Go to leaderboard</Alert.Link></Alert>)
                            : timeout ? (
                                <Alert variant="danger">Timeout! You missed it ! click to go back <Alert.Link href="#" onClick={home} >Home</Alert.Link></Alert>
                            ) : (<>
                                <Card.Title>{currentQuestion.Question}</Card.Title>
                                <Form>
                                    <Form.Check
                                        type="radio"
                                        label={currentQuestion.A}
                                        name="choices"
                                        value="A"
                                        disabled={selectedAnswer != null}
                                        checked={selectedAnswer === "A"}
                                        onChange={answerChange}
                                        style={{ backgroundColor: selectedAnswer === "A" ? (isAnswerCorrect === true ? 'lightgreen' : 'lightcoral') : '' }}
                                    />
                                    <Form.Check
                                        type="radio"
                                        label={currentQuestion.B}
                                        name="choices"
                                        value="B"
                                        disabled={selectedAnswer != null}
                                        checked={selectedAnswer === "B"}
                                        onChange={answerChange}
                                        style={{ backgroundColor: selectedAnswer === "B" ? (isAnswerCorrect === true ? 'lightgreen' : 'lightcoral') : '' }}
                                    />
                                    <Form.Check
                                        type="radio"
                                        label={currentQuestion.C}
                                        name="choices"
                                        value="C"
                                        disabled={selectedAnswer != null}
                                        checked={selectedAnswer === "C"}
                                        onChange={answerChange}
                                        style={{ backgroundColor: selectedAnswer === "C" ? (isAnswerCorrect === true ? 'lightgreen' : 'lightcoral') : '' }}
                                    />
                                    <Form.Check
                                        type="radio"
                                        label={currentQuestion.D}
                                        name="choices"
                                        value="D"
                                        disabled={selectedAnswer != null}
                                        checked={selectedAnswer === "D"}
                                        onChange={answerChange}
                                        style={{ backgroundColor: selectedAnswer === "D" ? (isAnswerCorrect === true ? 'lightgreen' : 'lightcoral') : '' }}
                                    />
                                </Form></>)}
                    </Card.Body>
                    {!timeout && !submitResult ? (<Card.Footer>
                        <Row>
                            <Col className="text-left">
                                <span>Time Left: {timeLeft}s</span>
                            </Col>
                            <Col className="text-right">
                                <Button variant="secondary" onClick={submitQuiz} hidden={questionAttempted !== questions.length}>
                                    Submit
                                </Button>

                                <Button variant="primary" hidden={questionAttempted === questions.length} onClick={handleNext} disabled={currentQuestionIndex === questions.length - 1 || selectedAnswer == null}>
                                    Next
                                </Button>
                            </Col>
                        </Row></Card.Footer>) : ''}

                </Card>
            )}
        </Container>
    );
};

export default Quiz;

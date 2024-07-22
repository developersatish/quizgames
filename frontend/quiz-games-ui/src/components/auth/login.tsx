import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { login } from '../../services/authService';
import { setAuthToken } from '../../services/httpService';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            setLoading(true);
            const values = { username, password };
            const user = await login(values);
            setAuthToken(user);
            setLoading(false);
            window.location.href = '/';
        } catch (error: any) {
            setErrMsg(error?.response?.data);
            setLoading(false);
        }
    };

    return (
        <Row className="border p-4 bg-light shadow rounded">
            <Col className="mx-auto">
                <h2 className="text-center mb-4">Login</h2>
                <Form onSubmit={handleSubmit} >
                    <Form.Group controlId="formUsername" className="mb-3">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter username"
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formPassword" className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter password"
                            required
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit" className="w-100" disabled={isLoading}>
                        Log In
                    </Button>
                </Form>
                {errMsg ? <Alert key='danger' variant='danger' className='m-2'>
                    {errMsg}
                </Alert> : ''}
            </Col>
        </Row>
    );
};

export default Login;

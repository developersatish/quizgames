import React, { useState } from 'react';
import axios from 'axios';
import { Row, Col, Button, Form, Alert } from 'react-bootstrap';
import { setAuthToken } from '../../services/httpService';
import { signup } from '../../services/authService';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            const values = { username, phone, password };
            const user = await signup(values);
            setAuthToken(user);
            setLoading(false);
            window.location.href = '/';
        } catch (error: any) {
            setErrMsg(error?.response?.data);
            setLoading(false);
        }
    };

    return (
        <Row>
            <Col className="mx-auto">
                <div className="border p-4 bg-light shadow rounded">
                    <h2 className="text-center mb-4">Sign Up</h2>
                    <Form onSubmit={handleSubmit}>
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

                        <Form.Group controlId="formPhone" className="mb-3">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control
                                type="text"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="Enter phone number"
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
                            Sign Up
                        </Button>
                    </Form>
                    {errMsg ? <Alert key='danger' variant='danger' className='m-2'>
                        {errMsg}
                    </Alert> : ''}
                </div>
            </Col>
        </Row>
    );
};

export default Signup;

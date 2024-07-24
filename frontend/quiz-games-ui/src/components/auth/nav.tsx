import { useEffect, useState } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';

const QuizNavigate = () => {
    const { loggedIn, logout } = useAuth();
    const logoutClick = () => {
        logout();
    };

    return (
        <Navbar className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href='/'>Quiz Game / Home</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Nav>
                        {!loggedIn ? (
                            <>
                                <Nav.Link href="/login">Login</Nav.Link>
                                <Nav.Link href="/signup">Signup</Nav.Link>
                            </>
                        ) : (
                            <Nav.Link onClick={logoutClick}>Logout</Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default QuizNavigate;

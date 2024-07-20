
import { useEffect, useState } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { isLoggedIn, logout } from '../../services/httpService';

const QuizNavigate = () => {
    const [loggedIn, setLoggedIn] = useState<boolean>(isLoggedIn());

    useEffect(() => {
        setLoggedIn(isLoggedIn());
    }, []);

    const logoutClick = () => {
        logout();
        setLoggedIn(false);
    };

    return (
        <Navbar className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href='/'>Quiz Game</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Nav>{!loggedIn ? (<> <Nav.Link href="/login">Login</Nav.Link>
                        <Nav.Link href="/signup">Signup</Nav.Link></>) : <Nav.Link onClick={logoutClick}>Logout</Nav.Link>}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default QuizNavigate;

import { Navbar, Container, Nav, Form, Button } from "react-bootstrap";
import { useState } from "react";
import { Link } from "react-router-dom";

export const NavBar = ({ user, onLoggedOut, onSearch, handleReset }) => {
    const [searchKeyword, setSearchKyeword] = useState('');

    const handleSearch = (event) => {
        event.preventDefault();
        console.log(searchKeyword);
        onSearch(searchKeyword);
    }

    return (
        <Navbar bg="primary" variant="dark" expand="lg" >
            <Container>
                <Navbar.Brand as={Link} to="/">
                    My Movie Base
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {!user && (
                            <>
                                <Nav.Link as={Link} to="/login">
                                    Login
                                </Nav.Link>
                                <Nav.Link as={Link} to="/signup">
                                    Signup
                                </Nav.Link>
                            </>
                        )}
                        {user && (
                            <>
                                <Nav.Link as={Link} to="/" onClick={handleReset}>
                                    Home
                                </Nav.Link>
                                <Nav.Link as={Link} to="/profile">
                                    My Profile
                                </Nav.Link>
                                <Nav.Link onClick={onLoggedOut}>Logout</Nav.Link>
                            </>
                        )}
                    </Nav>
                    <Form className="d-flex" onSubmit={handleSearch}>
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                            onChange={(e) => setSearchKyeword(e.target.value)}
                        />
                        <Button variant="light" type="submit">Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar >
    );
};

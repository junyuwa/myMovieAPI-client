import { useState } from "react";
import { Button, Form, CardGroup, Card, Container, Col, Row } from "react-bootstrap";


export const SignupView = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday
        };

        fetch("https://wjy-movies-api.herokuapp.com/users", {
            method: "POST", body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }).then((res) => {
            if (res.ok) {
                alert("Signup successful");
                window.location.reload();
            } else {
                alert("Signup failed")
            }
        })

    };

    return (
        <Container>
            <Row>
                <Col>
                    <CardGroup className="mt-4">
                        <Card>
                            <Card.Body>
                                <Card.Title>Sign up</Card.Title>
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group controlId="signupUsername">
                                        <Form.Label>Username:
                                            <Form.Control tyep="text" value={username}
                                                onChange={(e) => setUsername(e.target.value)}
                                                placeholder="Enter username"
                                                required
                                                minLength="3" />
                                        </Form.Label>
                                    </Form.Group>

                                    <Form.Group controlId="signupPassword">
                                        <Form.Label>
                                            Password:
                                            <Form.Control
                                                type="password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                required
                                                minLength="8"
                                            />
                                        </Form.Label>
                                    </Form.Group>

                                    <Form.Group controlId="signupEmail">
                                        <Form.Label>
                                            Email:
                                            <Form.Control
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                            />
                                        </Form.Label>
                                    </Form.Group>

                                    <Form.Group controlId="signupBirthday">
                                        <Form.Label>
                                            Birthday:
                                            <Form.Control
                                                type="date"
                                                value={birthday}
                                                onChange={(e) => setBirthday(e.target.value)}
                                                required
                                            />
                                        </Form.Label>
                                    </Form.Group>
                                    <Button variant="primary" type="submit" className="mb-2">
                                        Submit
                                    </Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </CardGroup>
                </Col>
            </Row>
        </Container>

    );
}

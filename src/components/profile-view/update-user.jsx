import { Button, Form, CardGroup, Card, Container, Col, Row } from "react-bootstrap";
import { useState } from "react";

export const UpdateUser = (user) => {
    // console.log("update user:", user.user.Username);


    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    const [token] = useState(storedToken ? storedToken : null);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday
        };

        fetch(`https://wjy-movies-api.herokuapp.com/users/${user.user.Username}`, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
        }).then((response) => {
            console.log(response);

            if (response.ok) {
                alert("User info updated!");
                console.log(user);
                window.location.reload();
                localStorage.clear();
            } else {
                alert("Update failed")
            }
        })
    };

    const handleDelete = () => {

        fetch(`https://wjy-movies-api.herokuapp.com/users/${user.user.Username}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        }).then((response) => {
            if (response.ok) {
                alert("Account deleted");
                localStorage.clear();
                window.location.reload();
            } else {
                alert("Deletion failed");
            }
        });
    };


    return (
        <Container>
            <Row>
                <Col>
                    <CardGroup className="my-4">
                        <Card>
                            <Card.Body>
                                <Card.Title>Update profile</Card.Title>
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group controlId="updateUsername">
                                        <Form.Label>Username:
                                            <Form.Control tyep="text"
                                                name="Username"
                                                onChange={(e) => setUsername(e.target.value)}
                                                defaultValue={user.Username}
                                                minLength="3"
                                            />
                                        </Form.Label>
                                    </Form.Group>

                                    <Form.Group controlId="updatepPassword">
                                        <Form.Label>
                                            Password:
                                            <Form.Control
                                                type="password"
                                                name="Password"
                                                onChange={(e) => setPassword(e.target.value)}
                                                defaultValue={user.Password}
                                                minLength="8"
                                            />
                                        </Form.Label>
                                    </Form.Group>

                                    <Form.Group controlId="updateEmail">
                                        <Form.Label>
                                            Email:
                                            <Form.Control
                                                type="email"
                                                name="Email"
                                                onChange={(e) => setEmail(e.target.value)}
                                                defaultValue={user.Email}
                                            />
                                        </Form.Label>
                                    </Form.Group>

                                    <Form.Group controlId="updateBirthday">
                                        <Form.Label>
                                            Birthday:
                                            <Form.Control
                                                type="date"
                                                name="Birthday"
                                                onChange={(e) => setBirthday(e.target.value)}
                                                defaultValue={user.Birthday}
                                            />
                                        </Form.Label>
                                    </Form.Group>

                                    <Button variant="primary" type="submit" className="mb-2">
                                        Update Info
                                    </Button>
                                    <Button onClick={() => handleDelete(user.Username)} variant="danger" type="submit" className="mb-2 mx-2">
                                        Delete Account
                                    </Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </CardGroup>
                </Col>
            </Row>
        </Container>
    )
};

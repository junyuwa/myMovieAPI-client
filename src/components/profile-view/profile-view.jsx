import { Button, Container, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

export const ProfielView = (storedUser) => {
    return (
        <Container>
            <Row className='justify-content-md-center'>
                <Col md={5}>
                    <div>
                        <img src={movie.image} rounded />
                    </div>
                    <div>
                        <span>Title:</span>
                        <span>{movie.title}</span>
                    </div>
                    <div>
                        <span>Description: </span>
                        <span>{movie.description}</span>
                    </div>
                    <div>
                        <span>Genre: </span>
                        <span>{movie.genre}</span>
                    </div>
                    <div>
                        <span>Director: </span>
                        <span>{movie.director}</span>
                    </div>
                    <Link to={`/`}>
                        <Button variant="primary" className="back-button">Back</Button>
                    </Link>
                </Col>
            </Row>
        </Container>)
}

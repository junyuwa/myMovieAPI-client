import PropTypes from 'prop-types';
import { Button, Container, Col, Row } from "react-bootstrap";
import Image from 'react-bootstrap/Image'
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import './movie-view.scss'

export const MovieView = ({ movies }) => {
    const movieId = useParams();
    // find the matching movie from the movies array with id in param
    const movie = movies.find((m) => m.Id === movieId)

    return (
        <Container>
            <Row className='justify-content-md-center'>
                <Col md={5}>
                    <div>
                        <Image src={movie.image} rounded />
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

MovieView.propTypes = {
    movie: PropTypes.shape({
        ImagePath: PropTypes.string.isRequired,
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        Genre: PropTypes.shape({
            Name: PropTypes.string.isRequired,
        }),
        Director: PropTypes.shape({
            Name: PropTypes.string.isRequired,
        }),
    }).isRequired
};

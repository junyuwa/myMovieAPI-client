import PropTypes from 'prop-types';
import { Button, Container, Col, Row } from "react-bootstrap";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import './movie-view.scss'

export const MovieView = ({ movies }) => {
    // console.log(movies);
    const { movieId } = useParams();
    console.log(movieId);
    // find the matching movie from the movies array with id in param
    const movie = movies.find((m) => m.id === movieId)
    console.log(movie)

    return (
        <Container>
            <Row className='justify-content-md-center'>
                <Col md={5}>
                    <Row>
                        <img src={movie.image} />
                    </Row>
                    <Row>
                        <h4>Title:</h4>
                        <span>{movie.title}</span>
                    </Row>
                    <Row>
                        <h4>Description: </h4>
                        <span>{movie.description}</span>
                    </Row>
                    <Row>
                        <h4>Genre: </h4>
                        <span>{movie.genre}</span>
                    </Row>
                    <Row>
                        <h4>Director: </h4>
                        <span>{movie.director}</span>
                    </Row>
                    <Link to={`/`}>
                        <Button variant="primary" className="back-button">Back</Button>
                    </Link>
                </Col>
            </Row>
        </Container >)
}

MovieView.propTypes = {
    movies: PropTypes.arrayOf(PropTypes.shape({
        image: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        genre: PropTypes.string.isRequired,
        director: PropTypes.string.isRequired
    })).isRequired
};

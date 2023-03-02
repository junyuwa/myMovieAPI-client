import PropTypes from 'prop-types';
import { Button, Card } from "react-bootstrap";
import './movie-card.scss';

export const MovieCard = ({ movie, onMovieClick }) => {
    return (
        <Card className="h-100">
            <Card.Img variant="top" src={movie.image} onClick={() => onMovieClick(movie)} />
            <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>{movie.description}</Card.Text>
                <Button onClick={() => onMovieClick(movie)} variant="link">
                    View Deatils
                </Button>
            </Card.Body>
        </Card>
    );
};

MovieCard.propTypes = {
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
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
};

import PropTypes from 'prop-types';
import { useState } from 'react';
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import './movie-card.scss';

export const MovieCard = ({ movie, onFavChange }) => {
    // console.log("card movie here", `${movie.id}`)

    const storedToken = localStorage.getItem("token");
    const storedUser = JSON.parse(localStorage.getItem('user'));

    const addFavorite = () => {
        fetch(`https://wjy-movies-api.herokuapp.com/users/${storedUser.Username}/movies/${movie.id}`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${storedToken}`,
                "Content-Type": "application/json",
            }
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data.Favmovies)
                onFavChange(data);
                alert(`Added ${movie.title} to favorites`);
                window.location.reload();
            })
            .catch(err => console.error(err));
    };


    const removeFavorite = () => {
        fetch(`https://wjy-movies-api.herokuapp.com/users/${storedUser.Username}/${movie.id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${storedToken}`,
                "Content-Type": "application/json",
            }
        })
            .then(res => res.json())
            .then(data => {
                onFavChange(data);
                alert(`Removed ${movie.title} from favorites`);
                window.location.reload();
            })
            .catch(err => console.error(err));
    };

    const isFav = storedUser.Favmovies.find(
        (mid) => mid === movie.id
    );


    return (
        <Card className="h-100">
            <Card.Img variant="top" src={movie.image} />
            <Card.Body className="d-flex flex-column">
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>{movie.description}</Card.Text>
                <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
                    <Button variant="primary">
                        View Deatils
                    </Button>
                </Link>
                <>
                    {isFav ? (
                        <Button variant="warning" className='my-2' onClick={removeFavorite}>
                            Remove from Favorite
                        </Button>
                    ) : (
                        <Button variant="warning" className='my-2' onClick={addFavorite}>
                            Add to Favorite
                        </Button>
                    )}
                </>
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
};

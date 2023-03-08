import PropTypes from 'prop-types';
import { useState } from 'react';
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import './movie-card.scss';

export const MovieCard = ({ movie, user }) => {
    // console.log("card movie here", `${movie.id}`)
    const isFav = user.Favmovies.find((m) => m.id == movie.id)

    // console.log("in movie card:", movie, user)
    const [userFavMovies, setUserFavMovies] = useState([]);
    const storedToken = localStorage.getItem("token");

    const addFavorite = () => {
        fetch(`https://wjy-movies-api.herokuapp.com/users/${user.Username}/movies/${movie.id}`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${storedToken}`,
                "Content-Type": "application/json",
            }
        })
            .then((res) => { res.json() })
            .then((data) => {
                console.log(data);
                const favMovies = data.Favmovies
            })

        setUserFavMovies(favMovies);
        console.log(userFavMovies);
    }

    const removeFavorite = () => {
        fetch(`https://wjy-movies-api.herokuapp.com/users/${user.Username}/${movie.id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${storedToken}`,
                "Content-Type": "application/json",
            }
        }).then(res => {
            const updatedFavUser = res.json();
            setUserFavMovies(updatedFavUser.Favmovies);
            console.log(userFavMovies);
        })
    }

    return (
        <Card className="h-100">
            <Card.Img variant="top" src={movie.image} />
            <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>{movie.description}</Card.Text>
                <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
                    <Button variant="primary">
                        View Deatils
                    </Button>
                </Link>
                <>
                    {isFav ? (
                        <Button variant="warning" className='mx-2' onClick={removeFavorite()}>
                            Remove from Favorite
                        </Button>
                    ) : (
                        <Button variant="warning" className='mx-2' onClick={addFavorite()}>
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

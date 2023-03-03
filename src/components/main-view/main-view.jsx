import { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';

export const MainView = () => {
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);

    // check if a suer is logged in, if not return login view
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [user, setUser] = useState(storedUser ? storedUser : null);
    const [token, setToken] = useState(storedToken ? storedToken : null);


    useEffect(() => {
        if (!token) return;

        fetch("https://wjy-movies-api.herokuapp.com/movies", { headers: { Authorization: `Bearer ${token}` } })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                const movieResults = data.map((movie) => {
                    return {
                        id: movie._id,
                        image: movie.ImagePath,
                        title: movie.Title,
                        description: movie.Description,
                        genre: movie.Genre.Name,
                        director: movie.Director.Name
                    }
                })

                setMovies(movieResults);
            })
    }, [token]);


    return (
        <Row className="justify-content-md-center">
            {!user ? (
                <Col md={5}>
                    <LoginView onLoggedIn={(user, token) => { setUser(user); setToken(token) }} />
                    or
                    <SignupView />
                </Col>
            ) : selectedMovie ? (
                <Col md={8}>
                    <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
                </Col>
            ) : movies.length == 0 ? (
                <div>List is empty</div>
            ) : (
                <Row>

                    {movies.map((movie) => (
                        <Col key={movie.id} md={3} className="mb-5">
                            <MovieCard movie={movie} onMovieClick={(newSelectedMovie) => {
                                setSelectedMovie(newSelectedMovie);
                            }} />
                        </Col>
                    )
                    )}

                    <button onClick={() => { setUser(null); setToken(null); localStorage.clear() }}>Logout</button>
                </Row>)}
        </Row>
    );
};

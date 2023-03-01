import { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";

export const MainView = () => {
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);

    // check if a suer is logged in, if not return login view
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    if (!user) {
        return (
            <>
                <LoginView onLoggedIn={(user, token) => { setUser(user); setToken(token) }} />

                <SignupView />
            </>
        );
    }

    useEffect(() => {
        if (!token) return;

        fetch("https://wjy-movies-api.herokuapp.com/movies", { headers: { Authorization: `Bearer ${token}` } })
            .then((res) => res.json())
            .then((data) => {
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


    if (selectedMovie) {
        return <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />;
    }

    if (movies.length == 0) {
        return <div>List is empty</div>
    };

    return (
        <div>
            <div>
                {movies.map((movie) => (
                    <MovieCard key={movie.title} movie={movie} onMovieClick={(newSelectedMovie) => {
                        setSelectedMovie(newSelectedMovie);
                    }} />
                )
                )}
            </div>
            <button onClick={() => { setUser(null); setToken(null); localStorage.clear() }}>Logout</button>
        </div>
    );
};

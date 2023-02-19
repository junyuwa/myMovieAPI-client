import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
    const [movies, setMovies] = useState([
        {
            id: 1,
            title: "Cloud Atlas",
            image: "https://m.media-amazon.com/images/M/MV5BMTczMTgxMjc4NF5BMl5BanBnXkFtZTcwNjM5MTA2OA@@._V1_FMjpg_UX1000_.jpg",
            description: "An exploration of how the actions of individual lives impact one another in the past, present and future, as one soul is shaped from a killer into a hero, and an act of kindness ripples across centuries to inspire a revolution.",
            genre: "sci-fi",
            director: "Tom Tykwer"

        },
        {
            id: 2,
            title: "Rocky Horror Picture Show",
            image: "https://m.media-amazon.com/images/M/MV5BOGIzYjM3YzMtMjk5ZS00NDY2LTllMjEtNjYwZjhmMDNhMDBkXkEyXkFqcGdeQXVyODUzMjQxMTA@._V1_.jpg",
            description: "A newly-engaged couple have a breakdown in an isolated area and must seek shelter at the bizarre residence of Dr. Frank-n-Furter.",
            genre: "horror",
            director: "Jim Sharman"
        },
        {
            id: 3,
            title: "Lust Caution",
            image: "https://m.media-amazon.com/images/M/MV5BMTg2MGJjYmQtY2RjNy00NjczLWJlNDYtOWIzOGE2NGRjN2RhXkEyXkFqcGdeQXVyNjc3MjQzNTI@._V1_.jpg",
            description: "During World War II era, a young woman, Wang Jiazhi, gets swept up in a dangerous game of emotional intrigue with a powerful political figure, Mr. Yee.",
            genre: "romance",
            director: "Ang Lee"
        }
    ]);

    const [selectedMovie, setSelectedMovie] = useState(null)

    if (selectedMovie) {
        return <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />;
    }

    if (movies.length == 0) {
        return <div>List is empty</div>
    };

    return (
        <div>
            {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} onMovieClick={(newSelectedMovie) => {
                    setSelectedMovie(newSelectedMovie);
                }} />
            )
            )}
        </div>
    );
};

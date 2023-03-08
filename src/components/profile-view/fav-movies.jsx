import { MovieCard } from "../movie-card/movie-card"

export const FavMovies = (favMovieList) => {
    return (
        <>
            <h2>My Favorite Movies</h2>
            {favMovieList.length == 0 ?
                <p>No favorite movies</p> :
                favMovieList.map((m) => {
                    return (
                        <MovieCard movie={m} />
                    )
                })}
        </>
    )
}

import { MovieCard } from "../movie-card/movie-card"
import { Button, Container, Col, Row } from "react-bootstrap";

export const FavMovies = ({ favMovieId, movies, onFavChange }) => {
    console.log("fav here", favMovieId);
    const favMovieList = movies.filter(m => favMovieId.includes(m.id));

    return (
        <Container>
            <Row>
                <Col xs={12}>
                    <h2>My Favorite Movies</h2>
                </Col>
            </Row>

            <Row>
                {favMovieList.length == 0 ? (
                    <p>No favorite movies</p>)
                    : (
                        <Row>
                            {favMovieList.map((movie) => (
                                <Col className="mb-4 mt-4 mx-2" key={movie.id} md={6} lg={3} xs={12}>
                                    <MovieCard movie={movie} onFavChange={onFavChange} />
                                </Col>
                            ))}
                        </Row>
                    )}
            </Row>
        </Container>
    )
}

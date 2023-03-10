import { UserInfo } from "./user-info";
import { UpdateUser } from "./update-user";
import { FavMovies } from "./fav-movies";
import { Button, Container, Col, Row, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export const ProfileView = ({ movies, onFavChange }) => {
    console.log("profile view movies", movies)

    const storedToken = localStorage.getItem("token");
    const storedUser = JSON.parse(localStorage.getItem('user'));
    console.log(storedUser.Favmovies);


    const favMovieId = storedUser.Favmovies;


    return (
        <Container>
            <Row className='justify-content-md-center mt-4' >
                <Card>
                    <Card.Body>
                        <Col xs={12} sm={4}>
                            <UserInfo name={storedUser.Username} email={storedUser.Email} birthday={storedUser.Birthday} />
                        </Col>
                    </Card.Body>
                </Card>

                <Col xs={12} sm={8}>
                    <UpdateUser user={storedUser} />
                </Col>
            </Row>
            <Row>
                <FavMovies favMovieId={favMovieId} movies={movies} onFavChange={onFavChange} />
            </Row>
            <Link to={`/`}>
                <Button variant="primary" className="back-button mt-2">Back</Button>
            </Link>
        </Container>)
}

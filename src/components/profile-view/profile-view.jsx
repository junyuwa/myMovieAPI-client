import { UserInfo } from "./user-info";
import { UpdateUser } from "./update-user";
import { FavMovies } from "./fav-movies";
import { Button, Container, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export const ProfileView = ({ movies }) => {
    console.log("profile view movies", movies)

    const storedToken = localStorage.getItem("token");
    const storedUser = JSON.parse(localStorage.getItem('user'));

    const favMovieList = movies.filter(m => storedUser.Favmovies.includes(m._id))


    return (
        <Container>
            <Row className='justify-content-md-center mt-4' >
                <Col>
                    <UserInfo name={storedUser.Username} email={storedUser.Email} birthday={storedUser.Birthday} />
                </Col>
                <Col>
                    <UpdateUser user={storedUser} />
                </Col>
            </Row>
            <Row>
                <FavMovies favMovieList={favMovieList} />
            </Row>
            <Link to={`/`}>
                <Button variant="primary" className="back-button mt-2">Back</Button>
            </Link>
        </Container>)
}

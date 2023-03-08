import { UserInfo } from "./user-info";
import { UpdateUser } from "./update-user";
import { FavMovies } from "./fav-movies";
import { Button, Container, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export const ProfielView = ({ user, movies }) => {
    // console.log(user);
    // console.log(user.Username);

    const storedToken = localStorage.getItem("token");
    const [token] = useState(storedToken ? storedToken : null);

    // const favMovieList = movies.filter(m => user.Favmovies.includes(m._id))

    return (
        <Container>
            <Row className='justify-content-md-center mt-4' >
                <Col>
                    <UserInfo name={user.Username} email={user.Email} birthday={user.Birthday} />
                </Col>
                <Col>
                    <UpdateUser user={user} />
                </Col>
            </Row>
            <Link to={`/`}>
                <Button variant="primary" className="back-button mt-2">Back</Button>
            </Link>
        </Container>)
}

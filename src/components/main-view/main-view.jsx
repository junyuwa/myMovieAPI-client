import { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavBar } from "../nav-bar/nav-bar";
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ProfileView } from "../profile-view/profile-view";

export const MainView = () => {
    const [movies, setMovies] = useState([]);

    // check if a suer is logged in, if not return login view
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");

    // for persisting login session of a user
    const [user, setUser] = useState(storedUser ? storedUser : null);
    const [token, setToken] = useState(storedToken ? storedToken : null);

    const [searchList, setSearchList] = useState('movies');
    const [isFiltered, setIsFiltered] = useState(false);


    useEffect(() => {
        if (!token) return;

        fetch("https://wjy-movies-api.herokuapp.com/movies", { headers: { Authorization: `Bearer ${token}` } })
            .then((res) => res.json())
            .then((data) => {
                // console.log(data);
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

    const onSearch = (keyword) => {
        let key = keyword.toLowerCase();
        const filtered = movies.filter(item => item.title.toLowerCase().includes(key));
        console.log(filtered);
        setSearchList(filtered);
        setIsFiltered(true);
    }

    useEffect(() => {
        setSearchList(movies);
    }, [movies, user])

    const logOut = () => {
        setUser(null);
        setToken(null);
        localStorage.clear();
    }
    const onFavChange = (u) => {
        setUser(u);
        localStorage.setItem("user", JSON.stringify(u))
    }
    const handleReset = () => {
        setFilteredList(movies);
        setIsFiltered(false);
    };


    return (
        <BrowserRouter>
            <NavBar user={user} onLoggedOut={logOut} onSearch={onSearch} handleReset={handleReset} />
            <Row className="justify-content-md-center">
                <Routes>
                    <Route
                        path="/signup"
                        element={
                            <>
                                {user ? (
                                    <Navigate to="/" />
                                ) : (
                                    <Col md={5}>
                                        <SignupView />
                                    </Col>
                                )}
                            </>

                        }
                    />
                    <Route
                        path="/login"
                        element={
                            <>
                                {user ? (
                                    <Navigate to="/" />
                                ) : (
                                    <Col md={5}>
                                        <LoginView onLoggedIn={(user, token) => { setUser(user); setToken(token) }} />
                                    </Col>
                                )}
                            </>

                        }
                    />
                    <Route
                        path="/movies/:movieId"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ) : movies.length === 0 ? (
                                    <Col>The list is empty!</Col>
                                ) : (
                                    <Col md={8}>
                                        <MovieView movies={movies} />
                                    </Col>
                                )}
                            </>
                        }
                    />
                    <Route
                        path="/profile"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ) : (
                                    <Col md={8}>
                                        <ProfileView movies={movies} onFavChange={onFavChange} />
                                    </Col>
                                )}
                            </>
                        }
                    />
                    <Route
                        path="/"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ) : movies.length === 0 ? (
                                    <Col>The list is empty!</Col>
                                ) : (
                                    <>
                                        {searchList.map((movie) => (
                                            <Col className="mb-4 mt-4 mx-2" key={movie.id} md={3}>
                                                <MovieCard movie={movie} onFavChange={onFavChange} />
                                            </Col>
                                        ))}
                                    </>
                                )
                                }
                            </>
                        }
                    />
                </Routes>
            </Row>
        </BrowserRouter>
    );
};

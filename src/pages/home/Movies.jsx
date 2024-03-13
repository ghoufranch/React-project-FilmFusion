import React from "react";
import Filters from "./filter/Filters";
import { useSelector, useDispatch } from "react-redux";
import {
  allMovies,
  allMoviesError,
  allMoviesLoading,
} from "../../store/moviesSlice";
import { useEffect } from "react";
import Pagination from "./Pagination";
import { Link } from "react-router-dom";
import Spinner from "../../components/Spinner";
import logo from "./logo-no-background.png";
import "./movies.css";

const Movies = () => {
  const { movies } = useSelector((state) => state.movies);
  /*
  const error = useSelector(allMoviesError)
  const loading  = useSelector(allMoviesLoading)

  const dispatch = useDispatch()



  console.log(movies)
  */

  return (
    <>
      <div className="m-3 d-flex  justify-content-between align-items-center gap-5 ">
        <Link to="#" className="logo-link">
          <img
            src={logo}
            alt="logo"
            className="logo img-fluid"
            style={{
              width: "220px",
              height: "auto",
              marginTop: "10px",
              marginBottom: "10px",
            }}
          />
        </Link>
        <Link to="/login" className="admin-login-link">
          Log in as an admin
        </Link>
      </div>

      <div className="d-flex justify-content-center gap-5 m-2 home-container">
        <Filters />

        <div>{movies ? <Pagination movies={movies} /> : <Spinner />}</div>
      </div>
    </>
  );
};

export default Movies;

import React from "react";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./specificMovie.css";
import { useSelector } from "react-redux";
import logo from "../home/logo-no-background.png";

const SpecificMovie = () => {
  const { movies } = useSelector((state) => state.movies);

  const [movie, setmovie] = useState({});

  const { id } = useParams();

  useEffect(() => {
    const mv = movies.find((m) => m.id == id);

    setmovie(mv);
    /*
    const getMovie = async () =>{
      const {data}  = await axios.get(`http://localhost:5000/movies/${id}`)
      setmovie(data)
    }
    getMovie()
     */
  }, [id]);

  let img;
  if (movie?.Image?.includes("http")) {
    img = movie?.Image;
  } else {
    img = `/images/${movie?.Image}`;
  }

  return (
    <>
      <div className="navbar">
        <div className="logo-container">
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
        </div>
        <div className="link-container">
          <a href="/" className="go-back-link">
            Go back
          </a>
        </div>
      </div>  

      <div className="movie-info">
        <h1 className="movie-title">{movie?.Title}</h1>
        <img
          className="movie-poster"
          src={img}
          alt="The Shawshank Redemption Poster"
        />

        <div className="movie-rating">{movie?.Rating}</div>
        <div className="movie-details">
          <div className="movie-detail-label">Duration:</div>
          <div className="movie-detail-value">{movie?.Duration}</div>
          <div className="movie-detail-label">Release Date:</div>
          <div className="movie-detail-value">{movie?.ReleaseDate}</div>
          <div className="movie-detail-label">Country:</div>
          <div className="movie-detail-value">{movie?.Country}</div>
        </div>
        <div className="movie-synopsis">{movie?.Synopsis}</div>
      </div>
    </>
  );
};

export default SpecificMovie;

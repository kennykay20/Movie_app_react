// import { useState } from "react";
import styles from "../modules/moviecard.module.css";
import { useMovieContext } from "../contexts/MovieContext";
export default function MovieCard({ movie }) {
  const { isFavorites, addToFavorites, removeFromFavorites } =
    useMovieContext();

  const favorite = isFavorites(movie.id);

  function handleFavouriteClick(e) {
    e.preventDefault();
    if (favorite) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  }
  return (
    <div className={styles.row}>
      <div className={styles.movieCardColumn}>
        <div className={styles.moviePoster}>
          <img
            className={styles.movieImage}
            src={`http://localhost:5173/${movie.image}`}
            alt={movie.title}
          />
          <div className={styles.movieOverlay}>
            <button
              className={styles.favoriteBtn}
              onClick={(e) => handleFavouriteClick(e)}
            >
              {favorite ? "❤️" : "🤍"}
            </button>
          </div>
        </div>
        <div className={styles.movieInfo}>
          <h3>{movie.title}</h3>
          <p>{movie.releaseDate?.split("-")[0]}</p>
        </div>
      </div>
    </div>
  );
}

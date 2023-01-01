import MovieCard from "../components/MovieCard";
import { useMovieContext } from "../contexts/MovieContext";
import styles from "../modules/favorite.module.css";

export default function Favorites() {
  const { favorites } = useMovieContext();

  const isFavorites = favorites.length > 0 ? true : false;

  return (
    <div>
      {isFavorites && (
        <div className={styles.favorites}>
          <h2 className={styles.header}> Your Favorites</h2>
          <div className={styles.moviesGrid}>
            {favorites.map((movie) => {
              return <MovieCard key={movie.id} movie={movie} />;
            })}
          </div>
        </div>
      )}

      {!isFavorites && (
        <div className={styles.favoriteEmpty}>
          <h2 className={styles.header}>No favorite Movie(s) yet</h2>
          <p className={styles.title}>
            Start adding movie(s) to your favorites and they will appear here!
          </p>
        </div>
      )}
    </div>
  );
}

import { useEffect, useState } from "react";
import styles from "../modules/home.module.css";
import { useNavigate } from "react-router-dom";
//import { fetchWithAuth } from "../services/apis";
import MovieCard from "../components/MovieCard";
import { useApiContext } from "../contexts/ApiContext";

export default function Home({
  accessToken,
  setAccessToken,
  showLogin,
  setShowLogin,
  error,
  setError,
  isLoading,
  setIsLoading,
  setErrorType,
  errorType
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  let navigate = useNavigate();
  const { searchMovies, getPopularMovies } = useApiContext();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    if (isLoading) return;

    setIsLoading(true);
    alert("search");
    try {
      // const searchMovie = movies.filter((movie) => {
      //   return movie.title.trim().toLowerCase() === searchQuery;
      // });
      const searchMovie = await searchMovies(searchQuery);
      console.log(searchMovie);
      setMovies(searchMovie);
      setError("");
    } catch (error) {
      setError(`Failed to search movies... ${error.message}`);
    } finally {
      setIsLoading(false);
    }

    //setSearchQuery("");
  };

  useEffect(() => {
    showLogin ? navigate("/login") : "";
    const fetchPopularMovies = async () => {
      const localAccessToken = localStorage.getItem("AccessToken");
      try {
        if (localAccessToken) {
          setAccessToken(localAccessToken);
          showLogin ? setShowLogin(!showLogin) : "";
        } else {
          navigate("/login");
        }
        if (accessToken) {
          const result = await getPopularMovies();
          setMovies(result);
        }
      } catch (error) {
        if (errorType !== "token") {
          setErrorType("");
          setError(`Failed to load movies... - ${error.message}`);
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchPopularMovies();
  }, []);

  return (
    <div>
      <form onSubmit={(e) => handleSearch(e)} className={styles.searchForm}>
        <div className="flex">
          <input
            type="text"
            placeholder="Search for movies..."
            className={styles.searchInput}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className={styles.searchButton}>
            Search
          </button>
        </div>
      </form>

      {error && <div className={styles.errorMessage}>{error}</div>}

      {isLoading ? (
        <div className={styles.isLoading}>Loading...</div>
      ) : (
        <div className={styles.moviesGrid}>
          {movies.map((movie) => {
            return (
              // movie.title.toLowerCase().startsWith(searchQuery) && (
              //   <MovieCard key={movie.id} movie={movie} />
              // )
              <MovieCard key={movie.id} movie={movie} />
            );
          })}
        </div>
      )}
    </div>
  );
}

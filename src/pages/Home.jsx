import { useEffect, useState } from "react";
import styles from "../modules/home.module.css";
import { useNavigate } from "react-router-dom";
//import { fetchWithAuth } from "../services/apis";
import MovieCard from "../components/MovieCard";
import { useApiContext } from "../contexts/ApiContext";

export default function Home({
  accessToken,
  setAccessToken,
  refreshToken,
  movieResult,
  movies,
  setMovies,
  showLogin,
  setShowLogin,
  error,
  setError,
  isLoading,
  setIsLoading,
  setErrorType,
  errorType
}) {
  const url = `Users/list`;
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  let navigate = useNavigate();
  const { fetchWithAuth } = useApiContext();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    if (isLoading) return;

    setIsLoading(true);

    try {
      const searchMovie = movies.filter((movie) => {
        return movie.title.trim().toLowerCase() === searchQuery;
      });
      setData(searchMovie);
      setMovies(searchMovie);
      setError("");
    } catch (error) {
      setError(`Failed to search movies... ${error.message}`);
    } finally {
      setIsLoading(false);
    }

    setSearchQuery("");
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const localAccessToken = localStorage.getItem("AccessToken");
      try {
        if (localAccessToken) {
          setAccessToken(localAccessToken);
          showLogin ? setShowLogin(!showLogin) : "";
        } else {
          navigate("/login");
        }
        if (accessToken) {
          const resp = await fetchWithAuth(url, accessToken, refreshToken);
          if (!resp.success) {
            setError("Network response was not ok");
          } else {
            setMovies([...movieResult]);
            setData([...resp.data]);
            setError("");
          }
        }
      } catch (error) {
        if (errorType !== "token") {
          setErrorType("");
          setError(`Failed to fetch data - ${error.message}`);
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsers();
    showLogin ? navigate("/login") : "";
  }, []);

  useEffect(() => {
    console.log("updated datas: ", data);
  }, [data]);

  return (
    <div>
      <form onSubmit={(e) => handleSearch(e)} className={styles.searchForm}>
        <input
          type="text"
          placeholder="Search for movies..."
          className={styles.searchInput}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value.trim().toLowerCase())}
        />
        <button type="submit" className={styles.searchButton}>
          Search
        </button>
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

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MovieCard from "./components/MovieCard";
import { useState } from "react";
import "./styles/app.css";
import RegisterForm from "./components/RegisterForm";
import Favorites from "./pages/Favorites";
import Home from "./pages/Home";
import { MovieProvider } from "./contexts/MovieContext";
import { ApiProvider } from "./contexts/ApiContext";
import LoginForm from "./components/LoginForm";
import Navbar from "./pages/Navbar";

const movieResult = [
  {
    id: 1,
    image: "/Aladdin.jpeg",
    title: "Aladdin",
    url: "",
    releaseDate: "1998-01-02"
  },
  {
    id: 2,
    image: "/batman.png",
    title: "Batman",
    url: "",
    releaseDate: "1998-02-02"
  },
  {
    id: 3,
    image: "/beauty-and-the-beast.jpg",
    title: "Beauty and the Beast",
    url: "",
    releaseDate: "2000-01-02"
  },
  {
    id: 4,
    image: "/black-panther.jpg",
    title: "Black Panther",
    url: "",
    releaseDate: "2001-01-02"
  },
  {
    id: 5,
    image: "/bonnie.jpeg",
    title: "Bonnie",
    url: "",
    releaseDate: "1998-01-02"
  },
  {
    id: 6,
    image: "/spider-man.jpg",
    title: "Spider Man",
    url: "",
    releaseDate: "1998-01-08"
  },
  {
    id: 7,
    image: "/the-game.jpg",
    title: "The Game",
    url: "",
    releaseDate: "1999-01-02"
  },
  {
    id: 8,
    image: "/wendy.jpeg",
    title: "Wendy",
    url: "",
    releaseDate: "1999-01-02"
  }
];

function App() {
  const [movies, setMovies] = useState([]);
  const [showLogin, setShowLogin] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const [error, setError] = useState("");
  const [errorType, setErrorType] = useState("login");
  const [isLoading, setIsLoading] = useState(true);
  const [isValue, setIsValue] = useState(true);

  // useEffect(() => {
  //   async function handleMovieDisplay() {
  //     setMovies([...movies, movieResult]);
  //   }
  //   handleMovieDisplay();
  // }, []);

  const baseUrl = `http://localhost:5284/api/v1`;

  return (
    <div className="h-screen flex flex-col">
      <Router>
        <MovieProvider>
          <ApiProvider
            setShowLogin={setShowLogin}
            setError={setError}
            setIsSuccess={setIsSuccess}
            setErrorType={setErrorType}
            errorType={errorType}
            baseUrl={baseUrl}
          >
            <Navbar
              showLogin={showLogin}
              setShowLogin={setShowLogin}
              isSuccess={isSuccess}
              setIsSuccess={setIsSuccess}
              setAccessToken={setAccessToken}
              setRefreshToken={setRefreshToken}
              isValue={isValue}
              setIsValue={setIsValue}
            />
            <main className="mainContent">
              <Routes>
                <Route
                  path="/"
                  element={
                    <LoginForm
                      baseUrl={baseUrl}
                      isSuccess={isSuccess}
                      setIsSuccess={setIsSuccess}
                      accessToken={accessToken}
                      setAccessToken={setAccessToken}
                      refreshToken={refreshToken}
                      setRefreshToken={setRefreshToken}
                      error={error}
                      setError={setError}
                      isValue={isValue}
                      setIsValue={setIsValue}
                      showLogin={showLogin}
                      setShowLogin={setShowLogin}
                      setErrorType={setErrorType}
                      errorType={errorType}
                    />
                  }
                />
                <Route
                  path="/login"
                  element={
                    <LoginForm
                      baseUrl={baseUrl}
                      isSuccess={isSuccess}
                      setIsSuccess={setIsSuccess}
                      accessToken={accessToken}
                      setAccessToken={setAccessToken}
                      refreshToken={refreshToken}
                      setRefreshToken={setRefreshToken}
                      error={error}
                      setError={setError}
                      isValue={isValue}
                      setIsValue={setIsValue}
                      showLogin={showLogin}
                      setShowLogin={setShowLogin}
                      setErrorType={setErrorType}
                      errorType={errorType}
                    />
                  }
                />
                <Route
                  path="/home"
                  element={
                    <Home
                      movies={movies}
                      setMovies={setMovies}
                      movieResult={movieResult}
                      accessToken={accessToken}
                      setAccessToken={setAccessToken}
                      refreshToken={refreshToken}
                      showLogin={showLogin}
                      setShowLogin={setShowLogin}
                      error={error}
                      setError={setError}
                      isLoading={isLoading}
                      setIsLoading={setIsLoading}
                      setErrorType={setErrorType}
                      errorType={errorType}
                    />
                  }
                />
                <Route
                  path="/register"
                  element={
                    <RegisterForm
                      baseUrl={baseUrl}
                      isSuccess={isSuccess}
                      setIsSuccess={setIsSuccess}
                      accessToken={accessToken}
                      setAccessToken={setAccessToken}
                      refreshToken={refreshToken}
                      setRefreshToken={setRefreshToken}
                      error={error}
                      setError={setError}
                      isValue={isValue}
                      setIsValue={setIsValue}
                      showLogin={showLogin}
                      setShowLogin={setShowLogin}
                    />
                  }
                />
                <Route path="/movie" element={<MovieCard />} />
                <Route path="/favorites" element={<Favorites />} />
              </Routes>
            </main>
          </ApiProvider>
        </MovieProvider>
      </Router>
    </div>
  );
}

export default App;

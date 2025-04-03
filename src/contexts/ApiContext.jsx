import { createContext, useContext } from "react";

const ApiContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useApiContext = () => useContext(ApiContext);

export const ApiProvider = ({
  children,
  setShowLogin,
  setError,
  setIsSuccess,
  setErrorType
}) => {
  const url2 = `http://localhost:5283/api/v1/authentication/access-token`;
  const BASE_URL = "http://localhost:5283/api/v1";
  const MovieBASE_URL = "https://api.themoviedb.org/3";
  const MovieAPI_KEY = "113cb52d2b0979318e3b159c6c723fdd";

  const fetchWithAuth = async (
    endpoint,
    token,
    refreshTokenVal,
    methodVal,
    options = {}
  ) => {
    try {
      const response = await fetch(`${BASE_URL}/${endpoint}`, {
        method: methodVal,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });
      if (!response.ok || response.status === 401) {
        const result = await getNewAccessToken(refreshTokenVal);
        console.log(result, "newToken ");
        if (result.success) {
          // Retry the request with the new token
          return fetchWithAuth(
            endpoint,
            result.accessToken,
            refreshTokenVal,
            options
          );
        } else {
          // set showLogin back to true to display the login page and
          // navbar changes to register and log user out
          setShowLogin(true);
          setIsSuccess(false);
          setErrorType("token");
          setError("Session expired, Please login again");
          throw new Error("Session expired, Please login again");
        }
      }
      return response.ok ? await response.json() : null;
    } catch (error) {
      console.log("Error fetching data: ", error.message);
      return null;
    }
  };

  const fetchWithoutAuth = async (endpoint, methodVal, options = {}) => {
    try {
      const response = await fetch(`${BASE_URL}/${endpoint}`, {
        method: methodVal,
        headers: {
          "Content-Type": "application/json"
        },
        ...options
      });
      if (!response.ok) {
        setError("Error fetching data");
        throw new Error("Error fetching data");
      }
      return response.ok ? await response.json() : null;
    } catch (error) {
      setError(`Error fetching data: ${error.message}`);
      throw new Error(`Error fetching data: ${error.message}`);
    }
  };

  const getNewAccessToken = async (refreshToken) => {
    if (!refreshToken) {
      throw new Error("No refresh token found");
    }
    try {
      const response = await fetch(url2, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(refreshToken)
      });

      if (!response.ok) {
        //setError(`Failed for new access token`);
        throw new Error("Failed for new access token");
      }
      const result = await response.json();
      //setAccessToken(result.accessToken);
      localStorage.setItem("AccessToken", result.accessToken);
      return response.ok ? result : null;
    } catch (err) {
      console.error("Error refreshing token: ", err.message);
    }
  };

  const getPopularMovies = async () => {
    try {
      const response = await fetch(
        `${MovieBASE_URL}/movie/popular?api_key=${MovieAPI_KEY}`
      );
      const data = await response.json();
      return response.ok ? data.results : null;
    } catch (error) {
      console.log("Error fetching movies: ", error.message);
      return null;
    }
  };

  const searchMovies = async (query) => {
    try {
      const response = await fetch(
        `${MovieBASE_URL}/search/movie?api_key=${MovieAPI_KEY}&query=${encodeURIComponent(
          query
        )}`
      );
      const data = await response.json();
      return response.ok ? data.results : null;
    } catch (error) {
      console.log("Error fetching movies: ", error.message);
      return null;
    }
  };

  const values = {
    fetchWithAuth,
    fetchWithoutAuth,
    getPopularMovies,
    searchMovies
  };
  return <ApiContext.Provider value={values}>{children}</ApiContext.Provider>;
};

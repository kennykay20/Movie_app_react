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
  const fetchWithAuth = async (url, token, refreshTokenVal, options = {}) => {
    try {
      const response = await fetch(`${BASE_URL}/${url}`, {
        method: "GET",
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
            url,
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

  const values = {
    fetchWithAuth
  };
  return <ApiContext.Provider value={values}>{children}</ApiContext.Provider>;
};

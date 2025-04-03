import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../modules/navbar.module.css";

const Navbar = ({
  showLogin,
  setShowLogin,
  isSuccess,
  setIsSuccess,
  setAccessToken,
  setRefreshToken,
  setIsValue
}) => {
  const navigate = useNavigate();

  function handleClickSpan() {
    setShowLogin(!showLogin);
    if (showLogin) {
      navigate("/register");
    } else {
      navigate("/login");
    }
  }

  async function handleLogout() {
    try {
      setIsValue(true);
      navigate("/");
      setIsSuccess(false);
      setAccessToken("");
      setRefreshToken("");
      setShowLogin(true);
      localStorage.setItem("AccessToken", "");
      localStorage.setItem("RefreshToken", "");
    } catch (err) {
      alert(`Logout failed. Please try again ${err.message}`);
    }
  }
  return (
    <div className={styles.navbar}>
      <div className={styles.navbarLinks}>
        <div className={styles.navbarBrand}>
          <a href="#" className={styles.links}>
            🎦 Movie App
          </a>
        </div>
      </div>

      <div className={styles.spanContainer}>
        <Link className={styles.links} to="/home">
          Home
        </Link>
        {showLogin && !isSuccess ? (
          <span onClick={handleClickSpan} className={styles.link}>
            Register
          </span>
        ) : !showLogin && !isSuccess ? (
          <span onClick={handleClickSpan} className={styles.link}>
            Login
          </span>
        ) : (
          <div>
            &nbsp;&nbsp;&nbsp;
            <Link className={styles.links} to="/favorites">
              Favorites
            </Link>
            &nbsp;&nbsp;&nbsp;
            <span onClick={handleLogout} className={styles.link}>
              Logout
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;

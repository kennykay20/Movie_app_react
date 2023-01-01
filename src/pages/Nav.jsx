import { Link, useNavigate } from "react-router-dom";
import styles from "../modules/nav.module.css";

export default function Nav({
  showLogin,
  setShowLogin,
  isSuccess,
  setIsSuccess,
  setAccessToken,
  setRefreshToken,
  setIsValue
}) {
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
    <nav className={styles.navbar}>
      <div className={styles.navbarLinks}>
        <div className={styles.navbarBrand}>
          <Link className={styles.links} to="/home">
            🎦 Movie App
          </Link>
        </div>

        <div className={styles.spanContainer}>
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
              <Link className={styles.links} to="/home">
                Home
              </Link>
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
    </nav>
  );
}

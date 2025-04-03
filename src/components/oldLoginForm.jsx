import { useState } from "react";
import login from "../modules/old-login.module.css";
import { useNavigate } from "react-router-dom";

export default function LoginForm({
  loginUrl,
  error,
  setError,
  isValue,
  setIsValue,
  setIsSuccess,
  setAccessToken,
  setRefreshToken,
  showLogin,
  setShowLogin
}) {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [btnValue, setBtnValue] = useState("Login");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBtnValue("Loading...");
    setIsValue(true);
    const { email, password } = formData;
    if (!email || !password) {
      setError("* Both email and password are required!");
      setBtnValue("Login");
      return;
    }
    try {
      const resp = await fetch(`${loginUrl}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const result = await resp.json();
      if (result.success) {
        setIsValue(!isValue);
        setFormData({ email: "", password: "" });
        alert(`${result.message}`);
        if (isValue) {
          setIsSuccess(true);
          setAccessToken(result.accessToken);
          setRefreshToken(result.refreshToken);
          localStorage.setItem("AccessToken", result.accessToken);
          localStorage.setItem("RefreshToken", result.refreshToken);
          setShowLogin(!showLogin);
          navigate("/home");
        } else {
          alert(`${result.message}`);
        }
      } else {
        alert(`${result.message}`);
        setBtnValue("Login");
      }
    } catch (err) {
      setError(`Login failed. Please try again ${err.message}`);
      setBtnValue("Login");
    } finally {
      setBtnValue("Login");
    }
  };
  return (
    <div className={login.outercontainer}>
      <div className={login.container}>
        <div className={login.title}>Login</div>
        <form className={login.form}>
          <div className={login.emailDetails}>
            <div className={login.inputBox}>
              <label htmlFor="emailInput" className={login.details}>
                Email:
              </label>
              <input
                name="email"
                id="emailInput"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => handleEmailChange(e)}
              />
            </div>
            <div className={login.inputBox}>
              <label htmlFor="passwordInput" className={login.details}>
                Password:
              </label>
              <input
                name="password"
                id="passwordInput"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                value={formData.password}
              />
              <span
                className={login.togglePassword}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? `hide` : `show`}
              </span>
            </div>
            <div className={login.btnLogin}>
              <input
                id="btnSubmit"
                onClick={(e) => handleSubmit(e)}
                type="submit"
                value={btnValue}
              />
            </div>
          </div>
          <div className={login.errorMessage}>{error && <p>{error}</p>}</div>
        </form>
      </div>
    </div>
  );
}

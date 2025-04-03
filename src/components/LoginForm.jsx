import React, { useState } from "react";
import styles from "../modules/login.module.css";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaTwitter } from "react-icons/fa";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const LoginForm = ({
  baseUrl,
  error,
  setError,
  isValue,
  setIsValue,
  setIsSuccess,
  setAccessToken,
  setRefreshToken,
  showLogin,
  setShowLogin
}) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [btnValue, setBtnValue] = useState("Login");
  const [showPassword, setShowPassword] = useState(false);
  // const [icon, setIcon] = useState(eyeOff);

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
      const resp = await fetch(`${baseUrl}/authentication/login`, {
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
      setError(`Network failed. try again ${err.message}`);
      setBtnValue("Login");
    } finally {
      setBtnValue("Login");
    }
  };

  const handleOAuthLogin = (provider) => {
    if (provider === "Google") alert(`Logged in with ${provider}`);
    if (provider === "Facebook") alert(`Logged in with ${provider}`);
    if (provider === "Twitter") alert(`Logged in with ${provider}`);
  };

  const handleAuthToggle = () => {
    setShowLogin(!showLogin);
    navigate("/register");
  };

  return (
    <div className="flex-1 bg-gray-200 p-6">
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg w-96">
          <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>
          <form>
            <label htmlFor="emailInput" className={styles.details}>
              Email:
            </label>
            <div>
              <input
                id="emailInput"
                name="email"
                type="email"
                placeholder="Enter your email"
                className="w-full p-2 mb-3 border rounded"
                value={formData.email}
                onChange={(e) => handleEmailChange(e)}
              />
            </div>
            <label htmlFor="passwordInput" className={styles.details}>
              Password:
            </label>
            <div className="relative">
              <input
                id="passwordInput"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                className="w-full p-2 mb-3 border rounded"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              <span
                className="absolute right-5 top-3 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </span>
            </div>
            <div>
              <button
                className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
                onClick={(e) => {
                  handleSubmit(e);
                }}
                type="submit"
              >
                {btnValue}
              </button>
            </div>
            <div className={styles.errorMessage}>{error && <p>{error}</p>}</div>
          </form>

          <div className="text-center my-3">or</div>

          <div className="flex flex-col space-y-2">
            <button
              className="flex items-center justify-center bg-gray-200 text-black p-2 rounded hover:bg-gray-300"
              onClick={() => handleOAuthLogin("Google")}
            >
              <FcGoogle className="mr-2" /> Continue with Google
            </button>
            <button
              className="flex items-center justify-center bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
              onClick={() => handleOAuthLogin("Facebook")}
            >
              <FaFacebook className="mr-2" /> Continue with Facebook
            </button>
            <button
              className="flex items-center justify-center bg-blue-400 text-white p-2 rounded hover:bg-blue-500"
              onClick={() => handleOAuthLogin("Twitter")}
            >
              <FaTwitter className="mr-2" /> Continue with Twitter
            </button>
          </div>

          <p className="text-center mt-4">
            Don't have an account?
            <a
              href="#"
              id={styles.btnToggle}
              className="ml-1 hover:underline"
              onClick={handleAuthToggle}
            >
              Register
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;

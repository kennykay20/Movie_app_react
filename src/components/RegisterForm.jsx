import React, { useState } from "react";
import styles from "../modules/register.module.css";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaTwitter } from "react-icons/fa";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const RegisterForm = ({
  baseUrl,
  isValue,
  setIsValue,
  showLogin,
  setShowLogin,
  setIsSuccess,
  error,
  setError
}) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });
  const [btnValue, setBtnValue] = useState("Sign Up");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleElementChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setBtnValue("Loading...");
    setIsValue(true);
    const { firstName, lastName, email, password } = formData;
    if (!firstName || !lastName || !email || !password) {
      setError("* All fields are required!");
      setBtnValue("Login");
      return;
    }

    try {
      const resp = await fetch(`${baseUrl}/authentication/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, email, password })
      });
      const result = await resp.json();
      if (result.success) {
        setIsValue(!isValue);
        setFormData({ firstName: "", lastName: "", email: "", password: "" });
        alert(`${result.message}`);
        if (isValue) {
          setIsSuccess(false);
          setShowLogin(true);
          navigate("/login");
        } else {
          alert(`${result.message}`);
        }
      } else {
        alert(`${result.message}`);
        setBtnValue("Sign Up");
      }
    } catch (err) {
      setError(`Network failed. try again ${err.message}`);
      setBtnValue("Sign Up");
    } finally {
      setBtnValue("Sign Up");
    }
  };

  const handleAuthToggle = () => {
    setShowLogin(!showLogin);
    navigate("/login");
  };

  const handleOAuthLogin = (provider) => {
    if (provider === "Google") alert(`Logged in with ${provider}`);
    if (provider === "Facebook") alert(`Logged in with ${provider}`);
    if (provider === "Twitter") alert(`Logged in with ${provider}`);
  };

  return (
    <div className="flex-1 bg-gray-200 p-6">
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg w-96">
          <h2 className="text-2xl font-semibold text-center mb-4">Sign Up</h2>
          <form>
            <label htmlFor="firstNameInput" className={styles.details}>
              FirstName:
            </label>
            <div>
              <input
                id="firstNameInput"
                name="firstName"
                type="text"
                placeholder="Enter your firstname"
                className="w-full p-2 mb-3 border rounded"
                value={formData.firstName}
                onChange={(e) => handleElementChange(e)}
              />
            </div>
            <label htmlFor="lastNameInput" className={styles.details}>
              LastName:
            </label>
            <div>
              <input
                id="lastNameInput"
                name="firstName"
                type="text"
                placeholder="Enter your lastName"
                className="w-full p-2 mb-3 border rounded"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
              />
            </div>
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
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
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
            Already have an account?
            <a
              href="#"
              id={styles.btnToggle}
              className="text-blue-600 ml-1 hover:underline"
              onClick={handleAuthToggle}
            >
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;

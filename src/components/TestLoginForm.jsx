import React from "react";
import styles from "../modules/test.module.css";

const TestLoginForm = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    alert("submit");
  };

  const handleCancel = async (e) => {
    e.preventDefault();
    const isCancel = prompt("Do you want to cancel the form?", "Yes");
    console.log(isCancel);
  };
  return (
    <div>
      <form>
        <div className={styles.imgContainer}>
          <span className={styles.close}>&times</span>
          <img
            src={`http://localhost:5174/vite.svg`}
            alt=""
            className={styles.avatar}
          />
        </div>
        <div className={styles.container}>
          <label htmlFor="emailInput">
            <b>Email</b>
          </label>
          <input
            id="emailInput"
            name="email"
            type="text"
            placeholder="Enter your email"
          />

          <label htmlFor="passwordInput">Password</label>
          <input
            id="passwordInput"
            name="password"
            type="password"
            placeholder="Enter your password"
          />

          <button
            className={styles.loginBtn}
            type="submit"
            onClick={(e) => {
              handleSubmit(e);
            }}
          >
            Login
          </button>
          <label>
            <input type="chechbox" checked="checked" name="remember" />
            Remember me
          </label>
          <div className={styles.cancelContainer}>
            <button
              className={styles.cancelBtn}
              type="button"
              onClick={(e) => {
                handleCancel(e);
              }}
            >
              Cancel
            </button>
            <span className={styles.forget}>
              Forget <a href="#">Password?</a>
            </span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TestLoginForm;

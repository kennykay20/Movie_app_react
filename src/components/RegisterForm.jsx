import styles from "../modules/register.module.css";

export default function RegisterForm() {
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
        <div className={styles.container}>
          <h1>Sign up</h1>
          <p>Please fill in this form to create an account</p>
          <hr />
          <label htmlFor="firstNameInput">
            <b>FirstName:</b>
          </label>
          <input
            id="firstNameInput"
            name="firstName"
            type="text"
            placeholder="Enter your firstname"
          />

          <label htmlFor="lastNameInput">
            <b>LastName:</b>
          </label>
          <input
            id="lastNameInput"
            name="lastName"
            type="text"
            placeholder="Enter your lastname"
          />

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

          <p>
            By creating an account you agree{" "}
            <a className={styles.terms}>Terms & Privacy</a>
          </p>
          <div className={styles.clearfix}>
            <button
              className={styles.cancelBtn}
              type="button"
              onClick={(e) => {
                handleCancel(e);
              }}
            >
              Cancel
            </button>
            <button
              className={styles.signBtn}
              type="submit"
              onClick={(e) => {
                handleSubmit(e);
              }}
            >
              Register
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

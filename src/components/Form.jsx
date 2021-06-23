import React, { useEffect, useState } from "react";
import Joi from "joi";
import useFetch from "../services/useFetch";

function Form({ history }) {
  const { submitLogin, submitRegister } = useFetch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [spanMessage, setSpanMessage] = useState(true);
  const [responseMessage, setResponseMessage] = useState(true);
  const [disabled, setDisabled] = useState(false);

  const originPath = history.location.pathname;

  const validateEmail = (email) => {
    const emailRegex = /[A-Z0-9]{1,}@[A-Z0-9]{2,}\.[A-Z0-9]{2,}/i;
    const validEmail = emailRegex.test(email);
    return validEmail;
  };

  const validatePassword = (password) => {
    const minPasswordLength = 6;
    return password.length >= minPasswordLength;
  };

  const validateFullName = (fullName) => {
    return fullName.length >= 8;
  };

  const handleToken = (result) => {
    if (result.message) {
      setResponseMessage(result.message);
      return setSpanMessage(!spanMessage);
    }
    localStorage.setItem("user", JSON.stringify({ token: result.token }));
    return history.push("/");
  };

  const handleSubmit = () => {
    const email = validateEmail();
    const fullName = validateFullName();
    const password = validatePassword();
    if (originPath === "/login") {
      if (email === true && password === true) return submitLogin(email, password).then((result) => handleToken(result));
      if (validateEmail || validatePassword === false) return alert('Email or password invalid');
    }
    if (originPath === "/register") {
      const data = { fullName, password, email };
      if (fullName && email && password === true) submitRegister(data).then((result) => handleToken(result))
      return alert('Invalid fields');
    }
  };

  return (
    <div className="form-div">
      <form>
        {originPath === "/register" && (
          <div className="field">
            <label className="label" htmlFor="name">
              FullName
            </label>
            <div className="control">
              <input
                className="input"
                name="name"
                value={ fullName }
                data-testid="signup-name"
                onChange={({ target }) => setFullName(target.value)}
              />
            </div>
            <p className="help">Your name must be at least 8 letters</p>
          </div>
        )}
        <div className="field">
          <div className="control">
            <label className="label" htmlFor="email">
              Email
            </label>
            <input
              className="input"
              data-testid={
                originPath === "/register" ? "signup-email" : "login-email"
              }
              value={email}
              name="email"
              onChange={({ target }) => setEmail(target.value)}
            />
          </div>
          <p className="help">email@email.com</p>
        </div>
        <div className="field">
          <div className="control">
            <label className="label" htmlFor="password">
              Password
              <input
                className="input"
                type="password"
                name="password"
                value={password}
                data-testid={
                  originPath === "/register"
                    ? "signup-password"
                    : "login-password"
                }
                onChange={({ target }) => setPassword(target.value)}
              />
            </label>
          </div>
          <p className="help">Your password must be at least 6 characters</p>
        </div>
      </form>
      {/* <p hidden={ hidden }>{ invalidFieldMessage }</p> */}
      <button
        className="button search-button is-outlined ml-0"
        type="button"
        data-testid={originPath === "/register" ? "signup-btn" : "login-btn"}
        onClick={() => handleSubmit()}
      >
        {originPath === "/register" ? "Register" : "Sing in"}
      </button>
      {originPath !== "/register" && (
        <button
          className="button search-button is-outlined ml-0"
          type="button"
          data-testid="no-account-btn"
          onClick={() => history.push("/register")}
        >
          Register
        </button>
      )}
      <span hidden={spanMessage}>{responseMessage}</span>
    </div>
  );
}

export default Form;

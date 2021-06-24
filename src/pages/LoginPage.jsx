import React, { useContext } from "react";
import UsersForm from "../components/UsersForm";
import Header from "../components/Header";
import DrinksContext from "../context/Context";

function LoginPage({ history }) {
  const { setNotAuthorizedMessage, notAuthorizedMessage } = useContext(DrinksContext);

  return (
    <>
      <Header history={history} subtitle="Login" />
      <UsersForm history={history} />
      <span hidden={!notAuthorizedMessage} className="notification is-warning ml-5">
        <button
          onClick={() => setNotAuthorizedMessage(!notAuthorizedMessage)}
          className="delete"
        ></button>
        Please login or register to create or edit a recipe
      </span>
    </>
  );
}

export default LoginPage;

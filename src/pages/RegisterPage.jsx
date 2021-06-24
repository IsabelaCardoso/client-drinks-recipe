import React from 'react';
import UsersForm from '../components/UsersForm';
import Header from '../components/Header';
import BackToHomeArrow from "../components/BackToHomeArrow";

function RegisterPage({ history }) {
  return (
    <>
      <Header history={ history } subtitle="Register" />
      <BackToHomeArrow />
      <UsersForm history={ history } />
    </>
  );
};

export default RegisterPage;

import React from 'react';
import UsersForm from '../components/UsersForm';
import Header from '../components/Header';

function RegisterPage({ history }) {
  return (
    <>
      <Header history={ history } subtitle="Register" />
      <UsersForm history={ history } />
    </>
  );
};

export default RegisterPage;

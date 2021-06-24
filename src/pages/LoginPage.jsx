import React from 'react';
import UsersForm from '../components/UsersForm';
import Titles from '../components/Titles';

function LoginPage({ history }) {
  return (
    <>
      <Titles subtitle="Login" />
      <UsersForm history={ history } />
    </>
  );
};

export default LoginPage;

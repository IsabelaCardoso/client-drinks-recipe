import React from 'react';
import Form from '../components/Form';
import Titles from '../components/Titles';

function LoginPage({ history }) {
  return (
    <>
      <Titles subtitle="Login" />
      <Form history={ history } />
    </>
  );
};

export default LoginPage;

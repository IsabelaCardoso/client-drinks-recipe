import React from 'react';
import Form from '../components/Form';
import Titles from '../components/Titles';

function RegisterPage({ history }) {
  return (
    <>
      <Titles subtitle="Register" />
      <Form history={ history } />
    </>
  );
};

export default RegisterPage;

import React from 'react';
import UsersForm from '../components/UsersForm';
import Titles from '../components/Titles';

function RegisterPage({ history }) {
  return (
    <>
      <Titles subtitle="Register" />
      <UsersForm history={ history } />
    </>
  );
};

export default RegisterPage;

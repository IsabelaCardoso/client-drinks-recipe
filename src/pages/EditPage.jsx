import React from 'react';
import EditForm from '../components/EditForm';
import Titles from '../components/Titles';

function EditPage({ history }) {
  return (
    <>
      <Titles subtitle="Edit Drink Recipe" />
      <EditForm history={ history } />
    </>
  );
};

export default EditPage;

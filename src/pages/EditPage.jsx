import React from 'react';
import EditForm from '../components/EditForm';
import Titles from '../components/Titles';

function EditPage() {
  return (
    <>
      <Titles subtitle="Edit Drink Recipe" />
      <EditForm />
    </>
  );
};

export default EditPage;

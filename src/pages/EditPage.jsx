import React, { useEffect, useState } from 'react';
import EditForm from '../components/EditForm';
import Titles from '../components/Titles';
import useFetch from '../services/useFetch';

function EditPage() {
  const [recipe, setRecipe] = useState(null);
  const { getAllById } = useFetch();
  const id = window.location.href.split("edit/")[1];

  useEffect(() => {
    const fetchRecipe = async () => {
      setRecipe(await getAllById([{ id }]))
    };
    fetchRecipe();
  }, []) 
  
  return (
    <>
      <Titles subtitle="Edit Drink Recipe" />
     { recipe ? <EditForm preloadedValues={ recipe[0] } /> : <div>Loading the recipe...</div> }
    </>
  );
};

export default EditPage;

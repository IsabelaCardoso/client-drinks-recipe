import React, { useContext, useEffect } from 'react';
import RecipeForm from '../components/RecipeForm';
import Titles from '../components/Titles';
import DrinksContext from '../context/Context';
import useFetch from '../services/useFetch';

function EditPage({ history }) {
  const { getAllById } = useFetch();
  const id = window.location.href.split("edit/")[1];
  const { oneRecipe, setOneRecipe, setLoading } = useContext(DrinksContext);


  useEffect(() => {
    getAllById([{ id }])
      .then((result) => setOneRecipe(result[0]))
      .then(() => setLoading(false));
  }, []);

  return (
    <>
      <Titles subtitle="Edit Drink Recipe" />
      { oneRecipe 
        ? <RecipeForm history={ history } recipe={ oneRecipe }/>
        : setLoading(true)
      }
    </>
  );
};

export default EditPage;

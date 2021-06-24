import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import BackToHomeArrow from "../components/BackToHomeArrow";
import RecipeForm from '../components/RecipeForm';
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
      <Header history={ history } subtitle="Edit Drink Recipe" />
      <BackToHomeArrow />
      { oneRecipe.name !== '' 
        ? <RecipeForm history={ history } />
        : <div>Loading the recipe...</div>
      }
    </>
  );
};

export default EditPage;

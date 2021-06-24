import React, { useContext, useEffect } from "react";
import BackToHomeArrow from "../components/BackToHomeArrow";
import Header from "../components/Header";
import RecipeForm from "../components/RecipeForm";
import DrinksContext from "../context/Context";

function CreateDrinkPage({ history }) {
  const { oneRecipe, setOneRecipe, setLoading } = useContext(DrinksContext);

  const initialFields = {
    name: "",
    category: "",
    instructions: "",
    image: "",
    ingredients: [
      { ingredient: "", measure: "" },
      { ingredient: "", measure: "" },
      { ingredient: "", measure: "" },
      { ingredient: "", measure: "" },
      { ingredient: "", measure: "" },
      { ingredient: "", measure: "" },
    ],
  }

  useEffect(() => {
      setOneRecipe(initialFields)
      setLoading(false);
  }, []);

  return (
    <div className="container home-page is-fluid">
      <Header history={ history } subtitle="Create Drink" />
      <BackToHomeArrow />
      { oneRecipe.name === ''
        ? <RecipeForm history={ history } />
        : <div>Loading the recipe...</div>
      }
    </div>
  );
}

export default CreateDrinkPage;

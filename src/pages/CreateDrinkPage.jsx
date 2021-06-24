import React, { useContext, useEffect } from "react";
import BackToHomeArrow from "../components/BackToHomeArrow";
import RecipeForm from "../components/RecipeForm";
import Titles from "../components/Titles";
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
    ],
  }
  useEffect(() => {
      setOneRecipe(initialFields)
      setLoading(false);
  }, []);

  return (
    <div className="container home-page is-fluid">
      <Titles subtitle="Create Drink" />
      <BackToHomeArrow />
      <RecipeForm history={ history }/>
    </div>
  );
}

export default CreateDrinkPage;

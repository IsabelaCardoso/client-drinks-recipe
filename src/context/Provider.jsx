import React, { useState } from "react";
import PropTypes from "prop-types";
import DrinksContext from "./Context";

function DrinksProvider({ children }) {
  const [recipes, setRecipes] = useState();
  const [test, setTest] = useState();
  const [noRecipesMessage, setNoRecipesMessage] = useState(false);
  const [oneWordHidden, setOneWordHidden] = useState(false);
  const [invalidNameHidden, setInvalidNameHidden] = useState(false);
  const [categoryRequired, setCategoryRequired] = useState(false);
  const [drinkDeletedMessage, setDrinkDeletedMessage] = useState(false);
  const [loading, setLoading] = useState(true);
  const [oneRecipe, setOneRecipe] = useState({
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
  });
  const [notAuthorizedMessage, setNotAuthorizedMessage] = useState(false);

  const context = {
    recipes,
    setRecipes,
    test,
    setTest,
    noRecipesMessage,
    setNoRecipesMessage,
    oneWordHidden,
    setOneWordHidden,
    invalidNameHidden,
    setInvalidNameHidden,
    categoryRequired,
    setCategoryRequired,
    drinkDeletedMessage,
    setDrinkDeletedMessage,
    oneRecipe,
    setOneRecipe,
    loading,
    setLoading,
    notAuthorizedMessage,
    setNotAuthorizedMessage
  };

  return (
    <main>
      <DrinksContext.Provider value={context}>
        {children}
      </DrinksContext.Provider>
    </main>
  );
}

DrinksProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DrinksProvider;

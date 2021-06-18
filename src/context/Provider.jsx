import React, { useState } from "react";
import PropTypes from "prop-types";
import DrinksContext from "./Context";

function DrinksProvider({ children }) {
  const [recipes, setRecipes] = useState();
  const [test, setTest] = useState();
  const [noRecipes, setNoRecipes] = useState(false);
  const [oneWordHidden, setOneWordHidden] = useState(false);
  const [invalidNameHidden, setInvalidNameHidden] = useState(false);
  const [categoryRequired, setCategoryRequired] = useState(false);

  const context = {
    recipes,
    setRecipes,
    test,
    setTest,
    noRecipes,
    setNoRecipes,
    oneWordHidden,
    setOneWordHidden,
    invalidNameHidden,
    setInvalidNameHidden,
    categoryRequired,
    setCategoryRequired,
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

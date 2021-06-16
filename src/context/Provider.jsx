import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DrinksContext from './Context';

function DrinksProvider({ children }) {
  const [recipes, setRecipes] = useState();
  const [test, setTest] = useState();


  const context = {
    recipes,
    setRecipes,
    test,
    setTest,
  };

  return (
    <main>
    <DrinksContext.Provider value={ context }>
      {children}
    </DrinksContext.Provider>
    </main>
  );
}

DrinksProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DrinksProvider;

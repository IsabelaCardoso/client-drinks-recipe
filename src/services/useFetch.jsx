import { useContext } from "react";
import DrinksContext from "../context/Context";

function useFetch() {
  const { setRecipes, setNoRecipes } = useContext(DrinksContext);

  const randomDrinksFetch = async () => {
    const results = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
      .then((response) => response.json());
    return setRecipes(results);
  };

  const searchFetch = async (inputValues) => {
    const { search, type } = inputValues;
    const um = 1;
    if (type === 'name') {
      const results = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`)
        .then((response) => response.json());
      if (results.drinks === null) return setNoRecipes(true);
      return setRecipes(results);
    }
    if (type === 'first-letter' && search.length === um) {
      const results = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${search}`)
        .then((response) => response.json());
      return setRecipes(results);
    }
  }

  const drinkDetailsFetch = async (id) => {
    const results = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((response) => response.json());
    return setRecipes(results);
  };

  return ({
    searchFetch,
    randomDrinksFetch,
    drinkDetailsFetch,
  });
};

export default useFetch;

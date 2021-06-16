import { useContext } from "react";
import DrinksContext from "../context/Context";

function useFetch() {
  const { setRecipes } = useContext(DrinksContext);

  async function searchFetch(inputValues) {
    const { search, type } = inputValues;
    const um = 1;
    if (type === 'name') {
      const results = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`)
        .then((response) => response.json());
      console.log('result fetch', results);
      return setRecipes(results);
    }
    if (type === 'first-letter' && search.length === um) {
      const results = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${search}`)
        .then((response) => response.json());
      console.log('result fetch letter', results);
      return setRecipes(results);
    }
  }

  return ({
    searchFetch,
  });
};

export default useFetch;

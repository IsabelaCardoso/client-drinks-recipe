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

  // const getAllById = async (idsList) => {
  // const urls = idsList.map((drink) => `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drink.id}`);
  // const promises = await Promise.all(urls.map(async(url) => fetch(url)));
  // const jsons = promises.map(async(p) => p.json());
  // const jsonPromises = await Promise.all(jsons.map((j) => j));
  // setRecipes(jsonPromises);
  // return null;
  // }

  const getAllById = async (idsList) => {
    const urls = idsList.map((drink) =>  `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drink.id}`);
    Promise.all(
      urls.map((url) => fetch(url)
        .then((response) => response.json())),
    ).then((result) => setRecipes(result));
    return null
  }

  return ({
    searchFetch,
    randomDrinksFetch,
    drinkDetailsFetch,
    getAllById,
  });
};

export default useFetch;

import { useContext } from "react";
import DrinksContext from "../context/Context";

function useFetch() {
  const { setNoRecipesMessage, setOneWordHidden, setInvalidNameHidden } =
    useContext(DrinksContext);

  const randomDrinksFetch = async () => {
    const results = await fetch(
      "https://www.thecocktaildb.com/api/json/v1/1/search.php?s="
    )
      .then((response) => response.json())
      .then((result) => result.drinks.slice(0, 18));
    return ({ drinks: results });
  };

  const searchFetch = async (inputValues) => {
    const { search, type } = inputValues;
    if (type === "first-letter" && search.length > 1) {
      return setOneWordHidden(true);
    }
    if (type === "name" && search.length === 1) {
      return setInvalidNameHidden(true);
    }
    if (type === "name" && search.length > 1) {
      const results = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`
      ).then((response) => response.json());
      if (results.drinks === null) return setNoRecipesMessage(true);
      return results;
    }
    if (type === "first-letter" && search.length === 1) {
      const results = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${search}`
      ).then((response) => response.json());
      return results;
    }
  };

  const drinkDetailsFetch = async (id) => {
    const results = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((response) => response.json()).then((result) => result);
    return results;
  };

  const getAllById = async (idsList) => {
    const urls = idsList.map(
      (drink) =>
        `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drink.id}`
    );
    const results = Promise.all(
      urls.map((url) => fetch(url).then((response) => response.json()))
    ).then((result) => result);
    return results;
  };

  return {
    searchFetch,
    randomDrinksFetch,
    drinkDetailsFetch,
    getAllById,
  };
}

export default useFetch;

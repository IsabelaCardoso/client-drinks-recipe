import { useContext } from "react";
import DrinksContext from "../context/Context";

function useFetch() {
  const { setNoRecipesMessage, setOneWordHidden, setInvalidNameHidden } =
    useContext(DrinksContext);

  const informationType = 'application/json';
  const methods = {
    post: 'POST',
    get: 'GET',
    put: 'PUT',
  };

  const submitLogin = async(email, password) => {
    console.log('cheguei aqui');
    console.log('email', email, 'password', password)
    const result = await fetch('http://localhost:3001/login', {
      method: methods.post,
      headers: {
        Accept: informationType,
        'Content-Type': informationType,
      },
      body: JSON.stringify({ email, password }),
    });
    console.log('result', result);
    const data = await result.json();
    return data;
  }

  const randomDrinksFetch = async () => {
    const results = await fetch('http://localhost:3001/drink', {
      method: 'GET',
      headers: {
        Accept: informationType,
        'Content-Type': informationType,
      },
    })
      .then((response) => response.json())
      .then((result) => result);
    return ({ drinks: results });
  };

  const searchFetch = async (inputValues, token) => {
    console.log('token', token);
    const { search, type } = inputValues;
    if (type === "first-letter" && search.length > 1) {
      return setOneWordHidden(true);
    }
    if (type === "name" && search.length === 1) {
      return setInvalidNameHidden(true);
    }
    if (type === "name" && search.length > 1) {
      const results = await fetch(`http://localhost:3001/drink/name/${search}`, {
      method: 'GET',
      headers: {
        Accept: informationType,
        'Content-Type': informationType,
        Authorization: token,
      },
    }).then((response) => response.json());
      if (results.drinks === null) return setNoRecipesMessage(true);
      console.log('result', results);
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
    submitLogin,
    searchFetch,
    randomDrinksFetch,
    drinkDetailsFetch,
    getAllById,
  };
}

export default useFetch;

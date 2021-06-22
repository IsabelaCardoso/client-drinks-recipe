import { useContext } from "react";
import DrinksContext from "../context/Context";

function useFetch() {
  const { noRecipesMessage, setNoRecipesMessage, setOneWordHidden, setInvalidNameHidden } =
    useContext(DrinksContext);

  const informationType = 'application/json';
  const methods = {
    post: 'POST',
    get: 'GET',
    put: 'PUT',
  };

  const submitLogin = async(email, password) => {
    const result = await fetch('http://localhost:3001/login', {
      method: methods.post,
      headers: {
        Accept: informationType,
        'Content-Type': informationType,
      },
      body: JSON.stringify({ email, password }),
    });
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
      if (results.drinks === []) return setNoRecipesMessage(!noRecipesMessage);
      return results;
    }
    if (type === "first-letter" && search.length === 1) {

      const results = await fetch(`http://localhost:3001/drink/${search}`, {
        method: 'GET',
        headers: {
          Accept: informationType,
          'Content-Type': informationType,
          Authorization: token,
        },
      }).then((response) => response.json());
      return results;
    }
  };

  const drinkDetailsFetch = async (id) => {
    // const token = getToken()
    console.log('entrei no detailsfetch');
    console.log('id', id);
    // console.log('token', token);
    const results = await fetch(`http://localhost:3001/drink/id/${id}`, {
        method: 'GET',
        headers: {
          Accept: informationType,
          'Content-Type': informationType,
          // Authorization: token,
        },
      })
    .then((response) => response.json());
    console.log('result detailsfetch', results);
    return results;
  };

  const getAllById = async (idsList) => {
    const urls = idsList.map(
      (drink) => `http://localhost:3001/drink/id/${drink.id}`);
    const results = Promise.all(
      urls.map((url) => fetch(url).then((response) => response.json()))
    ).then((result) => result);
    return results;
  };

  const getToken = () => {
    const token = JSON.parse(localStorage.getItem('user'));
    if (!token || !token.token) alert('Token inválido ou expirado');
    return token;
  }

  return {
    submitLogin,
    searchFetch,
    randomDrinksFetch,
    drinkDetailsFetch,
    getAllById,
    getToken,
  };
}

export default useFetch;

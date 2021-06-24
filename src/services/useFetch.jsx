import { useContext } from "react";
import DrinksContext from "../context/Context";

function useFetch() {
  const { setOneWordHidden, setInvalidNameHidden } =
    useContext(DrinksContext);

  const informationType = 'application/json';
  const methods = {
    post: 'POST',
    get: 'GET',
    put: 'PUT',
    delete: 'DELETE'
  };

  const fetchInfosWithBody = (data, method) => {
    const fetchInformations = {
      method: method,
      headers: {
      Accept: informationType,
      'Content-Type': informationType,
    },
    body: JSON.stringify(data)
    }
    return fetchInformations;
  };

  const fetchInfosWithBodyAndToken = (data, method, token) => {
    const fetchInformations = {
      method: method,
      headers: {
      Accept: informationType,
      'Content-Type': informationType,
      Authorization: token.token
    },
    body: JSON.stringify(data)
    }
    return fetchInformations;
  };

  const fetchInfosMethod = (method) => {
    const fetchInformations = {
      method: method,
      headers: {
        Accept: informationType,
        'Content-Type': informationType,
      }
    }
    return fetchInformations;
  };


  const submitLogin = async(email, password) => {
    const result = await fetch('http://localhost:3001/login',
      fetchInfosWithBody({ email, password }, methods.post));
    const data = await result.json();
    return data;
  }

  const submitRegister = async({ fullName, email, password }) => {
    const result = await fetch('http://localhost:3001/register',
      fetchInfosWithBody({ fullName, email, password }, methods.post));
    const data = await result.json();
    return data;
  }

  const randomDrinksFetch = async () => {
    const results = await fetch('http://localhost:3001/drink', fetchInfosMethod(methods.get))
      .then((response) => response.json())
      .then((result) => result);
    return results;
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
      const results = await fetch(`http://localhost:3001/drink/name/${search}`,
        fetchInfosMethod(methods.get)).then((response) => response.json());
      return results;
    }
    if (type === "first-letter" && search.length === 1) {
      const results = await fetch(`http://localhost:3001/drink/letter/${search}`, 
      fetchInfosMethod(methods.get)).then((response) => response.json());
      return results;
    }
  };

  const drinkDetailsFetch = async (id) => {
    const results = await fetch(`http://localhost:3001/drink/id/${id}`, 
      fetchInfosMethod(methods.get)).then((response) => response.json());
    return results;
  };

  const getAllById = async (idsList) => {
    const urls = idsList.map(
      (drink) => `http://localhost:3001/drink/id/${drink.id}`);
    const results = await Promise.all(
      urls.map((url) => fetch(url).then((response) => response.json()))
    ).then((result) => result);
    return results;
  };

  const getToken = () => {
    const token = JSON.parse(localStorage.getItem('user'));
    if (!token || !token.token) alert('Token inválido ou expirado');
    return token;
  }

  const updateDrink = async(recipe, token) => {
    const result = await fetch(`http://localhost:3001/drink/${recipe.id}`,
    fetchInfosWithBodyAndToken(recipe, methods.put, token));
    const data = await result.json();
    return data;
  }

  const deleteDrink = async(id, token) => {
    await fetch(`http://localhost:3001/drink/${id}`, {
      method: methods.delete,
      headers: {
        Accept: informationType,
        'Content-Type': informationType,
        Authorization: token.token
      },
    });
    return null;
  };

  const createNewDrink = async(drink, token) => {
    const result = await fetch('http://localhost:3001/drink',
    fetchInfosWithBodyAndToken(drink, methods.post, token));
    const data = await result.json();
    return data;
  }

  return {
    submitLogin,
    submitRegister,
    searchFetch,
    randomDrinksFetch,
    drinkDetailsFetch,
    getAllById,
    getToken,
    updateDrink,
    deleteDrink,
    createNewDrink,
  };
}

export default useFetch;

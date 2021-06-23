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

  const submitRegister = async({ fullName, email, password }) => {
    const result = await fetch('http://localhost:3001/register', {
      method: methods.post,
      headers: {
        Accept: informationType,
        'Content-Type': informationType,
      },
      body: JSON.stringify({ fullName, email, password }),
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
    return results;
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
      console.log('fetch results', results);
      return results;
    }
    if (type === "first-letter" && search.length === 1) {
      const results = await fetch(`http://localhost:3001/drink/letter/${search}`, {
        method: 'GET',
        headers: {
          Accept: informationType,
          'Content-Type': informationType,
          Authorization: token,
        },
      }).then((response) => response.json());
      console.log('results name', results);
      return results;
    }
  };

  const drinkDetailsFetch = async (id) => {
    const results = await fetch(`http://localhost:3001/drink/id/${id}`, {
        method: 'GET',
        headers: {
          Accept: informationType,
          'Content-Type': informationType,
          // Authorization: token,
        },
      })
    .then((response) => response.json());
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

  return {
    submitLogin,
    submitRegister,
    searchFetch,
    randomDrinksFetch,
    drinkDetailsFetch,
    getAllById,
    getToken,
  };
}

export default useFetch;

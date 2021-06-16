import React, { useContext, useEffect, useState } from 'react';
import DrinksContext from '../context/Context';
import useFetch from '../services/useFetch';

function SearchBar() {
  const [inputValues, setInputValues] = useState({});
  const [radioType, setRadioType] = useState('');
  const { searchFetch } = useFetch();
  const { recipes } = useContext(DrinksContext);

  useEffect(() => {
    const textingTimer = setTimeout(async() => await searchFetch(inputValues), 3000); // chamada da api
    return () => clearTimeout(textingTimer);
  }, [inputValues])

  return (
    <>
      <form>
        <input
          onChange={(event) => setInputValues({search: event.target.value, type: radioType})}
        />
        <label>
          <input
            onChange={(event) => setRadioType(event.target.id)}
            name="search-type"
            id="first-letter"
            type="radio"
          />
          Primeira Letra
        </label>
        <label>
          <input
            onChange={(event) => setRadioType(event.target.id)}
            name="search-type"
            id="name"
            type="radio"
          />
          Nome
        </label>
      </form>
      {/* <p>{ textSearch }</p> */}
    </>
  );
}

export default SearchBar;

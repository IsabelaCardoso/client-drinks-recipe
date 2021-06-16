import React, { useContext, useEffect, useState } from 'react';
import DrinksContext from '../context/Context';
import useFetch from '../services/useFetch';
import DrinksCard from './DrinksCard';

function SearchBar() {
  const [inputValues, setInputValues] = useState({});
  const [radioType, setRadioType] = useState('');
  const { searchFetch } = useFetch();
  const { recipes } = useContext(DrinksContext);
  const [oneWordHidden, setOneWordHidden] = useState(true);

  useEffect(() => {
    // if (inputValues.type === )
    const textingTimer = setTimeout(async() => await searchFetch(inputValues), 3000); // chamada da api
    return () => clearTimeout(textingTimer);
  }, [inputValues])

  const handleChange = (value) => {
    if (!radioType) return alert('Por favor escolha uma categoria');
    if (radioType === 'first-letter' && value.length > 1) return setOneWordHidden(false);
    if (radioType === 'first-letter' && value.length <= 1) return setOneWordHidden(true);
    // alert('Sua busca deve conter apenas uma letra');
    setInputValues({search: value, type: radioType})
    if (!recipes) return 
  };

  return (
    <>
      <form>
        <input
          onChange={(event) => handleChange(event.target.value) }
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
      <span hidden={ oneWordHidden }>Sua busca deve conter apenas uma letra</span>
      {(recipes && recipes.length > 0) ? <DrinksCard /> : <span>Desculpe, não encontramos nenhuma receita para o filtro selecionado. Tente novamente. </span> }
    </>
  );
}

export default SearchBar;

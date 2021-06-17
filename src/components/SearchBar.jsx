import React, { useContext, useEffect, useState } from 'react';
import DrinksContext from '../context/Context';
import useFetch from '../services/useFetch';
import DrinksCard from './DrinksCard';

function SearchBar() {
  const { searchFetch } = useFetch();
  const { recipes, noRecipes, setNoRecipes } = useContext(DrinksContext);
  const [inputValues, setInputValues] = useState({});
  const [inputText, setInputText] = useState('');
  const [radioType, setRadioType] = useState('');
  const [oneWordHidden, setOneWordHidden] = useState(true);
  const [hidden, setHidden] = useState(false);
  const [invalidNameHidden, setInvalidNameHidden] = useState(true);

  useEffect(() => {
    const textingTimer = setTimeout(async() => await searchFetch(inputValues), 3000);
    return () => clearTimeout(textingTimer);
  }, [inputValues])

  useEffect(() => {
    setNoRecipes(false);
  }, [recipes])

  const handleChange = (e) => {
    console.log(e)
    console.log('radio', radioType);
    console.log('input', inputText);
    if (!radioType && (e.type !== 'radio')) return alert('Por favor escolha uma categoria');
    if (radioType === 'first-letter' && inputText.length < 1) return setOneWordHidden(true);
    if (radioType === 'first-letter' && inputText.length >= 1) return setOneWordHidden(false);
    if (radioType !== 'name') return setInvalidNameHidden(true);
    if (radioType === 'name' && inputText.length < 2) return setInvalidNameHidden(false);
    if (radioType === 'name' && inputText.length >= 2) return setInvalidNameHidden(true);

    setInputValues({search: inputText, type: radioType})
    if (!recipes && radioType && inputText) return setNoRecipes(!noRecipes);
  };

  return (
    <>
      <form onChange={(e) => handleChange(e.target)}>
        <input
          onChange={ (event) => setInputText(event.target.value) }
        />
        <label>
          <input
            onChange={ (event) => setRadioType(event.target.id) }
            name="search-type"
            id="first-letter"
            type="radio"
          />
          Primeira Letra
        </label>
        <label>
          <input
            onChange={ (event) => setRadioType(event.target.id) }
            name="search-type"
            id="name"
            type="radio"
          />
          Nome
        </label>
      </form>
      <span hidden={ oneWordHidden }>Sua busca deve conter apenas uma letra</span>
      <span hidden={ invalidNameHidden }>O nome do drink deve ter pelo menos duas letras</span>
      <span hidden={ !noRecipes }>Desculpe, não encontramos nenhuma receita para o filtro selecionado. Tente novamente.</span>
      {(recipes && recipes.length > 0) && <DrinksCard /> }
      {/* { noRecipes 
        ? (setNotFound(!notFound) && setHidden(true))
        : <div hidden={ hidden }><DrinksCard /></div>  } */}

    </>
  );
}

export default SearchBar;

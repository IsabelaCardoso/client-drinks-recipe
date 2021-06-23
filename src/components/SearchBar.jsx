import React, { useContext, useEffect, useState } from "react";
import DrinksContext from "../context/Context";
import useFetch from "../services/useFetch";

function SearchBar() {
  const { searchFetch, getToken } = useFetch();
  const [inputValues, setInputValues] = useState({});
  const [radioType, setRadioType] = useState('');
  const { randomDrinksFetch } = useFetch();
  const { recipes, setRecipes, setNoRecipesMessage, noRecipesMessage, setCategoryRequired } =
    useContext(DrinksContext);

  useEffect(() => {
    const textingTimer = setTimeout(
      async () => {
        const token = getToken()
        const results = await searchFetch(inputValues, token.token);
        if (results && results.length > 0) setRecipes(results);
        if (!results || results.length < 1) setNoRecipesMessage(!noRecipesMessage)
      }, 3000);
      return () => clearTimeout(textingTimer);
    }, [inputValues]);

  const timerWithoutSearch = () => {
    setTimeout( async () => {
        const results = await randomDrinksFetch();
        setRecipes(results);
    }, 3000);
    return () => clearTimeout();
  }

  const handleChange = (search) => {   
    if (!radioType && search.type !== "radio") return setCategoryRequired(true);
    if (search && radioType !== '') return setInputValues({ search, type: radioType });
    if (!recipes && radioType && search.length > 0) return setNoRecipesMessage(!noRecipesMessage);
    if (!search && radioType) return timerWithoutSearch();
  };

  return (
    <>
      <form
        data-testid="search-form"
      >
        <div className="field">
          <div className="control">
            <input
              className="input"
              onChange={(event) => handleChange(event.target.value)}
            />
          </div>
        </div>
        <div className="radios">
          <label className="radio">
            <input
              onChange={(event) => setRadioType(event.target.id)}
              name="search-type"
              id="first-letter"
              type="radio"
            />
            First Letter
          </label>
          <label className="radio">
            <input
              onChange={(event) => setRadioType(event.target.id)}
              name="search-type"
              id="name"
              type="radio"
            />
            Name
          </label>
        </div>
      </form>
    </>
  );
}

export default SearchBar;

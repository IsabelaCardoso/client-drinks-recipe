import React, { useContext, useEffect, useState } from "react";
import DrinksContext from "../context/Context";
import useFetch from "../services/useFetch";
import DrinksCard from "./DrinksCard";

function SearchBar() {
  const { searchFetch, getToken } = useFetch();
  const [inputValues, setInputValues] = useState({});
  const [inputText, setInputText] = useState("");
  const [radioType, setRadioType] = useState("");
  const { recipes, setRecipes, setNoRecipesMessage, noRecipesMessage, setCategoryRequired } =
    useContext(DrinksContext);

  useEffect(() => {
    const textingTimer = setTimeout(
      async () => {
        const token = getToken()
        const results = await searchFetch(inputValues, token.token)
        if (results !== undefined) setRecipes(results);
      }, 3000);
    return () => clearTimeout(textingTimer);
  }, [inputValues]);


  useEffect(() => {
    setNoRecipesMessage(false);
  }, [recipes]);

  const handleChange = (search) => {
    if (!radioType && search.type !== "radio") return setCategoryRequired(true);
    setInputValues({ search, type: radioType });
    if (!recipes && radioType && inputText) return setNoRecipesMessage(!noRecipesMessage);
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
      {recipes && recipes.length > 0 && <DrinksCard />}
      {/* { noRecipes 
        ? (setNotFound(!notFound) && setHidden(true))
        : <div hidden={ hidden }><DrinksCard /></div>  } */}
    </>
  );
}

export default SearchBar;

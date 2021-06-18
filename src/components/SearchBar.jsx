import React, { useContext, useEffect, useState } from "react";
import DrinksContext from "../context/Context";
import useFetch from "../services/useFetch";
import DrinksCard from "./DrinksCard";

function SearchBar() {
  const { searchFetch } = useFetch();
  const [inputValues, setInputValues] = useState({});
  const [inputText, setInputText] = useState("");
  const [radioType, setRadioType] = useState("");
  const { recipes, noRecipes, setNoRecipes, setCategoryRequired } =
    useContext(DrinksContext);

  useEffect(() => {
    const textingTimer = setTimeout(
      async () => await searchFetch(inputValues),
      3000
    );
    return () => clearTimeout(textingTimer);
  }, [inputValues]);

  useEffect(() => {
    setNoRecipes(false);
  }, [recipes]);

  const handleChange = (search) => {
    if (!radioType && search.type !== "radio") return setCategoryRequired(true);
    setInputValues({ search, type: radioType });
    if (!recipes && radioType && inputText) return setNoRecipes(!noRecipes);
  };

  return (
    <>
      <form className="is-flex">
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
            Primeira Letra
          </label>
          <label className="radio">
            <input
              onChange={(event) => setRadioType(event.target.id)}
              name="search-type"
              id="name"
              type="radio"
            />
            Nome
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

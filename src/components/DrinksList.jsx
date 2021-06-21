import React, { useContext, useEffect, useState } from "react";
import DrinksContext from "../context/Context";
import useFetch from "../services/useFetch";
import DrinksCard from "./DrinksCard";

function DrinksList() {
  const [loading, setLoading] = useState(true);
  const { randomDrinksFetch } = useFetch();
  const {
    recipes,
    setRecipes,
    oneWordHidden,
    setOneWordHidden,
    noRecipesMessage,
    setNoRecipesMessage,
    setCategoryRequired,
    categoryRequired,
  } = useContext(DrinksContext);

  useEffect(() => {
    randomDrinksFetch()
    // .then((result) => console.log('drinksList result', result))
    .then((result) => setRecipes(result))
    .then(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading your drinks...</div>;
  return (
    <div>
      <div className="is-flex is-justify-content-flex-end">
          <span hidden={!oneWordHidden} className="notification is-warning">
            <button
              onClick={() => setOneWordHidden(false)}
              className="delete"
            ></button>
            Your search must contain only one letter.
          </span>

          <span hidden={!noRecipesMessage} className="notification is-warning">
            <button
              onClick={() => setNoRecipesMessage(!noRecipesMessage)}
              className="delete"
            ></button>
            Sorry, we couldn't find any recipes for the selected filter. Try again.
          </span>
          <span hidden={!categoryRequired} className="notification is-warning">
            <button
              onClick={() => setCategoryRequired(!categoryRequired)}
              className="delete"
            ></button>
            Please choose a category.
          </span>
      </div>
      <div className="container is-flex">
        <div>
          <div className="drinks-card-container is-justify-content-center">
            {!noRecipesMessage &&
              recipes.drinks.map((recipe) => {
                return (
                  <DrinksCard
                    origin="home-page"
                    key={recipe.idDrink}
                    name={recipe.strDrink}
                    thumb={recipe.strDrinkThumb}
                    id={recipe.idDrink}
                  />
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DrinksList;

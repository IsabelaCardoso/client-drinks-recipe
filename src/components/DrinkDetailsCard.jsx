import React, { useContext, useEffect, useState } from "react";
import DrinksContext from "../context/Context";
import useFetch from "../services/useFetch";
import FavoriteButton from "./FavoriteButton";
import ShareButton from "./ShareButton";

function DrinkDetailsCard() {
  const { drinkDetailsFetch } = useFetch();
  const { recipes, setRecipes } = useContext(DrinksContext);
  const [loading, setLoading] = useState(true);
  const [measures, setMeasures] = useState();
  const [ingredients, setIngredients] = useState();

  const idDrink = window.location.href.split("details/")[1];

  useEffect(() => {
    drinkDetailsFetch(idDrink)
    .then((result) => setRecipes(result))
    .then(() => setLoading(false));
  }, []);


  const handleIngredients = () => {
    if (recipes && !recipes[0]) {
      const arrayDrinksInfos = Object.entries(recipes.drinks[0]);
      const ingredients = arrayDrinksInfos.filter(
        (row) =>
          row[0].toLowerCase().includes("stringredient") &&
          row[1] !== null &&
          row[1] !== ""
      );

      const allMeasures = arrayDrinksInfos.filter((row) =>
        row[0].toLowerCase().includes("strmeasure")
      );
      const measures = allMeasures.slice(0, ingredients.length);
      setIngredients(ingredients);
      setMeasures(measures);
    }
  };

  useEffect(() => {
    handleIngredients();
  }, [recipes]);

  if (loading) return <div>Loading the recipe...</div>;
  const drink = recipes.drinks[0];

  return (
    <div className="box">
      <div>
        <h1 className="title">{drink.strDrink}</h1>
      </div>
      {drink.strAlcoholic 
        ? <p data-testid="drink-alcoholic-or-not">{drink.strAlcoholic}</p>
        : <p data-testid="drink-alcoholic-or-not">Non-alcoholic</p>}
      <img
        className="drink-thumb-details"
        src={drink.strDrinkThumb}
        alt={drink.strDrink}
      />
      <div className="is-flex">
        <ul className="card">
          <h5>
            <strong>Ingredients</strong>
          </h5>
          <br />
          {ingredients.map((ingredient, index) => {
            if (measures[index][1] === null) return <li key={ingredient}>{`${ingredient[1]}`}</li>;
            return <li key={ingredient}>{`${ingredient[1]} - ${measures[index][1]}`}</li>;
          })}
        </ul>
        <div className="is-flex">
          <div className="card">
            <h5>
              <strong>Instructions</strong>
            </h5>
            <br />
            <p>{drink.strInstructions}</p>
          </div>
        </div>
      </div>
      <div>
        <FavoriteButton drinkId={ idDrink } />
        <ShareButton />
      </div>
    </div>
  );
}

export default DrinkDetailsCard;

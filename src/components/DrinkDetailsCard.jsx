import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DrinksContext from "../context/Context";
import useFetch from "../services/useFetch";
import FavoriteButton from "./FavoriteButton";
import ShareButton from "./ShareButton";

function DrinkDetailsCard() {
  const { drinkDetailsFetch } = useFetch();
  const { recipes, setRecipes } = useContext(DrinksContext);
  const [loading, setLoading] = useState(true);

  const idDrink = window.location.href.split("details/")[1];

  useEffect(() => {
    drinkDetailsFetch(idDrink)
      .then((result) => setRecipes(result))
      .then(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading the recipe...</div>;

  return (
    <div className="box">
      <div>
        <h1 className="title">{recipes.name}</h1>
      </div>
      <p>{recipes.category}</p>
      <img
        className="drink-thumb-details"
        src={recipes.image}
        alt={recipes.name}
      />
      <div className="is-flex">
        <ul className="card">
          <h5>
            <strong>Ingredients</strong>
          </h5>
          <br />
          {recipes.ingredients.map((item) => {
            if (item.measure === null)
              return <li key={item.ingredient}>{item.ingredient}</li>;
            return (
              <li
                key={item.ingredient}
              >{`${item.ingredient} - ${item.measure}`}</li>
            );
          })}
        </ul>
        <div className="is-flex">
          <div className="card">
            <h5>
              <strong>Instructions</strong>
            </h5>
            <br />
            <p>{recipes.instructions}</p>
          </div>
        </div>
      </div>
      <div>
        <FavoriteButton drinkId={parseInt(idDrink)} />
        <ShareButton />
      </div>
      <Link to={`/edit/${ idDrink }`}>
        <button
          className="button search-button is-outlined m-0 mr-2"
        >
          Edit Drink
        </button>
      </Link>
    </div>
  );
}

export default DrinkDetailsCard;

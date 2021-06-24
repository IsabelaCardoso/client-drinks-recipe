import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DrinksContext from "../context/Context";
import useFetch from "../services/useFetch";
import FavoriteButton from "./FavoriteButton";
import ShareButton from "./ShareButton";

function DrinkDetailsCard({ history }) {
  const { drinkDetailsFetch, deleteDrink, getToken } = useFetch();
  const { recipes, setRecipes, setDrinkDeletedMessage } = useContext(DrinksContext);
  const [loading, setLoading] = useState(true);

  const idDrink = window.location.href.split("details/")[1];

  useEffect(() => {
    drinkDetailsFetch(idDrink)
      .then((result) => setRecipes(result))
      .then(() => setLoading(false));
  }, []);

  const deleteFromLocalStorage = () => {
      const objectList = JSON.parse(localStorage.getItem('favoriteDrinks'));
      const newList = objectList.filter((drink) => drink.id !== parseInt(idDrink))
      localStorage.setItem('favoriteDrinks', JSON.stringify(newList));
  };

  const handleDeleteDrink = async() => {
    deleteFromLocalStorage()
    const token = getToken()
    await deleteDrink(idDrink, token);
    history.push('/');
    setDrinkDeletedMessage(true);
  };

  if (loading) return <div>Loading the recipe...</div>;
  return (
    <div className="box">
      <div>
        <h1 className="title">{recipes.name}</h1>
      </div>
      <p data-testid="drink-category">{recipes.category}</p>
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
      <div className="mt-5">
        <Link data-testid="edit-link" to={`/edit/${ idDrink }`}>
          <button
            type="button"
            className="button search-button is-outlined m-0 mr-5"
          >
            Edit Drink
          </button>
        </Link>
        <button
          onClick={() => handleDeleteDrink()}
          type="button"
          className="button search-button is-outlined m-0 ml-3 mr-2"
        >
          Delete Drink
        </button>
      </div>
    </div>
  );
}

export default DrinkDetailsCard;

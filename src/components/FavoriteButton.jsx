import React, { useContext, useEffect, useState } from "react";
import DrinksContext from "../context/Context";

function FavoriteButon({ drinkId }) {
  const { recipes } = useContext(DrinksContext);
  const [favorite, setFavorite] = useState();

  const isFavorite = () => {
    if (recipes) {
      const objectList = JSON.parse(localStorage.getItem("favoriteDrinks"));
      if (objectList === null) {
        localStorage.setItem('favoriteDrinks', JSON.stringify([]));
        return setFavorite(false);
      }
      const newList = objectList.some((item) => parseInt(item.id) === parseInt(drinkId));
      newList ? setFavorite(true) : setFavorite(false);
    }
  };

  useEffect(() => {
    isFavorite();
  }, [recipes]);

  const handleFavorite = () => {
    const objectList = JSON.parse(localStorage.getItem('favoriteDrinks'));

    const newList = favorite 
      ? objectList.filter((item) => item.id !== drinkId)
      : [...objectList, { id: drinkId }]

    localStorage.setItem('favoriteDrinks', JSON.stringify(newList));
    setFavorite(!favorite);
  };

  return (
    <button
      className="button is-white"
      data-testid="favorite-button"
      type="button" onClick={ () => handleFavorite() }
    >
      {
        favorite ? <ion-icon size="large" name="heart"></ion-icon>
        : <ion-icon size="large" name="heart-outline"></ion-icon>
      }
    </button>
  );
}

export default FavoriteButon;
import React, { useContext, useEffect, useState } from "react";
import DrinksContext from "../context/Context";
import emptyHeard from "../images/empty-heart.png";
import filledHeard from "../images/filled-heart.png";

function FavoriteButon({ drinkId }) {
  const { recipes } = useContext(DrinksContext);
  const [favorite, setFavorite] = useState();

  const isFavorite = () => {
    if (recipes) {
      const objectList = JSON.parse(localStorage.getItem("favoriteDrinks"));
      if (objectList === null) {
        const favoriteDrinks = [];
        localStorage.setItem("favoriteDrinks", JSON.stringify(favoriteDrinks));
        return setFavorite(false);
      }
      const newList = objectList.some((item) => item.id === drinkId);
      newList ? setFavorite(true) : setFavorite(false);
    }
  };

  useEffect(() => {
    isFavorite();
  }, [recipes]);

  const handleFavorite = () => {
    const objectList = JSON.parse(localStorage.getItem("favoriteDrinks"));

    const newList = favorite 
      ? objectList.filter((item) => item.id !== drinkId)
      : [...objectList, { id: drinkId }]

    localStorage.setItem("favoriteDrinks", JSON.stringify(newList));
    setFavorite(!favorite);
  };

  return (
    <button
      className="button is-white"
      data-testid="favorite-button"
      type="button" onClick={ () => handleFavorite() }
    >
      {favorite ? <ion-icon size="large" name="heart"></ion-icon> :<ion-icon size="large" name="heart-outline"></ion-icon> }
      {/* <img
        className="search-icon"
        src={ favorite ? filledHeard : emptyHeard }
        alt={ favorite ? 'filled-heart-symbol' : 'empty-heart-symbol' }
      /> */}
    </button>
  );
}

export default FavoriteButon;
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import DrinksContext from '../context/Context';
import '../css/DrinksCard.css'
import emptyHeard from '../images/empty-heart.png';
import filledHeard from '../images/filled-heart.png'

function FavoriteButon() {
  const { recipes } = useContext(DrinksContext);
  const [favorite, setFavorite] = useState();
  const history = useHistory();
  console.log('history', history);

  const isFavorite = () => {
    if (recipes) {
      const drinkId = recipes.drinks[0].idDrink;
      const objectList = JSON.parse(localStorage.getItem('favoriteDrinks'));
      if (objectList === null) {
        const favoriteDrinks = [];
        localStorage.setItem('favoriteDrinks', JSON.stringify(favoriteDrinks));
        return setFavorite(false);
      }
      const newList = objectList.some((item) => item.id === drinkId);
      newList ? setFavorite(true) : setFavorite(false);
    }
  };
  
  useEffect(() => {
    isFavorite()
  }, [recipes]);
  
  const handleFavorite = () => {
    const drinkId = recipes.drinks[0].idDrink;
    if (favorite === true) {
      const objectList = JSON.parse(localStorage.getItem('favoriteDrinks'));
      const newList = objectList.filter((item) => item.id !== drinkId);
      localStorage.setItem('favoriteDrinks', JSON.stringify(newList));
      setFavorite(false);
    }
    if (favorite === false) {
      const objectList = JSON.parse(localStorage.getItem('favoriteDrinks'));
      const newList = [...objectList, { id: drinkId }];
      localStorage.setItem('favoriteDrinks', JSON.stringify(newList));
      setFavorite(true);
    }
  };

  return (
        <button
          type="button"
          onClick={ () => handleFavorite() }
        >
          <img className="search-icon" src={ favorite ? filledHeard : emptyHeard } alt="" />
        </button>
  );
}

export default FavoriteButon;

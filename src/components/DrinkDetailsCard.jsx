import React, { useContext, useEffect, useState } from 'react';
import DrinksContext from '../context/Context';
import '../css/DrinksCard.css'
import useFetch from '../services/useFetch';
import emptyHeard from '../images/empty-heart.png';
import filledHeard from '../images/filled-heart.png'

function DrinkDetailsCard() {
  const [loading, setLoading] = useState(true);
  const { drinkDetailsFetch } = useFetch();
  const [ingredients, setIngredients] = useState();
  const [measures, setMeasures] = useState();
  const { recipes } = useContext(DrinksContext);
  const [favorite, setFavorite] = useState();
  const idDrink = (window.location.href).split('details/')[1];

  const handleIngredients = () => {
    if (recipes) {
      const arrayDrinksInfos = Object.entries(recipes.drinks[0]);
      const ingredients = arrayDrinksInfos
        .filter((row) => row[0].toLowerCase()
        .includes('stringredient') && (row[1] !== null && row[1] !== ''))

      const allMeasures = arrayDrinksInfos
        .filter((row) => row[0].toLowerCase().includes('strmeasure'));
      const measures = allMeasures.slice(0, ingredients.length);
      setIngredients(ingredients);
      setMeasures(measures);
    }
  };

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
    drinkDetailsFetch(idDrink)
      .then(() => setLoading(false))
  }, []);
  
  useEffect(() => {
    handleIngredients()
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

  if (loading) return (<div>Carregando a receita completa...</div>);
  const drink = recipes.drinks[0];

  return (
    <div>
      <div>
        <h1>{ drink.strDrink }</h1>
        { drink.strAlcoholic && <p>{ drink.strAlcoholic }</p>}
        <button
          type="button"
          onClick={ () => handleFavorite() }
        >
          <img className="search-icon" src={ favorite ? filledHeard : emptyHeard } alt="" />
        </button>
      </div>
      <img className="drink-thumb" src={ drink.strDrinkThumb } alt={ drink.strDrink }/>
      <ul> Ingredients
        {
          ingredients.map((ingredient, index) => {
            if (measures[index][1] === null) return (<li>{`${ingredient[1]}`}</li>)
            return <li>{`${ingredient[1]} - ${measures[index][1]}`}</li>
          })
        }
      </ul>
      <p>Instructions</p>
      <p>{ drink.strInstructions }</p>
    </div>
  );
}

export default DrinkDetailsCard;

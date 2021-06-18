import React, { useContext, useEffect, useState } from 'react';
import DrinksContext from '../context/Context';
import '../css/DrinksCard.css'
import useFetch from '../services/useFetch';
import FavoriteButton from './FavoriteButton';
import ShareButton from './ShareButton';

function DrinkDetailsCard() {
  const { drinkDetailsFetch } = useFetch();
  const { recipes } = useContext(DrinksContext);
  const [loading, setLoading] = useState(true);
  const [measures, setMeasures] = useState();
  const [ingredients, setIngredients] = useState();

  const idDrink = (window.location.href).split('details/')[1];

  useEffect(() => {
    drinkDetailsFetch(idDrink)
      .then(() => setLoading(false))
  }, []);

  const handleIngredients = () => {
    if (recipes && !recipes[0]) {
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
  
  useEffect(() => {
    handleIngredients()
  }, [recipes]);

  if (loading) return (<div>Carregando a receita completa...</div>);
  const drink = recipes.drinks[0];

  return (
    <div>
      <div>
        <h1>{ drink.strDrink }</h1>
        { drink.strAlcoholic && <p>{ drink.strAlcoholic }</p>}
        <FavoriteButton />
        <ShareButton />
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

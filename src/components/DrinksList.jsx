import React, { useContext, useEffect, useState } from 'react';
import DrinksContext from '../context/Context';
import useFetch from '../services/useFetch';
import DrinksCard from './DrinksCard';

function DrinksList() {
  const [loading, setLoading] = useState(true);
  const { randomDrinksFetch } = useFetch();
  const { recipes, setRecipes } = useContext(DrinksContext);
  
  useEffect(() => {
    randomDrinksFetch()
      .then(() => setLoading(false))
  }, []);
  
  if (loading) return (<div>Carregando seus drinks...</div>);

  return (
    <div className="drinks-card-container">
      {
        recipes && recipes.drinks.map((recipe) => {
        return <DrinksCard
        key={ recipe.idDrink }
        name={ recipe.strDrink }
        thumb={ recipe.strDrinkThumb }
        type="bebidas"
        id={ recipe.idDrink }
      />})
      }
    </div>
  );
}

export default DrinksList;

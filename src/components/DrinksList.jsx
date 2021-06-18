import React, { useContext, useEffect, useState } from 'react';
import DrinksContext from '../context/Context';
import useFetch from '../services/useFetch';
import DrinksCard from './DrinksCard';

function DrinksList() {
  const [loading, setLoading] = useState(true);
  const { randomDrinksFetch } = useFetch();
  const { recipes } = useContext(DrinksContext);

  useEffect(() => {
    randomDrinksFetch()
      .then(() => setLoading(false))
  }, []);
  
  if (loading) return (<div>Carregando seus drinks...</div>);

  return (
    <div className="container is-flex">
      <div className="notification">
        <div className="drinks-card-container is-justify-content-center">
          {
            recipes && recipes.drinks.map((recipe) => {
            return <DrinksCard
            key={ recipe.idDrink }
            name={ recipe.strDrink }
            thumb={ recipe.strDrinkThumb }
            id={ recipe.idDrink }
          />})
          }
        </div>
      </div>
    </div>
  );
}

export default DrinksList;

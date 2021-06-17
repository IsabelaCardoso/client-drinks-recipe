import React, { useContext, useEffect, useState } from 'react';
import DrinksContext from '../context/Context';
import '../css/DrinksCard.css'
import useFetch from '../services/useFetch';
import DrinksCard from '../components/DrinksCard';
// import DrinksList from '../components/DrinksList';
// import Header from '../components/Header';

function FavoriteDrinksPage() {
  const [loading, setLoading] = useState(true);
  const { getAllById } = useFetch();
  const { recipes } = useContext(DrinksContext);
  const [noFavorites, setNoFavorites] = useState(false);

  useEffect(() => {
    loadPage()
      .then(() => setLoading(false))
  }, []);
  
  const loadPage = async () => {
    const objectList = JSON.parse(localStorage.getItem('favoriteDrinks'));
    if (objectList === null || objectList === []) {
      return setNoFavorites(true);
    }
    await getAllById(objectList);
  }

  if (loading) return (<div>Carregando suas receitas favoritas...</div>);
  
  return (
    <>
      {recipes && recipes.map((recipe) => {
        const drink = recipe.drinks[0];
        return <DrinksCard
         key={ drink.idDrink }
         name={ drink.strDrink }
         thumb={ drink.strDrinkThumb }
         id={ drink.idDrink }
         type="favorite"
       />
      }
      )}
      <span hidden={!noFavorites}>Parece que você ainda não tem nenhum drink favorito</span>
    </>
  );
}

export default FavoriteDrinksPage;

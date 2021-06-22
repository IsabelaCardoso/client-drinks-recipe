import React, { useContext, useEffect, useState } from "react";
import DrinksContext from "../context/Context";
import useFetch from "../services/useFetch";
import DrinksCard from "../components/DrinksCard";
import Titles from "../components/Titles";
import BackToHomeArrow from "../components/BackToHomeArrow";

function FavoriteDrinksPage() {
  const [loading, setLoading] = useState(true);
  const { getAllById, getToken } = useFetch();
  const { recipes, setRecipes } = useContext(DrinksContext);
  const [noFavorites, setNoFavorites] = useState(false);

  useEffect(() => {
    const objectList = getLocalStorage()
    const token = getToken();
    if (objectList && token) {
      getDrinksById(objectList, token)
        .then(() => setLoading(false));
    }
  }, []);

  const getLocalStorage = () => {
    getToken()
    const objectList = JSON.parse(localStorage.getItem("favoriteDrinks"));
    if (objectList === [] || objectList === null) return setNoFavorites(true);
    return objectList;
  };
  
  const getDrinksById = async (objectList, token) => {
    const result = await getAllById(objectList, token);
    setRecipes(result)
  }

  if (loading) return <div>Loading your favorite recipes...</div>;

  return (
    <>
      <Titles subtitle="Favorites" />
      <BackToHomeArrow />
      <div className="container">
        <div>
          <div className="drinks-card-container is-justify-content-center">
            {recipes &&
              recipes[0] &&
              recipes.map((recipe) => {
                const drink = recipe.drinks[0];
                return (
                  <DrinksCard
                    origin="favorite-page"
                    key={drink.id}
                    name={drink.strDrink}
                    thumb={drink.strDrinkThumb}
                    id={drink.id}
                    type="favorite"
                  />
                );
              })}
          </div>
        </div>
      </div>
      <span hidden={!noFavorites} className="notification is-warning">
        Looks like you don't have any favorite drinks yet
      </span>
    </>
  );
}

export default FavoriteDrinksPage;

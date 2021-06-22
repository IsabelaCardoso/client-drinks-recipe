import React, { useContext, useEffect, useState } from "react";
import DrinksContext from "../context/Context";
import useFetch from "../services/useFetch";
import DrinksCard from "../components/DrinksCard";
import Titles from "../components/Titles";
import BackToHomeArrow from "../components/BackToHomeArrow";

function FavoriteDrinksPage() {
  const [loading, setLoading] = useState(true);
  const { getAllById } = useFetch();
  const { recipes, setRecipes } = useContext(DrinksContext);
  const [noFavorites, setNoFavorites] = useState(false);

  useEffect(() => {
    const objectList = getLocalStorage()
    if (objectList) {
      getAllById(objectList)
        .then((result) => setRecipes(result))
        .then(() => setLoading(false));
    }
  }, []);

  const getLocalStorage = () => {
    const objectList = JSON.parse(localStorage.getItem("favoriteDrinks"));
    if (objectList === [] || objectList === null) return setNoFavorites(true);
    return objectList;
  };

  if (loading) return <div>Loading your favorite recipes...</div>;

  return (
    <>
      <Titles subtitle="Favorites" />
      <BackToHomeArrow />
      <div className="container">
        <div>
          <div className="drinks-card-container is-justify-content-center">
            {recipes && recipes.map((recipe) => (
                  <DrinksCard
                    origin="favorite-page"
                    key={recipe.id}
                    name={recipe.name}
                    thumb={recipe.image}
                    id={recipe.id}
                    type="favorite"
                  />
                ))}
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

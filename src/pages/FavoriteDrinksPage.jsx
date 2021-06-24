import React, { useContext, useEffect, useState } from "react";
import DrinksContext from "../context/Context";
import useFetch from "../services/useFetch";
import DrinksCard from "../components/DrinksCard";
import BackToHomeArrow from "../components/BackToHomeArrow";
import Header from "../components/Header";

function FavoriteDrinksPage({ history }) {
  const [loading, setLoading] = useState(true);
  const { getAllById } = useFetch();
  const { recipes, setRecipes } = useContext(DrinksContext);
  const [noFavorites, setNoFavorites] = useState(false);

  const getLocalStorage = () => {
    const objectList = JSON.parse(localStorage.getItem("favoriteDrinks"));
    if (objectList.length === 0 || objectList === null) setNoFavorites(true);
    return objectList;
  };
  useEffect(() => {
    const objectList = getLocalStorage()
    if (objectList) {
      getAllById(objectList)
        .then((result) => setRecipes(result))
        .then(() => setLoading(false));
    }
  }, []);

  if (loading) return <div>Loading your favorite recipes...</div>;

  return (
    <>
      <Header history={ history } subtitle="Favorites" />
      <BackToHomeArrow />
      <div className="container">
        <div>
          <div className="drinks-card-container is-justify-content-center">
            {recipes && recipes.map((recipe) => (
                  <DrinksCard
                    key={recipe.id}
                    origin="favorite-page"
                    name={recipe.name}
                    thumb={recipe.image}
                    id={recipe.id}
                    type="favorite"
                  />
                ))}
          </div>
        </div>
      </div>
      <p hidden={!noFavorites} className="notification is-warning">
        Looks like you don't have any favorite drinks yet
      </p>
    </>
  );
}

export default FavoriteDrinksPage;

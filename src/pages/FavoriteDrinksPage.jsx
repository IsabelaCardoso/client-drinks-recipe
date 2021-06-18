import React, { useContext, useEffect, useState } from "react";
import DrinksContext from "../context/Context";
import useFetch from "../services/useFetch";
import DrinksCard from "../components/DrinksCard";
import { Link } from "react-router-dom";
import backArrow from "../images/backArrow.png";
import Titles from "../components/Titles";

function FavoriteDrinksPage() {
  const [loading, setLoading] = useState(true);
  const { getAllById } = useFetch();
  const { recipes } = useContext(DrinksContext);
  const [noFavorites, setNoFavorites] = useState(false);

  useEffect(() => {
    loadPage().then(() => setLoading(false));
  }, []);

  const loadPage = async () => {
    const objectList = JSON.parse(localStorage.getItem("favoriteDrinks"));
    console.log("obgeee", objectList);
    if (objectList === [] || objectList === null) setNoFavorites(true);
    await getAllById(objectList);
  };

  if (loading) return <div>Loading your favorite recipes...</div>;

  return (
    <>
      <Titles subtitle="Favoritos" />
      <Link to="/">
        <img
          className="arrow-icon"
          src={backArrow}
          alt="black arrow pointing left, go back"
        />
      </Link>
      <div className="container is-flex">
        <div className="notification">
          <div className="drinks-card-container is-justify-content-center">
            {recipes &&
              recipes[0] &&
              recipes.map((recipe) => {
                const drink = recipe.drinks[0];
                return (
                  <DrinksCard
                    key={drink.idDrink}
                    name={drink.strDrink}
                    thumb={drink.strDrinkThumb}
                    id={drink.idDrink}
                    type="favorite"
                  />
                );
              })}
          </div>
        </div>
      </div>
      <span hidden={!noFavorites} class="notification is-warning">
        Looks like you don't have any favorite drinks yet
      </span>
    </>
  );
}

export default FavoriteDrinksPage;

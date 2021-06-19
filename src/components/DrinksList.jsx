import React, { useContext, useEffect, useState } from "react";
import DrinksContext from "../context/Context";
import useFetch from "../services/useFetch";
import DrinksCard from "./DrinksCard";

function DrinksList() {
  const [loading, setLoading] = useState(true);
  const { randomDrinksFetch } = useFetch();
  const {
    recipes,
    setRecipes,
    oneWordHidden,
    setOneWordHidden,
    noRecipesMessage,
    setNoRecipesMessage,
    setCategoryRequired,
    categoryRequired,
  } = useContext(DrinksContext);

  useEffect(() => {
    randomDrinksFetch()
    .then((result) => setRecipes(result))
    .then(() => setLoading(false));
  }, []);

  if (loading) return <div>Carregando seus drinks...</div>;
  return (
    <div>
      <div className="container is-flex is-justify-content-flex-end">
        <div className="notification">
          <span hidden={!oneWordHidden} className="notification is-warning">
            <button
              onClick={() => setOneWordHidden(false)}
              className="delete"
            ></button>
            Sua busca deve conter apenas uma letra.
          </span>

          <span hidden={!noRecipesMessage} className="notification is-warning">
            <button
              onClick={() => setNoRecipesMessage(!noRecipesMessage)}
              className="delete"
            ></button>
            Desculpe, não encontramos nenhuma receita para o filtro selecionado.
            Tente novamente.
          </span>
          <span hidden={!categoryRequired} className="notification is-warning">
            <button
              onClick={() => setCategoryRequired(!categoryRequired)}
              className="delete"
            ></button>
            Por favor escolha uma categoria.
          </span>
        </div>
      </div>
      <div className="container is-flex">
        <div className="notification">
          <div className="drinks-card-container is-justify-content-center">
            {!noRecipesMessage &&
              recipes.drinks.map((recipe) => {
                return (
                  <DrinksCard
                    origin="home-page"
                    key={recipe.idDrink}
                    name={recipe.strDrink}
                    thumb={recipe.strDrinkThumb}
                    id={recipe.idDrink}
                  />
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DrinksList;

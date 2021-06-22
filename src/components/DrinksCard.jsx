import React from "react";
import { Link } from "react-router-dom";
import FavoriteButon from "./FavoriteButton";

function DrinksCard({ origin, name, thumb, id }) {
  return (
    <div className="card">
      <Link data-testid={ name } className="link" to={`/details/${id}`}>
        <div className="card-image">
            <img
              className="drink-thumb"
              src={ thumb }
              alt={`Drink called ${ name }`}
            />
        </div>
        <div className="media">
          <div className="media-content">
            <p className="title test is-4">{ name }</p>
          </div>
        </div>
      </Link>
      {(origin === 'favorite-page') && <FavoriteButon drinkId={ id } />}
    </div>
  );
}

export default DrinksCard;

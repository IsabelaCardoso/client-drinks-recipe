import React from 'react';
import { Link } from 'react-router-dom';
import '../css/DrinksCard.css'

function DrinksCard({ name, thumb, id, favorite }) {
  return (
    <Link to={`/details/${id}`}>
      <div
        id={ id }
        className="drink-card"
        >
        <img className="drink-thumb" src={thumb} alt={`Drink called ${name}`} />
        <p>{ name }</p>
        {/* {favorite && <FavoriteHeart />} */}
      </div>
    </Link>
  );
}

export default DrinksCard;

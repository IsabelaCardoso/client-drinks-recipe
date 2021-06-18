import React from 'react';
import { Link } from 'react-router-dom';

function DrinksCard({ name, thumb, id, favorite }) {
  return (
    <div className="card">
      <Link className="link" to={`/details/${id}`}>
      <div className="card-image">
        <figure className="image">
          <img className="drink-thumb" src={thumb} alt={`Drink called ${name}`} />
          </figure>
        </div>
        <div className="media">
          <div className="media-content">
            <p className="title test is-4">{ name }</p>
          </div>
      </div>
      </Link>
    </div>
  );
}

export default DrinksCard;

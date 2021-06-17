import React from 'react';
import { Link } from 'react-router-dom';
import DrinkDetails from '../components/DrinkDetailsCard';
import backArrow from '../images/backArrow.png'

function DetailsPage() {
  return (
    <>
      <Link to="/">
        <img className="arrow-icon" src={ backArrow } alt="black arrow pointing left, go back" />
      </Link>
      <DrinkDetails />
    </>
  );
}

export default DetailsPage;

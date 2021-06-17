import React, { useContext, useState } from 'react';
import SearchBar from './SearchBar';
import searchIcon from '../images/searchIcon.png'
import '../css/SearchIcon.css'
import { Link, Redirect } from 'react-router-dom';
import DrinksContext from '../context/Context';
import ShareButton from './ShareButton';

function Header() {
  const [searchBar, setSearchBar] = useState(false);
  const { setRecipes } = useContext(DrinksContext);

  // const handleClick = () => {
  //   setRecipes('null');
  //   return (<Redirect path="/favorite" />);
  // }

  return (
    <>
      <h1>Drinks Recipes</h1>
      <Link to="/favorite">
        <button
          type="button"
          // onClick={() => handleClick()}
        >
          Favorite Drinks
        </button>
      </Link>
      <ShareButton />
      <p
        type="button"
        onClick={ () => setSearchBar(!searchBar) }
      >
        <img
          className="search-icon"
          src={ searchIcon }
          alt="botão com desenho de uma lupa"
        />
      </p>
        {searchBar && <SearchBar />}
    </>
  );
}

export default Header;

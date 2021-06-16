import React, { useState } from 'react';
import SearchBar from './SearchBar';
import searchIcon from '../images/searchIcon.png'
import '../css/SearchIcon.css'

function Header() {
  const [searchBar, setSearchBar] = useState(false);

  return (
    <>
      <h1>Drinks Recipes</h1>
      <button
        type="button"
        onClick={ () => setSearchBar(!searchBar) }
      >
        <img
          className="search-icon"
          src={ searchIcon }
          alt="botão com desenho de uma lupa"
        />
      </button>
        {searchBar && <SearchBar />}
    </>
  );
}

export default Header;

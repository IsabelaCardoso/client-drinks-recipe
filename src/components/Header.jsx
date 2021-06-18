import React, { useContext, useState } from "react";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";
import DrinksContext from "../context/Context";
import ShareButton from "./ShareButton";
import logoDrinks from "../images/logo-drinks.png";
import Titles from "./Titles";

function Header({ subtitle }) {
  const [searchBar, setSearchBar] = useState(false);
  const { setRecipes } = useContext(DrinksContext);

  return (
    <div>
      <Titles subtitle={subtitle} />
      <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
          <div class="navbar-item">
            <img src={logoDrinks} alt="" />
          </div>
        </div>
        <div id="navbarBasicExample" class="navbar-menu">
          <div class="navbar-start">
            <p class="navbar-item">
              <Link to="/">Página Principal</Link>
            </p>
            <p class="navbar-item">
              <Link to="/favorite">Drinks favoritos</Link>
            </p>
          </div>
          <div class="navbar-end">
            <div class="navbar-item">
              <div class="buttons">
                <button
                  onClick={() => setSearchBar(!searchBar)}
                  class="button is-primary"
                >
                  <strong>Pesquisar</strong>
                </button>
                {searchBar && <SearchBar />}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;

import React, { useContext, useState } from "react";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";
import DrinksContext from "../context/Context";
import ShareButton from "./ShareButton";
import Titles from "./Titles";

function Header({ subtitle }) {
  const [searchBar, setSearchBar] = useState(false);
  const { setRecipes } = useContext(DrinksContext);

  return (
    <div>
      <Titles subtitle={subtitle} />
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            <p className="navbar-item">
              <Link to="/">Home</Link>
            </p>
            <p className="navbar-item">
              <Link to="/favorite">Favorite Drinks</Link>
            </p>
          </div>
          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <button
                  onClick={() => setSearchBar(!searchBar)}
                  className="button is-primary"
                >
                  <strong>Search</strong>
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

import React, { useState } from "react";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";
import Titles from "./Titles";
import useFetch from "../services/useFetch";

function Header({ history, subtitle }) {
  const [searchBar, setSearchBar] = useState(false);
  const { randomDrinksFetch } = useFetch();

  const originPath = history.location.pathname;

  return (
    <div className="mb-3">
      <Titles subtitle={subtitle} />
      <nav
        className="navbar is-flex is-flex-direction-column"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-menu has-background-grey-darker">
          <div className="navbar-start">
            <p className="navbar-item">
              <Link to="/" onClick={() => randomDrinksFetch()}>
                Home
              </Link>
            </p>
            <p className="navbar-item">
              <Link to="/favorite">Favorite Drinks</Link>
            </p>
            <p className="navbar-item">
              <Link to="/create">Create Drink</Link>
            </p>
          </div>
          <div className="navbar-end">
            <p className="navbar-item">
              <Link to="/login">Login</Link>
            </p>
            <p className="navbar-item">
              <Link to="/register">Register</Link>
            </p>
          </div>
        </div>
        <div className="navbar-end">
          { originPath === '/' && 
          <div className="navbar-item is-align-items-flex-start">
            <button
              onClick={() => setSearchBar(!searchBar)}
              className="button search-button is-outlined m-0 mr-2"
            >
              <strong>Search</strong>
            </button>
            {searchBar && <SearchBar />}
          </div>
          }
        </div>
      </nav>
    </div>
  );
}

export default Header;

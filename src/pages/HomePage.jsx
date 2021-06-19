import React from "react";
import DrinksList from "../components/DrinksList";
import Header from "../components/Header";

function HomePage() {
  return (
    <div className="container is-fluid">
      <Header subtitle="Home Page" />
      <div className="notification">
        <DrinksList />
      </div>
    </div>
  );
}

export default HomePage;

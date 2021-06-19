import React from "react";
import DrinksList from "../components/DrinksList";
import Header from "../components/Header";

function HomePage() {
  return (
    <div className="container home-page is-fluid">
      <Header subtitle="Home Page" />
      <div>
        <DrinksList />
      </div>
    </div>
  );
}

export default HomePage;

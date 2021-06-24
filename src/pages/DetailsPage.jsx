import React from "react";
import BackToHomeArrow from "../components/BackToHomeArrow";
import DrinkDetailsCard from "../components/DrinkDetailsCard";
import Header from "../components/Header";
import Titles from "../components/Titles";

function DetailsPage({ history }) {
  return (
    <div className="container home-page is-fluid">
      <Header history={ history } subtitle="Complete Recipe" />
      <BackToHomeArrow />
      <DrinkDetailsCard history={ history } />
    </div>
  );
}

export default DetailsPage;

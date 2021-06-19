import React from "react";
import { Link } from "react-router-dom";
import DrinkDetailsCard from "../components/DrinkDetailsCard";
import Titles from "../components/Titles";
import backArrow from "../images/backArrow.png";

function DetailsPage() {
  return (
    <>
      <Titles subtitle="Complete Recipe" />
      <Link to="/">
        <img
          className="arrow-icon"
          src={backArrow}
          alt="black arrow pointing left, go back"
        />
      </Link>
      <DrinkDetailsCard />
    </>
  );
}

export default DetailsPage;

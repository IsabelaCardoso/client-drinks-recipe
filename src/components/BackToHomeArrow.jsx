import React from "react";
import { Link } from "react-router-dom";

function BackArrow() {
  return (
    <Link to='/'>
      <button
        className="button is-white mb-3"
        data-testid="share-button"      
        type="button"
      >
        <ion-icon
          alt="black arrow pointing left, go back"
          size="large"
          name="arrow-back"
        ></ion-icon>
        <p>Back to Home</p>
      </button>
    </Link>
  );
}

export default BackArrow;

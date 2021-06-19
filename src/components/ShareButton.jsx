import React, { useState } from "react";
import shareIcon from "../images/shareIcon.png";

function ShareButton() {
  const [copied, setCopied] = useState(true);

  const clipBoard = (e) => {
    const url = window.location.href;
    setCopied(false);
    navigator.clipboard.writeText(url);
    setTimeout(() => setCopied(true), 1500);
  };

  return (
    <>
      <button
        class="button is-white"
        data-testid="share-button"      
        type="button"
        onClick={(e) => clipBoard(e)}
      >
        <ion-icon size="large" name="share-social-outline"></ion-icon>
        {/* <img src={shareIcon} alt="share icon" className="icon" /> */}
      </button>
      <span hidden={copied}>Link copied!</span>
    </>
  );
}

export default ShareButton;

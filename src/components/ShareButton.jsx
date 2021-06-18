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
      <button type="button" onClick={(e) => clipBoard(e)}>
        <img src={shareIcon} alt="share icon" className="icon" />
      </button>
      <span hidden={copied}>Link copiado!</span>
    </>
  );
}

export default ShareButton;

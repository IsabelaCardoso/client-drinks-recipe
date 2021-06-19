import React from "react";

function Titles({ subtitle }) {
  return (
    <section className="hero">
      <div className="hero-body">
        <p className="title">Best Drinks</p>
        <p className="subtitle">{subtitle}</p>
      </div>
    </section>
  );
}

export default Titles;

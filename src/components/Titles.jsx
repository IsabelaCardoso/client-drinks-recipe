import React from "react";

function Titles({ subtitle }) {
  return (
    <section class="hero">
      <div class="hero-body">
        <p class="title">Best Drinks</p>
        <p class="subtitle">{subtitle}</p>
      </div>
    </section>
  );
}

export default Titles;

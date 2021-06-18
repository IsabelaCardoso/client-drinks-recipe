import React from 'react';
import DrinksList from '../components/DrinksList';
import Header from '../components/Header';

function HomePage() {
  return (
    <div class="container is-fluid">
      <Header />
      <div class="notification">
        <DrinksList />
      </div>
    </div>
  );
}

export default HomePage;

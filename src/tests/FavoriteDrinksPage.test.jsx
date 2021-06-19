import React from 'react';
import renderWithRouter from './helper/renderWithRouter';
import Provider from '../context/Provider';
import FavoriteDrinksPage from '../pages/FavoriteDrinksPage';
import recipesLocalStorage from './helper/fixtures/recipesLocalStorage';
import LocalStorageMock from './helper/localStorage';
import { cleanup } from '@testing-library/react';

describe('Tests the FavoriteDrinksPage elements', () => {

  beforeEach(() => {
    global.localStorage = new LocalStorageMock();
    localStorage.setItem('favoriteDrinks', JSON.stringify(recipesLocalStorage));
  });
  afterEach(cleanup);

  it('should get items from LocalStorage and render', async() => {
    const { findByText } = renderWithRouter(<Provider><FavoriteDrinksPage /></Provider>);
    const drinkGG = await findByText('GG');
    const drinkA1 = await findByText('A1');
    expect(drinkGG).toBeInTheDocument();
    expect(drinkA1).toBeInTheDocument();
  });

  it('test if the card link redirects to the details page', async() => {
    const { findByTestId } = renderWithRouter(<Provider><FavoriteDrinksPage /></Provider>);
    const linkDrinkGG = await findByTestId('GG');
    expect(linkDrinkGG.getAttribute('href')).toBe('/details/15997');
  });

  it('test if the favorite buttons appears on the page', async () => {
    const { findAllByTestId } = renderWithRouter(<Provider><FavoriteDrinksPage /></Provider>);
    const favoriteButton = await findAllByTestId('favorite-button');
    expect(favoriteButton).toBeTruthy();
    expect(favoriteButton.length).toEqual(2);
  });

  it('test if the correct subtitle is on the page', async() => {
    const { findByText } = renderWithRouter(<Provider><FavoriteDrinksPage /></Provider>);
    const subtitle = await findByText('Favorites');
    expect(subtitle).toBeInTheDocument();
  });
});

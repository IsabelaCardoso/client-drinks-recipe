import React from 'react';
import renderWithRouter from './helper/renderWithRouter';
import { cleanup, fireEvent } from '@testing-library/react';
import Provider from '../context/Provider';
import FavoriteDrinksPage from '../pages/FavoriteDrinksPage';
import DetailsPage from '../pages/DetailsPage';
import DrinksList from '../components/DrinksList';
import recipes from './helper/fixtures/recipes';
import drink from './helper/fixtures/drinkDetailsRecipe';

describe('Tests the DetailsPage elements', () => {
  beforeEach(async() => {
    global.window = Object.create(window);
    const url = "http://localhost:3000/details/15997";
    Object.defineProperty(window, 'location', {
      value: {
        href: url
      }
    });
  });
  afterEach(cleanup);
  
  it('render the recipe corresponding to the url id', async() => {
    const { findByText } = renderWithRouter(<Provider><DetailsPage /></Provider>);
    jest.fn().mockReturnValue(drink);
    const idInTheUrl = window.location.href.split("details/")[1];
    const idInTheDrinkLoaded = drink.drinks[0].id;
    const titleDrinkGG = await findByText('GG');
    expect(idInTheUrl).toEqual(idInTheDrinkLoaded);
    expect(titleDrinkGG).toBeInTheDocument();
  });

  it('render the "Ingredients" list and "Instructions"', async() => {
    const { findByText } = renderWithRouter(<Provider><DetailsPage /></Provider>);
    jest.fn().mockReturnValue(drink);

    const ingredientsList = await findByText('Ingredients');
    const instructions = await findByText('Instructions');
    expect(ingredientsList).toBeInTheDocument();
    expect(instructions).toBeInTheDocument();
  });

  it('test if the favorite button appears on the page', async () => {
    const { findByTestId } = renderWithRouter(<Provider><DetailsPage /></Provider>);
    jest.fn().mockReturnValue(drink);

    const favoriteButton = await findByTestId('favorite-button');
    expect(favoriteButton).toBeInTheDocument();
  });

  it('test if the share button appears on the page', async () => {
    const { findByTestId } = renderWithRouter(<Provider><DetailsPage /></Provider>);
    jest.fn().mockReturnValue(drink);

    const shareButton = await findByTestId('share-button');
    expect(shareButton).toBeInTheDocument();
  });

  it('test if the drink is alcoholic or not', async () => {
    const { findByTestId } = renderWithRouter(<Provider><DetailsPage /></Provider>);
    jest.fn().mockReturnValue(drink);

    const drinksType = await findByTestId('drink-alcoholic-or-not');
    expect(drinksType).toBeInTheDocument();
  });

  // it('test if when click on share button, the message "Link copied" appears', async () => {
  //   const { findByTestId, findByText } = renderWithRouter(<Provider><DetailsPage /></Provider>);
  //   jest.fn().mockReturnValue(drink);
  //   const shareButton = await findByTestId('share-button');
  //   fireEvent.click(shareButton);

  //   const messageLinkCopied = await findByText('Link copied');
  //   expect(messageLinkCopied).toBeInTheDocument();
  // });
});

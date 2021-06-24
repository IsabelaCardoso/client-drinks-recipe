import React from 'react';
import renderWithRouter from './helper/renderWithRouter';
import { cleanup } from '@testing-library/react';
import Provider from '../context/Provider';
import DetailsPage from '../pages/DetailsPage';
import drink from './helper/fixtures/drinkDetailsRecipe';
import { createMemoryHistory } from 'history';

describe('Tests the DetailsPage elements', () => {
  beforeEach(async() => {
    global.window = Object.create(window);
    const url = "http://localhost:3000/details/11";
    Object.defineProperty(window, 'location', {
      value: {
        href: url
      }
    });
  });
  afterEach(cleanup);
  
  it('render the recipe corresponding to the url id', async() => {
    const history = createMemoryHistory()
    const { findByText } = renderWithRouter(<Provider><DetailsPage history={ history } /></Provider>);
    jest.fn().mockReturnValue(drink);
    const idInTheUrl = parseInt(window.location.href.split("details/")[1]);
    const idInTheDrinkLoaded = drink.id;
    const titleDrinkGG = await findByText('GG');
    expect(idInTheUrl).toEqual(idInTheDrinkLoaded);
    expect(titleDrinkGG).toBeInTheDocument();
  });

  it('render the "Ingredients" list and "Instructions"', async() => {
    const history = createMemoryHistory()
    const { findByText } = renderWithRouter(<Provider><DetailsPage history={ history } /></Provider>);
    jest.fn().mockReturnValue(drink);

    const ingredientsList = await findByText('Ingredients');
    const instructions = await findByText('Instructions');
    expect(ingredientsList).toBeInTheDocument();
    expect(instructions).toBeInTheDocument();
  });

  it('test if the favorite button appears on the page', async () => {
    const history = createMemoryHistory()
    const { findByTestId } = renderWithRouter(<Provider><DetailsPage history={ history } /></Provider>);
    jest.fn().mockReturnValue(drink);

    const favoriteButton = await findByTestId('favorite-button');
    expect(favoriteButton).toBeInTheDocument();
  });

  it('test if the share button appears on the page', async () => {
    const history = createMemoryHistory()
    const { findByTestId } = renderWithRouter(<Provider><DetailsPage history={ history } /></Provider>);
    jest.fn().mockReturnValue(drink);

    const shareButton = await findByTestId('share-button');
    expect(shareButton).toBeInTheDocument();
  });

  it('test if the drink has a category', async () => {
    const history = createMemoryHistory()
    const { findByTestId } = renderWithRouter(<Provider><DetailsPage history={ history } /></Provider>);
    jest.fn().mockReturnValue(drink);

    const drinksType = await findByTestId('drink-category');
    expect(drinksType).toBeInTheDocument();
  });

  it('test if the `Edit Drink` button exist', async () => {
    const history = createMemoryHistory()
    const { findByText } = renderWithRouter(<Provider><DetailsPage history={ history } /></Provider>);
    const editButton = await findByText('Edit Drink');
    expect(editButton).toBeInTheDocument();
  });

  it('test if the `Delete Drink` button exist', async () => {
    const history = createMemoryHistory()
    const { findByText } = renderWithRouter(<Provider><DetailsPage history={ history } /></Provider>);
    const deleteButton = await findByText('Delete Drink');
    expect(deleteButton).toBeInTheDocument();
  });

  it('test if the `Edit Drink` link redirects to the URL `/edit/:id`', async() => {
    const history = createMemoryHistory()
    const { findByTestId } = renderWithRouter(<Provider><DetailsPage history={ history } /></Provider>);
    const idInTheUrl = parseInt(window.location.href.split("details/")[1]);
    const editLink = await findByTestId('edit-link');
    expect(editLink.getAttribute('href')).toBe(`/edit/${idInTheUrl}`);
  });
});

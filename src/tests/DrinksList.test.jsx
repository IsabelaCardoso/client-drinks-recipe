import React from 'react';
import renderWithRouter from './helper/renderWithRouter';
import recipes from './helper/recipes';
import DrinksList from '../components/DrinksList';
import Provider from '../context/Provider';

describe('Tests the DrinksList elements', () => {
  it('renders random drinks cards, with name and image', async() => {
    const { findByText, getByAltText } = renderWithRouter(<Provider><DrinksList /></Provider>);
    jest.fn().mockReturnValue(recipes);
    const drinkGG = await findByText("GG");
    const drink747 = await findByText("747");
    const drinkKir = await findByText("Kir");
    const drinkABC = await findByText("ABC");
    const drinkA1 = await findByText("A1");
    expect(drinkGG).toBeInTheDocument();
    expect(drink747).toBeInTheDocument();
    expect(drinkKir).toBeInTheDocument();
    expect(drinkABC).toBeInTheDocument();
    expect(drinkA1).toBeInTheDocument();

    const altTextdrinkGG = getByAltText("Drink called GG");
    const altTextdrink747 = getByAltText("Drink called 747");
    const altTextdrinkKir = getByAltText("Drink called Kir");
    const altTextdrinkABC = getByAltText("Drink called ABC");
    const altTextdrinkA1 = getByAltText("Drink called A1");
    expect(altTextdrinkGG).toBeInTheDocument();
    expect(altTextdrink747).toBeInTheDocument();
    expect(altTextdrinkKir).toBeInTheDocument();
    expect(altTextdrinkABC).toBeInTheDocument();
    expect(altTextdrinkA1).toBeInTheDocument();
  });

  // it('renders the correct title and subtitle', async () => {
  //   const { findByText } = renderWithRouter(<Provider><DrinksList /></Provider>);
  //   const title = await findByText('Best Drinks');
  //   const subtitle = await findByText('Home Page');
  //   expect(title).toBeInTheDocument();
  //   expect(subtitle).toBeInTheDocument();
  // })
});

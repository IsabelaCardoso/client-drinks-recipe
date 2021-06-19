import React from 'react';
import renderWithRouter from './helper/renderWithRouter';
import recipes from './helper/fixtures/recipes';
import DrinksList from '../components/DrinksList';
import Provider from '../context/Provider';
import { cleanup } from '@testing-library/react';

describe('Tests the DrinksList elements', () => {

  afterEach(cleanup);

  it('renders random drinks cards, with name and image', async() => {
    const { findByText, getByAltText } = renderWithRouter(<Provider><DrinksList /></Provider>);
    jest.fn().mockReturnValue(recipes);
    
    recipes['drinks'].forEach(async(drinkRecipe) => {
      const drinkName = drinkRecipe['strDrink'];
      const drinkLabel = await findByText("GG");
      expect(drinkLabel).toBeInTheDocument();

      const drinkAltText = getByAltText(`Drink called ${drinkName}`);
      expect(drinkAltText).toBeInTheDocument();
    })
  });

  // it('renders the correct title and subtitle', async () => {
  //   const { findByText } = renderWithRouter(<Provider><DrinksList /></Provider>);
  //   const title = await findByText('Best Drinks');
  //   const subtitle = await findByText('Home Page');
  //   expect(title).toBeInTheDocument();
  //   expect(subtitle).toBeInTheDocument();
  // })
});

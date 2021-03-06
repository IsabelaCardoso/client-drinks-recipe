import React from 'react';
import renderWithRouter from './helper/renderWithRouter';
import recipes from './helper/fixtures/recipes';
import DrinksList from '../components/DrinksList';
import Provider from '../context/Provider';
import { cleanup } from '@testing-library/react';

describe('Tests the DrinksList elements', () => {

  afterEach(cleanup);

  it('renders random drinks cards', async() => {
    const { findByText, getByAltText } = renderWithRouter(<Provider><DrinksList /></Provider>);
    jest.fn().mockReturnValue(recipes);
    
    recipes.forEach(async(drinkRecipe) => {
      const drinkName = drinkRecipe['name'];
      const drinkLabel = await findByText("GG");
      expect(drinkLabel).toBeInTheDocument();

      const drinkAltText = getByAltText(`Drink called ${drinkName}`);
      expect(drinkAltText).toBeInTheDocument();
    })
  });
});

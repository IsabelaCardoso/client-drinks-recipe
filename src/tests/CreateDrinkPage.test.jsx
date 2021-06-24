import React from 'react';
import renderWithRouter from './helper/renderWithRouter';
import { cleanup } from '@testing-library/react';
import Provider from '../context/Provider';
import drink from './helper/fixtures/drinkDetailsRecipe';
import { createMemoryHistory } from 'history';
import CreateDrinkPage from '../pages/CreateDrinkPage';

describe('Tests the CreateDrink Page elements', () => {
  beforeEach(async() => {
    global.window = Object.create(window);
    const url = "http://localhost:3000/create";
    Object.defineProperty(window, 'location', {
      value: {
        href: url
      }
    });
  });
  afterEach(cleanup);
  const history = createMemoryHistory({ initialEntries: ['/home'] });
  
  it('render a input with label Name', async() => {
    const { findByLabelText } = renderWithRouter(<Provider><CreateDrinkPage history={ history } /></Provider>);
    const name = await findByLabelText('Name');

    expect(name).toBeInTheDocument();
  });

  it('render a input with label Instructions', async() => {
    const { findByLabelText } = renderWithRouter(<Provider><CreateDrinkPage history={ history } /></Provider>);
    const input = await findByLabelText('Instructions');

    expect(input).toBeInTheDocument();
  });

  it('render a input with label Category', async() => {
    const { findByLabelText } = renderWithRouter(<Provider><CreateDrinkPage history={ history } /></Provider>);
    const input = await findByLabelText('Category');

    expect(input).toBeInTheDocument();
  });

  it('render a input with label Image Path', async() => {
    const { findByLabelText } = renderWithRouter(<Provider><CreateDrinkPage history={ history } /></Provider>);
    const input = await findByLabelText('Image Path');

    expect(input).toBeInTheDocument();
  });

  it('render six inputs with label Ingredient', async() => {
    const { findAllByLabelText } = renderWithRouter(<Provider><CreateDrinkPage history={ history } /></Provider>);
    const inputs = await findAllByLabelText('Ingredient');

    expect(inputs.length === 6).toBeTruthy();
  });

  it('render six inputs with label Measure', async() => {
    const { findAllByLabelText } = renderWithRouter(<Provider><CreateDrinkPage history={ history } /></Provider>);
    const inputs = await findAllByLabelText('Measure');

    expect(inputs.length === 6).toBeTruthy();
  });
});

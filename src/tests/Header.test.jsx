import React from 'react';
import renderWithRouter from './helper/renderWithRouter';
import Provider from '../context/Provider';
import Header from '../components/Header';
import { fireEvent } from '@testing-library/react';

describe('Tests the Header elements', () => {
  it('test if the `Home` link redirects to the URL `/`', async() => {
    const { findByText } = renderWithRouter(<Provider><Header /></Provider>);
    const homeLink = await findByText('Home');
    expect(homeLink.getAttribute('href')).toBe('/');
  });

  it('test if the `Favorite Drinks` link redirects to the URL `/favorite`', async() => {
    const { findByText } = renderWithRouter(<Provider><Header /></Provider>);
    const favoriteLink = await findByText('Favorite Drinks');
    expect(favoriteLink.getAttribute('href')).toBe('/favorite');
  });

  it('test if the `Search` button exist', async() => {
    const { findByText } = renderWithRouter(<Provider><Header /></Provider>);
    const searchButton = await findByText('Search');
    expect(searchButton).toBeInTheDocument();
  });

  it('test if when you click the button, the search form appears', async() => {
    const { findByText, findByTestId } = renderWithRouter(<Provider><Header /></Provider>);
    const searchButton = await findByText('Search');
    fireEvent.click(searchButton);
    const searchForm = await findByTestId('search-form');
    const radioSearchFirstLetter = await findByText('First Letter');
    const radioSearchName = await findByText('Name');
    
    expect(searchForm).toBeInTheDocument();
    expect(radioSearchFirstLetter).toBeInTheDocument();
    expect(radioSearchName).toBeInTheDocument();
  });
});

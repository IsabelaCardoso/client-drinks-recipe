import React from 'react';
import renderWithRouter from './helper/renderWithRouter';
import Provider from '../context/Provider';
import Header from '../components/Header';
import { fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';

describe('Tests the Header elements', () => {
  it('test if the `Home` link redirects to the URL `/`', async() => {
    const history = createMemoryHistory()
    const { findByText } = renderWithRouter(<Provider><Header history={ history } /></Provider>);
    const homeLink = await findByText('Home');
    expect(homeLink.getAttribute('href')).toBe('/');
  });

  it('test if the `Favorite Drinks` link redirects to the URL `/favorite`', async() => {
    const history = createMemoryHistory()
    const { findByText } = renderWithRouter(<Provider><Header history={ history } /></Provider>);
    const favoriteLink = await findByText('Favorite Drinks');
    expect(favoriteLink.getAttribute('href')).toBe('/favorite');
  });

  it('test if the `Create Drink` link redirects to the URL `/create`', async() => {
    const history = createMemoryHistory()
    const { findByText } = renderWithRouter(<Provider><Header history={ history } /></Provider>);
    const favoriteLink = await findByText('Create Drink');
    expect(favoriteLink.getAttribute('href')).toBe('/create');
  });

  it('test if the `Login` link redirects to the URL `/login`', async() => {
    const history = createMemoryHistory()
    const { findByText } = renderWithRouter(<Provider><Header history={ history } /></Provider>);
    const favoriteLink = await findByText('Login');
    expect(favoriteLink.getAttribute('href')).toBe('/login');
  });

  it('test if the `Register` link redirects to the URL `/register`', async() => {
    const history = createMemoryHistory()
    const { findByText } = renderWithRouter(<Provider><Header history={ history } /></Provider>);
    const favoriteLink = await findByText('Register');
    expect(favoriteLink.getAttribute('href')).toBe('/register');
  });

  it('test if the `Search` button exist', async() => {
    const history = createMemoryHistory()
    const { findByText } = renderWithRouter(<Provider><Header history={ history } /></Provider>);
    const searchButton = await findByText('Search');
    expect(searchButton).toBeInTheDocument();
  });

  it('test if when you click the button, the search form appears', async() => {
    const history = createMemoryHistory()
    const { findByText, findByTestId } = renderWithRouter(<Provider><Header history={ history } /></Provider>);
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

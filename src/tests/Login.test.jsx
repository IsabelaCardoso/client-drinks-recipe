import React from 'react';
import renderWithRouter from './helper/renderWithRouter';
import Provider from '../context/Provider';
import LoginPage from '../pages/LoginPage';
import { fireEvent, waitFor, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';

describe('Tests the UsersForm elements', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  const history = createMemoryHistory({ initialEntries: ['/login'] });
  
  it('test if the `Email` input exist', async() => {
    const { findByText, findAllByTestId } = renderWithRouter(<Provider><LoginPage history={ history } /></Provider>);
    const emailLabel = await findByText('Email');
    const emailInput = await findAllByTestId('login-email');

    expect(emailLabel).toBeInTheDocument();
    expect(emailInput).toBeTruthy();
  });
  it('test if the `Password` input exist', async() => {
    const { findByText, findAllByTestId } = renderWithRouter(<Provider><LoginPage history={ history } /></Provider>);
    const passwordLabel = await findByText('Password');
    const passwordInput = await findAllByTestId('login-password');

    expect(passwordLabel).toBeInTheDocument();
    expect(passwordInput).toBeTruthy();
  });

  it('test if the `FullName` input exist', async() => {
    const history = createMemoryHistory({ initialEntries: ['/register'] });
    const { findByText, findAllByTestId } = renderWithRouter(<Provider><LoginPage history={ history } /></Provider>);
    const nameLabel = await findByText('FullName');
    const nameInput = await findAllByTestId('register-name');

    expect(nameLabel).toBeInTheDocument();
    expect(nameInput).toBeTruthy();
  });

  it('test if the `Register` button exist', async() => {
    const { findAllByTestId } = renderWithRouter(<Provider><LoginPage history={ history } /></Provider>);
    const register = await findAllByTestId('no-account-btn');

    expect(register).toBeTruthy();
  });

  it('test if the `Sing in` button exist', async() => {
    const { findByText } = renderWithRouter(<Provider><LoginPage history={ history } /></Provider>);
    const singInButton = await findByText('Sing in');

    expect(singInButton).toBeInTheDocument();
  });

  it('test if the correct email format example exist', async() => {
    const { findByText } = renderWithRouter(<Provider><LoginPage history={ history } /></Provider>);
    const singInButton = await findByText('email@email.com');

    expect(singInButton).toBeInTheDocument();
  });

  it('test if the password instructions exist', async() => {
    const { findByText } = renderWithRouter(<Provider><LoginPage history={ history } /></Provider>);
    const singInButton = await findByText('Your password must be at least 6 characters');

    expect(singInButton).toBeInTheDocument();
  });

  it('tests if an invalid fields message appears', async() => {
    const { findByText } = renderWithRouter(<Provider><LoginPage history={ history } /></Provider>);
    const singInButton = await findByText('Sing in');
    fireEvent.click(singInButton);
    const invalidFieldsMessage = await findByText('Email or password invalid');

    expect(invalidFieldsMessage).toBeInTheDocument();
  });

  it('tests if login message appears', async() => {
    const { findByText } = renderWithRouter(<Provider><LoginPage history={ history } /></Provider>);

    const history = createMemoryHistory({ initialEntries: ['/register'] });

    const singInButton = await findByText('Sing in');
    fireEvent.click(singInButton);
    const invalidFieldsMessage = await findByText('Email or password invalid');

    expect(invalidFieldsMessage).toBeInTheDocument();
  });
});

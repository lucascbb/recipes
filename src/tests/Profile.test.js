import React from 'react';
import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

describe('Testa página Profile', () => {
  const userEmail = 'teste@teste.com';
  const emailTestId = 'email-input';
  const passwordTestId = 'password-input';
  test('Testa se o email do usuário está na tela', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const emailInput = screen.queryByTestId(emailTestId);
    const password = screen.queryByTestId(passwordTestId);
    userEvent.type(emailInput, userEmail);
    userEvent.type(password, '1234567');
    const loginButton = screen.queryByRole('button', { name: 'Login' });
    userEvent.click(loginButton);

    act(() => {
      history.push('/profile');
    });

    const { pathname } = history.location;
    expect(pathname).toBe('/profile');

    const profileEmail = screen.queryByTestId('profile-email');
    expect(profileEmail.innerHTML).toBe(userEmail);
  });
  test('Testa se o botão Done Recipes encaminha para a página Done Recipes', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const emailInput = screen.queryByTestId(emailTestId);
    const password = screen.queryByTestId(passwordTestId);
    userEvent.type(emailInput, userEmail);
    userEvent.type(password, '1234567');
    const loginButton = screen.queryByRole('button', { name: 'Login' });
    userEvent.click(loginButton);

    act(() => {
      history.push('/profile');
    });

    const doneRecipesButton = screen.queryByRole('button', { name: 'Done Recipes' });
    userEvent.click(doneRecipesButton);

    const { pathname } = history.location;
    expect(pathname).toBe('/done-recipes');
  });
  test('Testa se o botão Favorite Recipes encaminha para a página Favorite Recipes', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const emailInput = screen.queryByTestId(emailTestId);
    const password = screen.queryByTestId(passwordTestId);
    userEvent.type(emailInput, userEmail);
    userEvent.type(password, '1234567');
    const loginButton = screen.queryByRole('button', { name: 'Login' });
    userEvent.click(loginButton);

    act(() => {
      history.push('/profile');
    });

    const doneRecipesButton = screen.queryByRole('button', { name: 'Favorite Recipes' });
    userEvent.click(doneRecipesButton);

    const { pathname } = history.location;
    expect(pathname).toBe('/favorite-recipes');
  });
  test('Testa se o botão Logout apaga as informações de usuário e encaminha ele para a página de Login', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const emailInput = screen.queryByTestId(emailTestId);
    const password = screen.queryByTestId(passwordTestId);
    userEvent.type(emailInput, userEmail);
    userEvent.type(password, '1234567');
    const loginButton = screen.queryByRole('button', { name: 'Login' });
    userEvent.click(loginButton);

    act(() => {
      history.push('/profile');
    });

    const doneRecipesButton = screen.queryByRole('button', { name: 'Logout' });
    userEvent.click(doneRecipesButton);

    const userEmailLocalStorage = localStorage.getItem('user');
    expect(userEmailLocalStorage).toBeNull();

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
});

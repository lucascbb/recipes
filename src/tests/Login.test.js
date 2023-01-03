import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

describe('Testa página de Login', () => {
  const emailTestId = 'email-input';
  const passwordTestId = 'password-input';
  test('Testa se existe o input de email e de senha, além de um botão para login', () => {
    renderWithRouterAndRedux(<App />);
    const email = screen.queryByTestId(emailTestId);
    const password = screen.queryByTestId(passwordTestId);
    const loginButton = screen.queryByRole('button', { name: 'Login' });
    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });
  test('Testa se o botão fica desabilitado até o email e a senha estarem corretos', () => {
    renderWithRouterAndRedux(<App />);
    const email = screen.queryByTestId(emailTestId);
    const password = screen.queryByTestId(passwordTestId);
    const loginButton = screen.queryByRole('button', { name: 'Login' });
    expect(loginButton).toBeDisabled();
    userEvent.type(email, 'teste');
    expect(loginButton).toBeDisabled();
    userEvent.type(email, '@teste.com');
    expect(loginButton).toBeDisabled();
    userEvent.type(password, '12345');
    expect(loginButton).toBeDisabled();
    userEvent.type(password, '67');
    expect(loginButton).not.toBeDisabled();
  });
  test('Testa se o usuário é encaminhado para página /meals depois de efetuar o login', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const email = screen.queryByTestId(emailTestId);
    const password = screen.queryByTestId(passwordTestId);
    const loginButton = screen.queryByRole('button', { name: 'Login' });
    userEvent.type(email, 'teste@teste.com');
    userEvent.type(password, '1234567');
    userEvent.click(loginButton);
    const { pathname } = history.location;
    expect(pathname).toBe('/meals');
  });
});

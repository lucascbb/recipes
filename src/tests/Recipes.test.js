import React from 'react';
import { act } from 'react-dom/test-utils';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

describe('Pagina de Recipes', () => {
  test('1 - Verifica a pagina de Drinks', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/drinks');
    });

    expect(history.location.pathname).toBe('/drinks');

    expect(screen.getByText('RECIPES')).toBeInTheDocument();
  });
  test('2 - Verifica a pagina de Meals', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/meals');
    });

    expect(history.location.pathname).toBe('/meals');
    expect(screen.getByText('RECIPES')).toBeInTheDocument();
  });

  test('3 - Verifica se o rodapé foi renderizado', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/meals');
    });
    const mealsButton = screen.queryByTestId('meals-bottom-btn');
    expect(mealsButton).toBeInTheDocument();
    const drinksButton = screen.queryByTestId('drinks-bottom-btn');
    expect(drinksButton).toBeInTheDocument();
  });
  test('4 - Verifica se o usuário é redirecionado ao clicar nos botões', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/meals');
    });
    const drinksButton = screen.queryByTestId('drinks-bottom-btn');
    userEvent.click(drinksButton);
    await waitFor(() => {
      const url = history.location.pathname;
      expect(url).toBe('/drinks');
    });
    const mealsButton = screen.queryByTestId('meals-bottom-btn');
    userEvent.click(mealsButton);
    await waitFor(() => {
      const url = history.location.pathname;
      expect(url).toBe('/meals');
    });
  });
});

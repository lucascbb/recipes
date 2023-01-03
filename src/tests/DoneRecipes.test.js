import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

const url = '/done-recipes';

describe('Testa a página de Receitas feitas', () => {
  it('Testa se o Header foi renderizado na página', () => {
    const { history } = renderWithRouterAndRedux(<App />, { initialEntries: [url] });
    window.localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
    expect(history.location.pathname).toBe(url);
    expect(screen.getByText('Done Recipes')).toBeInTheDocument();
  });
  it('Testa se as receitas são renderizadas', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: [url] });
    window.localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
    expect(screen.getByTestId('0-horizontal-name')).toBeInTheDocument();
    expect(screen.getByTestId('1-horizontal-name')).toBeInTheDocument();
  });
  it('Testa se as receitas são filtradas corretamente ao clicar em drink', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: [url] });
    window.localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
    const drinkBtn = screen.getByTestId('filter-by-drink-btn');
    userEvent.click(drinkBtn);
    const drink = await screen.getByTestId('0-horizontal-top-text');
    expect(drink).toHaveTextContent('Optional alcohol');
  });
  it('Testa se as receitas são filtradas corretamente ao clicar em meal', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: [url] });
    window.localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
    const mealBtn = screen.getByTestId('filter-by-meal-btn');
    userEvent.click(mealBtn);
    const drink = await screen.getByTestId('0-horizontal-top-text');
    expect(drink).toHaveTextContent('Turkish - Side');
    const tag = screen.getByTestId('0-Soup-horizontal-tag');
    expect(tag).toBeInTheDocument();
  });
  it('Testa se as receitas são filtradas corretamento ao clicar em all', async () => {
    renderWithRouterAndRedux(<App />, { initialEntries: [url] });
    window.localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
    const mealBtn = screen.getByTestId('filter-by-meal-btn');
    userEvent.click(mealBtn);
    const allBtn = screen.getByTestId('filter-by-all-btn');
    userEvent.click(allBtn);
    expect(screen.getByTestId('0-horizontal-name')).toBeInTheDocument();
    expect(screen.getByTestId('1-horizontal-name')).toBeInTheDocument();
  });
});

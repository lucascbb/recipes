import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';
import mockDataMeals from './mocks/mockDataMeals';

const recipes = [
  {
    id: '52977',
    type: 'meal',
    nationality: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
  },
  {
    id: '1000',
    type: 'drink',
    nationality: 'brasil',
    category: 'cate',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
  },
];

const favoritesRecipesUrl = '/favorite-recipes';

describe('Testa pagina de receitas favoritas', () => {
  it('Testa se a pagina é carregada corretamente', async () => {
    jest.spyOn(global, 'fetch');

    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockDataMeals),
    });

    const { history } = renderWithRouterAndRedux(<App />, { initialEntries: ['/meals'] });
    expect(history.location.pathname).toBe('/meals');

    act(() => {
      history.push(favoritesRecipesUrl);
    });
    const title = screen.getByTestId('page-title');
    expect(title.innerHTML).toBe('Favorite Recipes ');
  });

  it('Testa se a pagina é renderiza as receitas corretamente', async () => {
    jest.spyOn(global, 'fetch');

    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockDataMeals),
    });

    const { history } = renderWithRouterAndRedux(<App />, { initialEntries: ['/meals'] });
    expect(history.location.pathname).toBe('/meals');

    act(() => {
      localStorage.setItem('favoriteRecipes', JSON.stringify(recipes));
      history.push(favoritesRecipesUrl);
    });

    const recipeOneTitle = screen.getByText(recipes[0].name);
    expect(recipeOneTitle).toBeInTheDocument();

    const recipeTwoTitle = screen.getByText(recipes[1].name);
    expect(recipeTwoTitle).toBeInTheDocument();

    const shareBtnOne = screen.getByTestId('0-horizontal-share-btn');
    const removeFavoriteBtnOne = screen.getByTestId('0-horizontal-favorite-btn');

    expect(shareBtnOne).toBeInTheDocument();
    expect(removeFavoriteBtnOne).toBeInTheDocument();

    userEvent.click(removeFavoriteBtnOne);

    expect(recipeOneTitle).not.toBeInTheDocument();
  });

  it('Testa a existencia dos botoes de filtro', async () => {
    jest.spyOn(global, 'fetch');

    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockDataMeals),
    });

    const { history } = renderWithRouterAndRedux(<App />, { initialEntries: ['/meals'] });
    expect(history.location.pathname).toBe('/meals');

    act(() => {
      localStorage.setItem('favoriteRecipes', JSON.stringify(recipes));
      history.push(favoritesRecipesUrl);
    });

    const allBtn = screen.getByTestId('filter-by-all-btn');
    const mealsBtn = screen.getByTestId('filter-by-meal-btn');
    const drinksBtn = screen.getByTestId('filter-by-drink-btn');

    const recipeMealTitle = screen.getByText(recipes[0].name);
    expect(recipeMealTitle).toBeInTheDocument();

    const recipeDrinkTitle = screen.getByText(recipes[1].name);
    expect(recipeDrinkTitle).toBeInTheDocument();

    expect(allBtn).toBeInTheDocument();
    expect(mealsBtn).toBeInTheDocument();
    expect(drinksBtn).toBeInTheDocument();

    userEvent.click(drinksBtn);

    expect(recipeMealTitle).not.toBeInTheDocument();
    expect(recipeDrinkTitle).toBeInTheDocument();

    userEvent.click(mealsBtn);

    expect(recipeDrinkTitle).not.toBeInTheDocument();

    userEvent.click(allBtn);

    const recipeMealTitleBackup = screen.getByText(recipes[0].name);
    expect(recipeMealTitleBackup).toBeInTheDocument();

    const recipeDrinkTitleBackup = screen.getByText(recipes[1].name);
    expect(recipeDrinkTitleBackup).toBeInTheDocument();
  });
});

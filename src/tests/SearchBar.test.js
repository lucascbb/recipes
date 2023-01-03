import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';
import mealsCategoriesMocks from './mocks/mealsCategoriesMock';
import drinksCategoriesMocks from './mocks/drinksCategoriesMock';
import mockDataMeals from './mocks/mockDataMeals';
import mockDataDrinks from './mocks/mockDataDrinks';
import beefMeals from './mocks/beefMeals';
import mockSearchA from './mocks/mockSearchA';
import ginSearch from './mocks/mockGinSearch';
import searchDrinkA from './mocks/mockFirstLetterDrink';
import { acid, acidInfo } from './mocks/mockDrinkAcid';

import { arrabiata, arrabiataInfo } from './mocks/mockArrabiata';

const submitButtonSearch = 'exec-search-btn';
const searchIcon = 'search-top-btn';
const searcInput = 'search-input';
const ingredientRadioBtn = 'ingredient-search-radio';
const pageTitle = 'page-title';
const nameRadioId = 'name-search-radio';
const firstLetterRadioId = 'first-letter-search-radio';

const fetchMock = (url) => Promise.resolve({
  json: () => {
    if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=') {
      return Promise.resolve(mockDataMeals);
    }
    if (url === 'https://www.themealdb.com/api/json/v1/1/list.php?c=list') {
      return Promise.resolve(mealsCategoriesMocks);
    }
    if (url === 'https://www.themealdb.com/api/json/v1/1/filter.php?i=beef') {
      return Promise.resolve(beefMeals);
    }
    if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata') {
      return Promise.resolve(arrabiata);
    }
    if (url === 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52771') {
      return Promise.resolve(arrabiataInfo);
    }
    if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?f=a') {
      return Promise.resolve(mockSearchA);
    }
    if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=') {
      return Promise.resolve(mockDataDrinks);
    }
    if (url === 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list') {
      return Promise.resolve(drinksCategoriesMocks);
    }
    if (url === 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Gin') {
      return Promise.resolve(ginSearch);
    }
    if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=ACID') {
      return Promise.resolve(acid);
    }
    if (url === 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=14610') {
      return Promise.resolve(acidInfo);
    }
    if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a') {
      return Promise.resolve(searchDrinkA);
    }
  },
});

describe('Testa o componente SearchBar na tela Meals', () => {
  afterEach(() => {
    global.fetch.mockClear();
  });

  it('Verifica se caso apenas uma receita seja encontrada, a pagina redireciona para ela', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(fetchMock);

    const { history } = renderWithRouterAndRedux(<App />, { initialEntries: ['/meals'] });

    const searchTopBtn = screen.getByTestId(searchIcon);

    expect(searchTopBtn).toBeInTheDocument();
    userEvent.click(searchTopBtn);

    const mealsTitle = await screen.getByTestId(pageTitle);
    const ingredientRadio = await screen.getByTestId(ingredientRadioBtn);
    const nameRadio = await screen.getByTestId(nameRadioId);
    const firstLetterRadio = await screen.getByTestId(firstLetterRadioId);
    const searchButton = await screen.getByTestId(submitButtonSearch);

    expect(mealsTitle).toBeInTheDocument();
    expect(ingredientRadio).toBeInTheDocument();
    expect(nameRadio).toBeInTheDocument();
    expect(firstLetterRadio).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();

    const search = screen.getByTestId(searcInput);

    userEvent.type(search, 'Arrabiata');
    userEvent.click(nameRadio);
    userEvent.click(searchButton);

    const arrabiataTitle = await screen.findByTestId('recipe-title');
    expect(arrabiataTitle).toBeInTheDocument();

    expect(history.location.pathname).toBe('/meals/52771');
  });

  it('Verifica se caso seja pesquisado uma comida, o resultado correto e retornado', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(fetchMock);

    renderWithRouterAndRedux(<App />, { initialEntries: ['/meals'] });

    const searchTopBtn = screen.getByTestId(searchIcon);

    expect(searchTopBtn).toBeInTheDocument();
    userEvent.click(searchTopBtn);

    const mealsTitle = await screen.getByTestId(pageTitle);
    const ingredientRadio = await screen.getByTestId(ingredientRadioBtn);
    const nameRadio = await screen.getByTestId(nameRadioId);
    const firstLetterRadio = await screen.getByTestId(firstLetterRadioId);
    const searchButton = await screen.getByTestId(submitButtonSearch);

    expect(mealsTitle).toBeInTheDocument();
    expect(ingredientRadio).toBeInTheDocument();
    expect(nameRadio).toBeInTheDocument();
    expect(firstLetterRadio).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();

    const search = screen.getByTestId(searcInput);

    userEvent.click(ingredientRadio);
    userEvent.type(search, 'beef');

    userEvent.click(searchButton);

    const drink1 = await screen.findByTestId('0-recipe-card');
    expect(drink1).toBeInTheDocument();

    const nameDrink1 = await screen.findByTestId('0-card-name');
    expect(nameDrink1).toBeInTheDocument();
  });
  it('Verfica se é lançado o erro caso não encontre nenhuma receita', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(fetchMock);

    renderWithRouterAndRedux(<App />, { initialEntries: ['/meals'] });

    const searchTopBtn = screen.getByTestId(searchIcon);

    expect(searchTopBtn).toBeInTheDocument();
    userEvent.click(searchTopBtn);

    const mealsTitle = await screen.getByTestId(pageTitle);
    const ingredientRadio = await screen.getByTestId(ingredientRadioBtn);
    const nameRadio = await screen.getByTestId(nameRadioId);
    const firstLetterRadio = await screen.getByTestId(firstLetterRadioId);
    const searchButton = await screen.getByTestId(submitButtonSearch);

    expect(mealsTitle).toBeInTheDocument();
    expect(ingredientRadio).toBeInTheDocument();
    expect(nameRadio).toBeInTheDocument();
    expect(firstLetterRadio).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();

    const search = screen.getByTestId(searcInput);

    userEvent.click(ingredientRadio);
    userEvent.type(search, 'abcd');

    userEvent.click(searchButton);
  });
  it('Verfica a pesquisa de primeira letra', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(fetchMock);

    renderWithRouterAndRedux(<App />, { initialEntries: ['/meals'] });

    const searchTopBtn = screen.getByTestId(searchIcon);

    expect(searchTopBtn).toBeInTheDocument();
    userEvent.click(searchTopBtn);

    const mealsTitle = await screen.getByTestId(pageTitle);
    const ingredientRadio = await screen.getByTestId(ingredientRadioBtn);
    const nameRadio = await screen.getByTestId(nameRadioId);
    const firstLetterRadio = await screen.getByTestId(firstLetterRadioId);
    const searchButton = await screen.getByTestId(submitButtonSearch);

    expect(mealsTitle).toBeInTheDocument();
    expect(ingredientRadio).toBeInTheDocument();
    expect(nameRadio).toBeInTheDocument();
    expect(firstLetterRadio).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();

    const search = screen.getByTestId(searcInput);

    userEvent.click(firstLetterRadio);
    userEvent.click(ingredientRadio);

    userEvent.click(firstLetterRadio);
    userEvent.type(search, 'a');

    userEvent.click(searchButton);

    const firstItem = await screen.findByText('Apple Frangipan Tart');
    expect(firstItem).toBeInTheDocument();

    userEvent.click(firstLetterRadio);
    userEvent.type(search, 'abc');

    userEvent.click(searchButton);
  });
});

describe('Testa o componente SearchBar na tela Drinks', () => {
  afterEach(() => {
    global.fetch.mockClear();
  });

  it('Verifica se caso apenas uma receita seja encontrada, a pagina redireciona para ela', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(fetchMock);

    renderWithRouterAndRedux(<App />, { initialEntries: ['/drinks'] });

    const searchTopBtn = screen.getByTestId(searchIcon);

    expect(searchTopBtn).toBeInTheDocument();
    userEvent.click(searchTopBtn);

    const drinksTitle = await screen.getByTestId(pageTitle);
    const ingredientRadio = await screen.getByTestId(ingredientRadioBtn);
    const nameRadio = await screen.getByTestId(nameRadioId);
    const firstLetterRadio = await screen.getByTestId(firstLetterRadioId);
    const searchButton = await screen.getByTestId(submitButtonSearch);

    // userEvent.click(drinkButton);

    expect(drinksTitle).toBeInTheDocument();
    expect(ingredientRadio).toBeInTheDocument();
    expect(nameRadio).toBeInTheDocument();
    expect(firstLetterRadio).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();

    const search = screen.getByTestId(searcInput);

    userEvent.type(search, 'Gin');
    userEvent.click(ingredientRadio);
    userEvent.click(searchButton);

    const drinkTitle = await screen.findByText('69 Special');
    expect(drinkTitle).toBeInTheDocument();
  });

  it('Verifica se caso seja pesquisado um drink unico, o resultado correto e retornado', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(fetchMock);

    renderWithRouterAndRedux(<App />, { initialEntries: ['/drinks'] });

    const searchTopBtn = screen.getByTestId(searchIcon);

    expect(searchTopBtn).toBeInTheDocument();
    userEvent.click(searchTopBtn);

    const mealsTitle = await screen.getByTestId(pageTitle);
    const ingredientRadio = await screen.getByTestId(ingredientRadioBtn);
    const nameRadio = await screen.getByTestId(nameRadioId);
    const firstLetterRadio = await screen.getByTestId(firstLetterRadioId);
    const searchButton = await screen.getByTestId(submitButtonSearch);

    expect(mealsTitle).toBeInTheDocument();
    expect(ingredientRadio).toBeInTheDocument();
    expect(nameRadio).toBeInTheDocument();
    expect(firstLetterRadio).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();

    const search = screen.getByTestId(searcInput);

    userEvent.click(nameRadio);
    userEvent.type(search, 'ACID');

    userEvent.click(searchButton);

    const drinkTitle = await screen.findByText('ACID');
    expect(drinkTitle).toBeInTheDocument();

    const drinkTitleID = await screen.findByTestId('recipe-title');
    expect(drinkTitleID).toBeInTheDocument();
  });

  it('Verfica a pesquisa de primeira letra', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(fetchMock);

    renderWithRouterAndRedux(<App />, { initialEntries: ['/drinks'] });

    const searchTopBtn = screen.getByTestId(searchIcon);

    expect(searchTopBtn).toBeInTheDocument();
    userEvent.click(searchTopBtn);

    const mealsTitle = await screen.getByTestId(pageTitle);
    const ingredientRadio = await screen.getByTestId(ingredientRadioBtn);
    const nameRadio = await screen.getByTestId(nameRadioId);
    const firstLetterRadio = await screen.getByTestId(firstLetterRadioId);
    const searchButton = await screen.getByTestId(submitButtonSearch);

    expect(mealsTitle).toBeInTheDocument();
    expect(ingredientRadio).toBeInTheDocument();
    expect(nameRadio).toBeInTheDocument();
    expect(firstLetterRadio).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();

    const search = screen.getByTestId(searcInput);

    userEvent.click(firstLetterRadio);
    userEvent.click(ingredientRadio);

    userEvent.click(firstLetterRadio);
    userEvent.type(search, 'a');

    userEvent.click(searchButton);

    const drink = await screen.findByText('Affair');
    expect(drink).toBeInTheDocument();

    userEvent.click(firstLetterRadio);
    userEvent.type(search, 'abcd');

    userEvent.click(searchButton);
  });
});

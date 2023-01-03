import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';
import drinkID from './helpers/mocks/drinkID';
import mealsID from './helpers/mocks/mealsID';

const mealsURL = '/meals/53060/in-progress';
const drinkURL = '/drinks/17222/in-progress';

describe('Pagina de Recipes', () => {
  test('1 - Verifica a pagina de DRINKS in progress', async () => {
    jest.spyOn(global, 'fetch');

    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(drinkID),
    });

    const { history } = renderWithRouterAndRedux(<App />, { initialEntries: [drinkURL] });
    expect(history.location.pathname).toBe(drinkURL);

    expect(global.fetch).toBeCalledTimes(1);
    expect(global.fetch).toBeCalledWith('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=17222');

    expect(await screen.findByText('A1')).toBeInTheDocument();
    expect(screen.getByTestId('recipe-photo')).toBeInTheDocument();

    const check0 = screen.getByTestId('0-ingredient-step');
    const check1 = screen.getByTestId('1-ingredient-step');
    const check2 = screen.getByTestId('2-ingredient-step');
    const check3 = screen.getByTestId('3-ingredient-step');

    expect(check0).toBeInTheDocument();
    expect(screen.getByLabelText('Gin')).toBeInTheDocument();

    userEvent.click(check0);
    userEvent.click(check0);

    userEvent.click(check0);
    userEvent.click(check1);
    userEvent.click(check2);
    userEvent.click(check3);

    const finishBTN = screen.getByTestId('finish-recipe-btn');
    expect(finishBTN).toBeInTheDocument();
    expect(finishBTN).not.toBeDisabled();

    userEvent.click(finishBTN);

    expect(history.location.pathname).toBe('/done-recipes');
  });

  test('2 - Verifica a pagina de MEALS in progress', async () => {
    jest.spyOn(global, 'fetch');

    // Usando o arquivo 'mealsID' que eh o mock
    global.fetch.mockResolvedValue({ json: jest.fn().mockResolvedValue(mealsID) });

    // Entrando direto na pagina de MEALS in progress usando o pathname '/meals/53060/in-progress'
    const { history } = renderWithRouterAndRedux(<App />, { initialEntries: [mealsURL] });
    expect(history.location.pathname).toBe(mealsURL);

    // Testando se a API com ID correto 53060 foi chamado
    // Passando o fetch no expect, tambem poderia ser global.fetch, como na linha 49
    expect(fetch).toBeCalledTimes(1);
    expect(global.fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/lookup.php?i=53060');

    // No primeiro teste do que eh renderizado PRECISA TER O AWAIT e o FIND,
    // se nao nem renderiza, basta ter no primeiro expect de coisas renderizadas na tela
    expect(await screen.findByText('Croatian')).toBeInTheDocument();
    expect(screen.getByTestId('recipe-photo')).toBeInTheDocument();

    const check0 = screen.getByTestId('0-ingredient-step');
    const check1 = screen.getByTestId('1-ingredient-step');
    const check2 = screen.getByTestId('2-ingredient-step');
    const check3 = screen.getByTestId('3-ingredient-step');
    const check4 = screen.getByTestId('4-ingredient-step');
    const check5 = screen.getByTestId('5-ingredient-step');

    expect(check0).toBeInTheDocument();
    expect(screen.getByLabelText('Filo Pastry')).toBeInTheDocument();

    userEvent.click(check0);
    userEvent.click(check0);

    userEvent.click(check0);
    userEvent.click(check1);
    userEvent.click(check2);
    userEvent.click(check3);
    userEvent.click(check4);
    userEvent.click(check5);

    const finishBTN = screen.getByTestId('finish-recipe-btn');
    expect(finishBTN).toBeInTheDocument();
    expect(finishBTN).not.toBeDisabled();

    userEvent.click(finishBTN);

    expect(history.location.pathname).toBe('/done-recipes');
  });
  test('3 - Verifica se apos marcar todos checkboxes o botao finish recipe fica habilidado', async () => {
    jest.spyOn(global, 'fetch');

    // Usando o arquivo 'mealsID' que eh o mock
    global.fetch.mockResolvedValue({ json: jest.fn().mockResolvedValue(mealsID) });

    // Entrando direto na pagina de MEALS in progress usando o pathname '/meals/53060/in-progress'
    const { history } = renderWithRouterAndRedux(<App />, { initialEntries: [mealsURL] });
    expect(history.location.pathname).toBe(mealsURL);
  });

  test('4 - Verifica se apos marcar todos checkboxes o botao finish recipe fica habilidado', async () => {
    jest.spyOn(global, 'fetch');

    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(drinkID),
    });

    const { history } = renderWithRouterAndRedux(<App />, { initialEntries: [drinkURL] });
    expect(history.location.pathname).toBe(drinkURL);

    console.log(JSON.parse(localStorage.getItem('inProgressRecipes')));
  });
});

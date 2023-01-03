export const REQUEST_RECIPES = 'REQUEST_RECIPES';
export const RECEIVE_RECIPE_FOR_ID = 'RECEIVE_RECIPE_FOR_ID';
export const RECEIVE_RECIPES = 'RECEIVE_RECIPES';
export const DRINKS = 'DRINKS';
export const MEALS = 'MEALS';

export const receiveRecipeforId = (recipeId) => ({
  type: RECEIVE_RECIPE_FOR_ID,
  payload: recipeId,
});

export const receiveRecipes = (recipes) => ({
  type: RECEIVE_RECIPES,
  payload: recipes,
});

export const recipesDrinks = (drinksValue) => ({
  type: 'DRINKS',
  drinks: drinksValue,
});

export const recipesMeals = (mealsValue) => ({
  type: 'MEALS',
  meals: mealsValue,
});

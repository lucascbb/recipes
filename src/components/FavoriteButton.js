import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import UnfilledIcon from '../images/whiteHeartIcon.png';
import filledIcon from '../images/blackHeartIcon.png';

function FavoriteButton() {
  const actualRecipe = useSelector((state) => state.recipes.recipesForId);

  const favoriteRecipeCheck = () => {
    const favoriteRecipesData = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const actualRecipeIdName = Object
      .keys(actualRecipe[Object.keys(actualRecipe)[0]][0])[0];
    const actualRecipeId = actualRecipe[Object
      .keys(actualRecipe)[0]][0][actualRecipeIdName];
    if (!favoriteRecipesData) {
      return false;
    }
    return favoriteRecipesData
      .some((favoriteRecipe) => favoriteRecipe.id === actualRecipeId); // corrigir retorno true na inicialização
  };

  const [filled, setFilled] = useState(favoriteRecipeCheck());

  const formateRecipeData = () => {
    if (actualRecipe.meals) {
      const recipeData = {
        id: actualRecipe.meals[0].idMeal,
        type: 'meal',
        nationality: actualRecipe.meals[0].strArea,
        category: actualRecipe.meals[0].strCategory,
        alcoholicOrNot: (actualRecipe.meals[0]
          .strDrinkAlternate ? actualRecipe.meals[0].strDrinkAlternate : ''),
        name: actualRecipe.meals[0].strMeal,
        image: actualRecipe.meals[0].strMealThumb,
      };
      return recipeData;
    }
    const recipeData = {
      id: actualRecipe.drinks[0].idDrink,
      type: 'drink',
      nationality: (actualRecipe.drinks[0].strArea ? actualRecipe.drinks[0].strArea : ''),
      category: actualRecipe.drinks[0].strCategory,
      alcoholicOrNot: actualRecipe.drinks[0].strAlcoholic,
      name: actualRecipe.drinks[0].strDrink,
      image: actualRecipe.drinks[0].strDrinkThumb,
    };
    return recipeData;
  };

  const addRecipeInLocalStorage = (recipe) => {
    if (!localStorage.getItem('favoriteRecipes')) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    }
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    favoriteRecipes.push(recipe);
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
  };

  const removeRecipeInLocalStorage = (recipe) => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'))
      .filter((favoriteRecipe) => favoriteRecipe.id !== recipe.id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
  };

  const onFavoriteButtonClick = () => {
    const recipeData = formateRecipeData();
    if (!filled) {
      addRecipeInLocalStorage(recipeData);
    }
    if (filled) {
      removeRecipeInLocalStorage(recipeData);
    }
    setFilled(!filled);
  };

  return (
    <div>
      <button
        type="button"
        data-testid="favorite-btn"
        className="buttons"
        onClick={ onFavoriteButtonClick }
      >
        <img
          alt="favorite-icon"
          src={ (filled) ? filledIcon : UnfilledIcon }
          width="25px"
        />
      </button>
    </div>
  );
}

export default FavoriteButton;

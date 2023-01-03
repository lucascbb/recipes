import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import ShareButtonFavorites from '../components/ShareButtonFavorites';
import '../styles/DoneRecipes.css';
import All from '../styles/icons/All.png';
import drinks from '../styles/icons/drinks.png';
import foods from '../styles/icons/foods.png';

function DoneRecipes() {
  const [recipeType, setRecipeType] = useState('');
  const [actualRecipe, setActualRecipe] = useState('');
  const [localEmpty, setLocalEmpty] = useState(true);
  const zero = 0;
  const dez = 10;

  const isEmpty = () => {
    const recipes = localStorage.getItem('doneRecipes');
    if (recipes) {
      setLocalEmpty(false);
    }
  };

  useEffect(() => {
    isEmpty();
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    switch (recipeType) {
    case 'drink':
      setActualRecipe(doneRecipes.filter((recipe) => recipe.type === 'drink'));
      break;
    case 'meal':
      setActualRecipe(doneRecipes.filter((recipe) => recipe.type === 'meal'));
      break;
    default:
      setActualRecipe(doneRecipes);
      break;
    }
  }, [recipeType]);

  return (
    <div className="body">
      <Header pageName="Done Recipes" searchingOFF />
      {!localEmpty ? (
        <div>
          <div className="filter-Btn">
            <button
              className="btn-filter"
              type="button"
              src={ All }
              data-testid="filter-by-all-btn"
              onClick={ () => setRecipeType('all') }
            >
              <img src={ All } alt="todos" />
            </button>
            <button
              className="btn-filter"
              type="button"
              src={ foods }
              data-testid="filter-by-meal-btn"
              onClick={ () => setRecipeType('meal') }
            >
              <img src={ foods } alt="comidas" />
            </button>
            <button
              className="btn-filter"
              src={ drinks }
              data-testid="filter-by-drink-btn"
              type="button"
              onClick={ () => setRecipeType('drink') }
            >
              <img src={ drinks } alt="bebidas" />
            </button>
          </div>
          <button
            type="button"
            data-testid="filter-by-all-btn"
            onClick={ () => setRecipeType('') }
          >
            All
          </button>
          <button
            type="button"
            data-testid="filter-by-meal-btn"
            onClick={ () => setRecipeType('meal') }
          >
            Meals
          </button>
          <button
            data-testid="filter-by-drink-btn"
            type="button"
            onClick={ () => setRecipeType('drink') }
          >
            Drinks
          </button>
          {actualRecipe ? actualRecipe.map((recipe, index) => (
            <div className="recipes" key={ index }>
              <Link className="link" to={ `/${recipe.type}s/${recipe.id}` }>
                <img
                  className="image"
                  src={ recipe.image }
                  alt={ `${recipe.name} imagem` }
                  data-testid={ `${index}-horizontal-image` }
                />
              </Link>
              <div className="details">
                <Link className="name-Recipe" to={ `/${recipe.type}s/${recipe.id}` }>
                  <h2
                    className="name"
                    data-testid={ `${index}-horizontal-name` }
                  >
                    {recipe.name}
                  </h2>
                </Link>
                {recipe.type === 'meal' ? (
                  <h3
                    className="other-details"
                    data-testid={ `${index}-horizontal-top-text` }
                  >
                    {`${recipe.nationality} - ${recipe.category}`}
                  </h3>)
                  : (
                    <h3
                      className="other-details"
                      data-testid={ `${index}-horizontal-top-text` }
                    >
                      {recipe.alcoholicOrNot}
                    </h3>
                  )}
                <h2
                  className="doneDate"
                  data-testid={ `${index}-horizontal-done-date` }
                >
                  Feita em :
                  {recipe.doneDate.slice(zero, dez)}
                </h2>
                {recipe.type === 'meal' ? (
                  <div className="tag-container">
                    <h2
                      className="tag"
                      data-testid={ `${index}-${recipe.tags[0]}-horizontal-tag` }
                    >
                      {recipe.tags[0]}
                    </h2>
                    <h2
                      className="tag"
                      data-testid={ `${index}-${recipe.tags[1]}-horizontal-tag` }
                    >
                      {recipe.tags[1]}
                    </h2>
                  </div>)
                  : null }
              </div>
              <ShareButtonFavorites
                name="share-Btn"
                type={ `${recipe.type}s` }
                id={ recipe.id }
                index={ index }
              />
            </div>
          )) : null}

        </div>
      ) : <h2>Nenhuma receita foi finalizada</h2>}

    </div>
  );
}
export default DoneRecipes;

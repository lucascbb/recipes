import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import ShareButtonFavorites from '../components/ShareButtonFavorites';
import '../styles/DoneRecipes.css';
import all from '../images/allFood.png';
import mealIcon from '../images/mealIcon.svg';
import drinkIcon from '../images/drinkIcon.svg';
import remove from '../images/x.png';

function DoneRecipes() {
  const [recipeType, setRecipeType] = useState('');
  const [actualRecipe, setActualRecipe] = useState('');

  useEffect(() => {   
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    switch (recipeType) {
    case 'drink':
      if (doneRecipes) { setActualRecipe(doneRecipes.filter((recipe) => recipe.type === 'drink')); }
      document.getElementById('drink').style.border = '5px solid black'
      document.getElementById('meal').style.border = '5px solid white'
      document.getElementById('all').style.border = '5px solid white'
      break;
    case 'meal':
      if (doneRecipes) { setActualRecipe(doneRecipes.filter((recipe) => recipe.type === 'meal')); }
      document.getElementById('drink').style.border = '5px solid white'
      document.getElementById('meal').style.border = '5px solid black'
      document.getElementById('all').style.border = '5px solid white'
      break;
    case 'all':
      if (doneRecipes) { setActualRecipe(doneRecipes); }
      document.getElementById('drink').style.border = '5px solid white'
      document.getElementById('meal').style.border = '5px solid white'
      document.getElementById('all').style.border = '5px solid black'
      break;
    default:
      if (doneRecipes) { setActualRecipe(doneRecipes); }
      break;
    }
  }, [recipeType]);

  const removeDone = (tempo) => {    
    const recipes = JSON.parse(localStorage.getItem('doneRecipes'));
    const remove = recipes.filter((ele) => ele.time !== tempo);
    localStorage.setItem('doneRecipes', JSON.stringify(remove));
    setActualRecipe(remove);
    if (recipeType === 'drink') { setActualRecipe(remove.filter((recipe) => recipe.type === 'drink')); }
    if (recipeType === 'meal') { setActualRecipe(remove.filter((recipe) => recipe.type === 'meal')); }
  };

  return (
    <div className="body">
      <Header pageName="Done Recipes" searchingOFF />
        <div>
          <div className="category-paibtns">
            <div className="category-paibtn">
              <button
                id='all'
                type="button"
                data-testid="filter-by-all-btn"
                onClick={ () => setRecipeType('all') }
                className="category-btn-favorite"
              >
                <img src={ all } className="allFood" />
              </button>
              <p className="favorite-cate" >All</p>
            </div>
            <div className="category-paibtn">
              <button
                id='meal'
                type="button"
                data-testid="filter-by-meal-btn"
                onClick={ () => setRecipeType('meal') }
                className="category-btn-favorite"
              >
                <img src={ mealIcon } className="all2" />
              </button>
              <p className="favorite-cate" >Meals</p>
            </div>
            <div className="category-paibtn">
              <button
                id='drink'
                type="button"
                data-testid="filter-by-drink-btn"
                onClick={ () => setRecipeType('drink') }
                className="category-btn-favorite"
              >
                <img src={ drinkIcon } className="all2" />
              </button>
              <p className="favorite-cate" >Drinks</p>
            </div>
          </div>
          {actualRecipe[0] ? 
            (
              <div>
                <p className="favorite-allDone">Receitas Concluídas: {actualRecipe.length}</p>
              </div>
            ): 
            (
              <div>
                <p className="favorite-allDone">Receitas Concluídas: {actualRecipe.length}</p>
                <h2 className="nothing-recipe">Nenhuma receita foi finalizada</h2>
              </div>
            )
          }
          {actualRecipe ? actualRecipe.map((recipe, index) => (
            <div className="done-details-container" key={ index }>
              <Link 
                to={ `/recipes/${recipe.type}s/${recipe.id}` }
                className="favorite-img" 
              >
                <img
                  className="image-food-details"
                  src={ recipe.image }
                  alt={ `${recipe.name} imagem` }
                  data-testid={ `${index}-horizontal-image` }
                />
              </Link>
              <div className="details-container">
                <Link  
                  to={ `/recipes/${recipe.type}s/${recipe.id}` }
                  className="title-painame"
                >
                  <p
                    data-testid={ `${index}-horizontal-name` }
                    className="title-name"
                  >
                    {recipe.name}
                  </p>
                  
                </Link>
                <p className="done-number">{index + 1}</p>
                {recipe.type === 'meal' ? (
                  <p
                    className="category-and-nacionality"
                    data-testid={ `${index}-horizontal-top-text` }
                  >
                    {`${recipe.nationality} - ${recipe.category}`}
                  </p>)
                  : (
                    <p
                      className="category-and-nacionality"
                      data-testid={ `${index}-horizontal-top-text` }
                    >
                      {` ${recipe.alcoholicOrNot} - ${recipe.category} `}
                    </p>
                  )}
                {/* {recipe.type === 'meal' ? (
                    <p
                      className="tag"
                      data-testid={ `${index}-${recipe.tags}-horizontal-tag` }
                    >
                      {recipe.tags}
                    </p>)
                  : null } */}
                <h2
                  className="date"
                  data-testid={ `${index}-horizontal-done-date` }
                >
                  Feita em:
                  <br/>
                  {recipe.doneDate}
                  <br/>
                  {recipe.time}
                </h2>
                <div className="favorite-btns">
                  <ShareButtonFavorites
                    name="share-Btn"
                    type={ `${recipe.type}s` }
                    id={ recipe.id }
                    index={ index }
                  />
                  <button
                    type="button"
                    id={ recipe.id }
                    className="btn-favorite"
                    data-testid={ `${index}-horizontal-favorite-btn` }
                    onClick={ () => { removeDone(recipe.time) }}
                  >
                    <img 
                      src={ remove } 
                      alt="Favorite button" 
                      className='favorite-heartbtn' 
                    />
                  </button>
                </div>
              </div>
            </div>
          )) : null}
        </div>
    </div>
  );
}
export default DoneRecipes;

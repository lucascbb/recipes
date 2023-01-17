import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import ShareButtonFavorites from '../components/ShareButtonFavorites';
import '../styles/FavoriteRecipes.css';
import all from '../images/allFood.png';
import mealIcon from '../images/mealIcon.svg';
import drinkIcon from '../images/drinkIcon.svg';

function FavoriteRecipes() {
  const [typeRecipes, setTypeRecipes] = useState('');
  const [favoritesList, setFavoritesList] = useState(JSON.parse(localStorage.getItem('favoriteRecipes')));

  useEffect(() => {
    const local = JSON.parse(localStorage.getItem('favoriteRecipes'));

    setFavoritesList(local); 
    switch (typeRecipes) {
    case 'drinks':
      document.getElementById('drink').style.border = '5px solid black'
      document.getElementById('meal').style.border = '5px solid white'
      document.getElementById('all').style.border = '5px solid white'

      if (favoritesList) { setFavoritesList(local.filter((recipe) => recipe.type === 'drink')); }
      break;
    case 'meals':
      document.getElementById('drink').style.border = '5px solid white'
      document.getElementById('meal').style.border = '5px solid black'
      document.getElementById('all').style.border = '5px solid white'

      if (favoritesList) { setFavoritesList(local.filter((recipe) => recipe.type === 'meal')); }
      break;
    case 'all':
      document.getElementById('drink').style.border = '5px solid white'
      document.getElementById('meal').style.border = '5px solid white'
      document.getElementById('all').style.border = '5px solid black'

      if (favoritesList) { setFavoritesList(local); }
      break;
    default:
      if (favoritesList) { setFavoritesList(local); }
      break;
    }
  }, [typeRecipes]);


  const removeFavorite = (tempo) => {
    const localR = JSON.parse(localStorage.getItem('favoriteRecipes'))
    const remove = localR.filter((e) => e.time !== tempo);
    localStorage.setItem('favoriteRecipes', JSON.stringify(remove));
    setFavoritesList(remove)
    if (typeRecipes === 'drinks') { setFavoritesList(remove.filter((recipe) => recipe.type === 'drink')); }
    if (typeRecipes === 'meals') { setFavoritesList(remove.filter((recipe) => recipe.type === 'meal')); }
  };

  const seila = () => {
    if (favoritesList.length === 0) { 
      return (
        <h2 className="nothing-recipe">Nenhuma receita foi finalizada</h2>
      )
    }
  };

  return (
    <div className="favorite-page">
      <Header pageName="Favorite Recipes" />
      <div className="category-paibtns">
        <div className="category-paibtn">
          <button
            id='all'
            type="button"
            data-testid="filter-by-all-btn"
            onClick={ () => setTypeRecipes('all') }
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
            onClick={ () => setTypeRecipes('meals') }
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
            onClick={ () => setTypeRecipes('drinks') }
            className="category-btn-favorite"
          >
            <img src={ drinkIcon } className="all2" />
          </button>
          <p className="favorite-cate" >Drinks</p>
        </div>
      </div>
      {favoritesList ? 
        <div>
          <p className="favorite-allDone">
            Receitas Favoritadas: {favoritesList.length}
          </p>
        </div>
          : 
        <h2 className="nothing-recipe">Nenhuma receita foi finalizada</h2>
      }
      {favoritesList ? seila() : (null) }
      {favoritesList ?
      favoritesList.map((e, index) => (
        <div key={ e.id } className="favorite-details-container">
          <Link 
            to={ e.type === 'drink' ? `/recipes/drinks/${e.id}` : `/recipes/meals/${e.id}` } 
            className="favorite-img"
          >
            <img
              src={ e.image }
              alt={ e.name }
              data-testid={ `${index}-horizontal-image` }
              className="image-food-details"
            />
          </Link>
          <div className="details-container">
            <Link 
              to={ e.type === 'drink' ? `/recipes/drinks/${e.id}` : `/recipes/meals/${e.id}` }
              className="title-painame"
            >
              <p
                data-testid={ `${index}-horizontal-name` }
                className="title-name"
              >
                {e.name}
              </p>
            </Link>
            <p className="done-number">#{index + 1}</p>
            {e.type === 'meal' && (
              <p
                data-testid={ `${index}-horizontal-top-text` }
                className="category-and-nacionality"
              >
                {`${e.nationality} - ${e.category}`}
              </p>
            )}
            <p
              data-testid={ `${index}-${e.type}-horizontal-tag` }
              className="tag"
            >
              {e.type}
            </p>
            {e.type === 'drink' && (
              <p 
                data-testid={ `${index}-horizontal-top-text` }
                className="date"
              >
                {e.alcoholicOrNot}
              </p>
            )}
            <p data-testid={ `${index}-horizontal-done-date` } className="date">
              Data do like:
              <br/>
              {e.date}
              <br/>
              {e.time}
            </p>
            <div className="favorite-btns">
              <ShareButtonFavorites
                index={ index }
                id={ e.id }
                type={ e.type === 'drink' ? 'drinks' : 'meals' }
              />
              <button
                src={ blackHeartIcon }
                type="button"
                className="btn-favorite"
                data-testid={ `${index}-horizontal-favorite-btn` }
                onClick={ () => { removeFavorite(e.time); } }
              >
                <img 
                  src={ blackHeartIcon } 
                  alt="Favorite button" 
                  className='favorite-heartbtn' 
                />
              </button>
            </div>
          </div>
        </div>
      ))
    : (null)
    }
    </div>
  );
}
export default FavoriteRecipes;

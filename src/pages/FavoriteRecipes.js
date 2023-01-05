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
  const [favoritesList, setFavoritesList] = useState([]);
  const [backupFavoritesList, setBackupFavoritesList] = useState([]);
  const [border, setBorder] = useState('5px solid black');

  useEffect(() => {
    const favoritesLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (!favoritesLocalStorage) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
      setFavoritesList([]);
      setBackupFavoritesList([]);
    } else {
      setFavoritesList(favoritesLocalStorage);
      setBackupFavoritesList(favoritesLocalStorage);
    }
    document.getElementById('all').style.border = '5px solid black';
  }, []);

  const removeFavorite = (id) => {
    console.log('REMOVEU', id);
    const idsList = favoritesList.map((e) => (e.id));
    const indexToRemove = idsList.indexOf(id);
    const newFavoritesList = [...favoritesList];
    newFavoritesList.splice(indexToRemove, 1);
    setFavoritesList(newFavoritesList);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoritesList));
  };

  const filterMeals = () => {
    const filtredArray = backupFavoritesList.filter((e) => e.type === 'meal');
    setFavoritesList(filtredArray);
    document.getElementById('drink').style.border = '5px solid white'
    document.getElementById('meal').style.border = '5px solid black'
    document.getElementById('all').style.border = '5px solid white'
  };
  const filterDrinks = () => {
    const filtredArray = backupFavoritesList.filter((e) => e.type === 'drink');
    setFavoritesList(filtredArray);
    document.getElementById('drink').style.border = '5px solid black'
    document.getElementById('meal').style.border = '5px solid white'
    document.getElementById('all').style.border = '5px solid white'
  };
  const filterAll = () => {
    setFavoritesList(backupFavoritesList);
    document.getElementById('drink').style.border = '5px solid white'
    document.getElementById('meal').style.border = '5px solid white'
    document.getElementById('all').style.border = '5px solid black'
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
            onClick={ filterAll }
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
            onClick={ filterMeals }
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
            onClick={ filterDrinks }
            className="category-btn-favorite"
          >
            <img src={ drinkIcon } className="all2" />
          </button>
          <p className="favorite-cate" >Drinks</p>
        </div>
      </div>
      {favoritesList.map((e, index) => (
        <div key={ e.id } className="favorite-details-container">
          <Link to={ e.type === 'drink' ? `/drinks/${e.id}` : `/meals/${e.id}` }>
            <img
              src={ e.image }
              alt={ e.name }
              data-testid={ `${index}-horizontal-image` }
              width="200px"
              className="image-food-details"
            />
          </Link>
          <div className="details-container">
            <Link to={ e.type === 'drink' ? `/drinks/${e.id}` : `/meals/${e.id}` }>
              <p
                data-testid={ `${index}-horizontal-name` }
                className="title-name"
              >
                {e.name}
              </p>
            </Link>
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
              <p data-testid={ `${index}-horizontal-top-text` }>{e.alcoholicOrNot}</p>
            )}
            <p data-testid={ `${index}-horizontal-done-date` } className="date">
              DATA QUE A RECEITA FOI FEITA
            </p>
            <div className="favorite-btns">
              <ShareButtonFavorites
                index={ index }
                id={ e.id }
                className="btn-share"
                type={ e.type === 'drink' ? 'drinks' : 'meals' }
              />
              <button
                src={ blackHeartIcon }
                type="button"
                className="btn-favorite"
                data-testid={ `${index}-horizontal-favorite-btn` }
                onClick={ () => { removeFavorite(e.id); } }
              >
                <img src={ blackHeartIcon } alt="Favorite button" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
export default FavoriteRecipes;

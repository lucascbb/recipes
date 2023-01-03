import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import ShareButtonFavorites from '../components/ShareButtonFavorites';
import '../styles/FavoriteRecipes.css';

function FavoriteRecipes() {
  // localStorage.setItem('favoriteRecipes', JSON.stringify(receitas));

  // EMULAÇÃO DO LOCAL STORAGE

  const [favoritesList, setFavoritesList] = useState([]);
  const [backupFavoritesList, setBackupFavoritesList] = useState([]);
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
  }, []);

  const removeFavorite = (id) => {
    console.log('REMOVEU', id);
    const idsList = favoritesList.map((e) => (e.id));
    const indexToRemove = idsList.indexOf(id);
    const newFavoritesList = [...favoritesList];
    newFavoritesList.splice(indexToRemove, 1);
    setFavoritesList(newFavoritesList);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoritesList));
    // Salvar no local storage-------
  };

  const filterMeals = () => {
    const filtredArray = backupFavoritesList.filter((e) => e.type === 'meal');
    setFavoritesList(filtredArray);
  };
  const filterDrinks = () => {
    const filtredArray = backupFavoritesList.filter((e) => e.type === 'drink');
    setFavoritesList(filtredArray);
  };
  const filterAll = () => {
    setFavoritesList(backupFavoritesList);
  };
  return (
    <div className="favorite-page">
      <Header pageName="Favorite Recipes" searchingOFF />
      <h1>Lista de receitas favoritas</h1>
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ filterAll }
        className="category-btn-favorite"
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-meal-btn"
        onClick={ filterMeals }
        className="category-btn-favorite"
      >
        Meals
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ filterDrinks }
        className="category-btn-favorite"
      >
        Drinks
      </button>

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
                {
                  e.name
                }
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
            <div className="btn-share">
              <ShareButtonFavorites
                index={ index }
                id={ e.id }
                type={ e.type === 'drink' ? 'drinks' : 'meals' }
              />

              <button
                src={ blackHeartIcon }
                type="button"
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

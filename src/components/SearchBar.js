import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import { recipesMeals, recipesDrinks } from '../redux/actions';
import '../styles/SearchBar.css';

function SearchBar() {
  const [searchType, setSearchType] = useState('ingredient');
  const [searchValue, setSearchValue] = useState('');
  const [FecthUrl, setFecthUrl] = useState();
  const [newRecipes, setNewRecipes] = useState();
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchFood = async () => {
      try {
        if (FecthUrl) {
          const response = await fetch(FecthUrl);
          const dataJson = await response.json();
          if (!(!dataJson.drinks && !dataJson.meals)) {
            setNewRecipes(dataJson);
          } else {
            global.alert('Sorry, we haven\'t found any recipes for these filters.');
          }
        }
      } catch (error) {
        global.alert('Sorry, we haven\'t found any recipes for these filters.');
      }
    };
    fetchFood();
  }, [FecthUrl]);

  useEffect(() => {
    if (newRecipes) {
      if (location.pathname === '/meals') {
        if (newRecipes.meals.length === 1) {
          history.push(`/meals/${newRecipes.meals[0].idMeal}`);
        }
        const doze = 12;
        const dozeMeals = newRecipes.meals.slice(0, doze);
        dispatch(recipesMeals(dozeMeals));
      }

      if (location.pathname === '/drinks') {
        if (newRecipes.drinks.length === 1) {
          history.push(`/drinks/${newRecipes.drinks[0].idDrink}`);
        }
        const doze = 12;
        const dozeDrinks = newRecipes.drinks.slice(0, doze);
        dispatch(recipesDrinks(dozeDrinks));
      }
    }
  }, [newRecipes]);

  const searchMeals = async () => {
    switch (searchType) {
    case 'ingredient':
      setFecthUrl(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchValue}`);
      break;
    case 'name':
      setFecthUrl(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`);
      break;
    case 'firstLetter':
      if (searchValue.length > 1) {
        global.alert('Your search must have only 1 (one) character');
      } else {
        setFecthUrl(`https://www.themealdb.com/api/json/v1/1/search.php?f=${searchValue}`);
      }
      break;
    default:
      break;
    }
  };

  const searchDrinks = async () => {
    switch (searchType) {
    case 'ingredient':
      setFecthUrl(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchValue}`);
      break;
    case 'name':
      setFecthUrl(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchValue}`);
      break;
    case 'firstLetter':
      if (searchValue.length > 1) {
        global.alert('Your search must have only 1 (one) character');
      } else {
        setFecthUrl(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${searchValue}`);
      }
      break;
    default:
      break;
    }
  };

  const serchRecipes = () => {
    if (location.pathname === '/meals') {
      searchMeals();
    }
    if (location.pathname === '/drinks') {
      searchDrinks();
    }
  };

  return (
    <div className="searchBar-principalDiv">
      <input
        value={ searchValue }
        onChange={ (e) => { setSearchValue(e.target.value); } }
        type="text"
        placeholder="Search"
        data-testid="search-input"
        className="searchBar-Input"
      />
      <div className="searchBar-SecondDiv">
        <div className="searchBar-radiosDiv">
          <label htmlFor="ingredient" className="searchBar-RadiosInputLabel">
            <input
              data-testid="ingredient-search-radio"
              type="radio"
              name="searchType"
              className="searchBar-RadiosInput"
              id="ingredient"
              value="ingredient"
              checked={ searchType === 'ingredient' }
              onChange={ (e) => setSearchType(e.target.value) }
            />
            Ingredient
          </label>
          <label htmlFor="name" className="searchBar-RadiosInputLabel">
            <input
              data-testid="name-search-radio"
              className="searchBar-RadiosInput"
              type="radio"
              name="searchType"
              id="name"
              value="name"
              checked={ searchType === 'name' }
              onChange={ (e) => setSearchType(e.target.value) }
            />
            Name
          </label>
          <label htmlFor="firstLetter" className="searchBar-RadiosInputLabel">
            <input
              data-testid="first-letter-search-radio"
              type="radio"
              className="searchBar-RadiosInput"
              name="searchType"
              id="firstLetter"
              value="firstLetter"
              checked={ searchType === 'firstLetter' }
              onChange={ (e) => setSearchType(e.target.value) }
            />
            First letter
          </label>
        </div>
        <button
          type="button"
          data-testid="exec-search-btn"
          onClick={ serchRecipes }
          className="searchBar-searchBTN"
        >
          Search
        </button>
      </div>
    </div>
  );
}

export default SearchBar;

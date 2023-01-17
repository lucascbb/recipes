import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { receiveRecipeforId, receiveRecipes } from '../redux/actions';
import getRecipes from '../services/getRecipes';
import getRecipeForId from '../services/getRecipeForId';
import FavoriteButton from './FavoriteButton';
import ShareButton from './ShareButton';
import RecommendationCard from './RecommendationCard';
import '../styles/RecipeDetails.css';
import back from '../images/back.png';
import instruction from '../images/instructions.png';
import ingredientsImg from '../images/ingredients.png';

function RecipeDetails({ match: { params: { id } }, location: { pathname } }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [ingredients, setingredients] = useState();
  const [completeRecipe, setCompleteRecipe] = useState(false);
  const [progressRecipes, setProgressRecipe] = useState(false);
  const [recipe, setRecipe] = useState();
  const [type, setType] = useState();
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  const startedRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));

  useEffect(() => {
    const getRequest = async () => {
      if ((pathname === `/recipes/drinks/${id}`) || (pathname === `/recipes/drinks/${id}/`)) {
        console.log('drinks')
        const urlId = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';
        const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
        const recipeId = await getRecipeForId(urlId, id);
        const recommendationRecipes = await getRecipes(url);
        setRecipe(recipeId);
        dispatch(receiveRecipeforId(recipeId));
        dispatch(receiveRecipes(recommendationRecipes));
      } else {
        console.log('meals')
        const urlId = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
        const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
        const recipeId = await getRecipeForId(urlId, id);
        const recommendationRecipes = await getRecipes(url);
        setRecipe(recipeId);
        dispatch(receiveRecipeforId(recipeId));
        dispatch(receiveRecipes(recommendationRecipes));
      }
    };
    getRequest();
  }, []);

  useEffect(() => {
    if (recipe) {
      const keyproduct = Object.keys(recipe).toString();
      const keys = Object.keys(recipe[keyproduct][0]);
      const allIngredients = [];
      keys.forEach((element) => {
        if (element.includes('strIngredient') && recipe[keyproduct][0][element]) {
          allIngredients.push(element);
        }
        setingredients(allIngredients);
        setType(keyproduct);
      });
    }
  }, [recipe]);

  useEffect(() => {
    if (doneRecipes) {
      doneRecipes.forEach((item) => {
        if (item.id === id) {
          setCompleteRecipe(true);
        }
      });
    }
  }, [doneRecipes]);

  useEffect(() => {
    if (startedRecipes && type) {
      const idStartedRecipes = Object.keys(startedRecipes[type]);
      idStartedRecipes.forEach((item) => {
        if (item === id) {
          setProgressRecipe(true);
        }
      });
    }
  }, [startedRecipes, type]);

  const setAllIngredients = () => {
    const listIngredient = ingredients.map((element, index) => (
      <p
        key={ index }
        data-testid={ `${index}-ingredient-name-and-measure` }
        className="details-ingredients"
      >
        {' •  '}
        {recipe[type][0][`strMeasure${index + 1}`]}
        {' '}
        {recipe[type][0][element]}
      </p>
    ));
    return listIngredient;
  };

  const startRecipe = () => {
    history.push(`${pathname}/in-progress`);
  };

  return (
    <div>
      {ingredients ? (
        <div>
          <div className="details-btns">
            <div>
              <button
                className="details-backbtn"
                type="button"
                onClick={ () => {
                  if (pathname.includes('/recipes/drinks')) {
                    history.push('/recipes/drinks');
                  } else {
                    history.push('/recipes/meals');
                  }
                } }
              >
                <img src={ back } alt="" className="details-backicon" />
              </button>
            </div>
            <div className="details-doubleBtns">
              <FavoriteButton />
              <ShareButton />
            </div>
          </div>
          {pathname.includes(`/recipes/meals/${id}`) ? (
            <section>
              <div className="recipeDetails-paiImg">
                <img
                  src={ recipe.meals[0].strMealThumb }
                  alt={ recipe.meals[0].strMeal }
                  data-testid="recipe-photo"
                  className="recipeDetails-img"
                />
              </div>
              <div className="details-paiName">
                <h3
                  data-testid="recipe-title"
                  className="details-name"
                >
                  {recipe.meals[0].strMeal}
                </h3>
              </div>
              <p
                data-testid="recipe-category"
                className="details-category"
              >
                {`Category: ${recipe.meals[0].strCategory}`}
              </p>

              <div className="details-paiIngredients">
                <div className="details-paiingredient">
                  <img src={ ingredientsImg } className="details-imgIngredient"/>
                  <p className="details-ingredient">Ingredients</p>
                </div>
                {setAllIngredients()}
              </div>

              <div className="details-paiInstructions">
                <div className="details-paiingredient">
                  <img src={ instruction } className="details-imgIngredient"/>
                  <p className="details-ingredient">Instruction</p>
                </div>
                <p
                  data-testid="instructions"
                  className="details-instructions"
                >{recipe.meals[0].strInstructions}</p>
              </div>
              {recipe.meals[0].strYoutube === "" ? null : 
              <div className='details-paivideo'>
                <iframe
                  data-testid="video"
                  className="details-video"
                  src={ `${recipe.meals[0].strYoutube
                    .replace('watch?v=', 'embed/')}?autoplay=1&mute=1` }
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer;
                  clipboard-write;
                  encrypted-media;
                  gyroscope;
                  picture-in-picture"
                  allowFullScreen
                />
              </div>}
            </section>
          ) : (
            <section>
              <div className="recipeDetails-paiImg">
                <img
                  src={ recipe[type][0].strDrinkThumb }
                  alt={ recipe[type][0].strDrink }
                  data-testid="recipe-photo"
                  className="recipeDetails-img"
                />
              </div>
              <div className="details-paiName">
                <h3
                  data-testid="recipe-title"
                  className="details-name"
                >
                  {recipe[type][0].strDrink}
                </h3>
              </div>
              <p
                data-testid="recipe-category"
                className="details-category"
              >
                {`Category: ${recipe[type][0].strAlcoholic}`}
              </p>
              <div className="details-paiIngredients">
                <div className="details-paiingredient">
                  <img src={ ingredientsImg } className="details-imgIngredient"/>
                  <p className="details-ingredient">Ingredients</p>
                </div>
                {setAllIngredients()}
              </div>
              <div className="details-paiInstructions">
                <div className="details-paiingredient">
                  <img src={ instruction } className="details-imgIngredient"/>
                  <p className="details-ingredient">Instruction</p>
                </div>
                <p
                  data-testid="instructions"
                  className="details-instructions"
                >{recipe[type][0].strInstructions}</p>
              </div>
            </section>
          )}
          <section>
            <RecommendationCard />
          </section>
        </div>
      ) : null}
      <div className="details-paiStart">
        {!completeRecipe ? (
          <button
            type="button"
            data-testid="start-recipe-btn"
            className="details-start"
            onClick={ startRecipe }
            style={ {
              position: 'fixed',
              bottom: '8px',
            } }
          >
            Start Recipe
          </button>) : null}
        {progressRecipes ? (
          <button
            type="button"
            data-testid="start-recipe-btn"
            className="details-start"
            onClick={ startRecipe }
            style={ {
              position: 'fixed',
              bottom: '8px',
            } }
          >
            Continue Recipe
          </button>) : null}
      </div>
    </div>
  );
}
RecipeDetails.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
  history: PropTypes.object,
}.isRequired;

export default RecipeDetails;

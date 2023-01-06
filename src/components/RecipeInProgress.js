import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import FavoriteButton from './FavoriteButton';
import ShareButton from './ShareButton';
import { receiveRecipeforId } from '../redux/actions/index';
import CheckBox from './CheckBox';
import '../styles/Inprogress.css';
import back from '../images/back.png';
import instruction from '../images/instructions.png';
import ingredientsImg from '../images/ingredients.png';

function RecipeInProgress() {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const { id } = useParams();
  const [drinksID, setDataDrinks] = useState();
  const [mealsID, setDataMeals] = useState();
  const [finishBTN, setFinishBTN] = useState(true);
  const [numberCheckbox, setNumberCheckbox] = useState(document.getElementsByClassName('inprogress-input').length);
  const [listOfIngredients, setListOfIngredients] = useState([]);
  const saveLocalStorage = (newArray) => {
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (location.pathname.includes('meals')) {
      localStorage.setItem('inProgressRecipes', JSON.stringify({ ...inProgressRecipes,
        meals: { ...inProgressRecipes.meals, [id]: newArray } }));
    } else {
      localStorage.setItem('inProgressRecipes', JSON.stringify({ ...inProgressRecipes,
        drinks: { ...inProgressRecipes.drinks, [id]: newArray } }));
    }
  };
  const handleChecked = ({ target }) => {
    if (listOfIngredients) {
      const checked = listOfIngredients.some((e) => (e === target.name));
      if (!checked) {
        setListOfIngredients([...listOfIngredients, target.name]);
        const newArray = [...listOfIngredients, target.name];
        saveLocalStorage(newArray);
      } else {
        const index = listOfIngredients.indexOf(target.name);
        const newArray = [...listOfIngredients];
        newArray.splice(index, 1);
        setListOfIngredients(newArray);
        saveLocalStorage(newArray);
      }
    }
  };

  const testADD = (ingredient) => {
    let checked = false;
    if (listOfIngredients) {
      checked = listOfIngredients.some((e) => (e === ingredient));
    } return checked;
  };

  useEffect(() => {
    let ops = [];
    if (document.getElementsByClassName('paiCheckbox')[0]) {
      for (let i = 0; i < document.getElementsByClassName('paiCheckbox').length; i++) {
        ops.push(document.getElementsByClassName('inprogress-pai')[i].children[0].innerText)
        const igual = ops.filter((ele) => ele === document.getElementsByClassName('inprogress-pai')[i].children[0].innerText)
        if (igual.length > 1) {
          setNumberCheckbox(document.getElementsByClassName('paiCheckbox').length - 1)
        }
      }
    }

    if (listOfIngredients.length > 0 && numberCheckbox > 0 
      && numberCheckbox === listOfIngredients.length) {
      setFinishBTN(false)
    } else if (listOfIngredients.length > 0 && numberCheckbox === 0) {
      setFinishBTN(false)
    } else { 
      setFinishBTN(true)     
    }
  }, [listOfIngredients, numberCheckbox]);

  const saveMeals = () => {
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (!inProgressRecipes.meals[id]) {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        drinks: { ...inProgressRecipes.drinks },
        meals: { ...inProgressRecipes.meals, [id]: [] },
      })); setListOfIngredients([]);
    }
  };

  const saveDrinks = () => {
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (!inProgressRecipes.drinks[id]) {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        drinks: { ...inProgressRecipes.drinks, [id]: [] },
        meals: { ...inProgressRecipes.meals },
      })); setListOfIngredients([]);
    }
  };

  useEffect(() => {
    const inProgressRecipes2 = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (!inProgressRecipes2) {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        drinks: { },
        meals: { },
      }));
    } const donesRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    if (!donesRecipes) {
      localStorage.setItem('doneRecipes', '[]');
    } const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (location.pathname.includes('meals')) {
      fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then((response) => response.json())
        .then((fetchComida) => {
          setDataMeals(fetchComida.meals[0]);
          dispatch(receiveRecipeforId(fetchComida));
          setNumberCheckbox(Object.entries(fetchComida.meals[0]).filter((ele) => ele[0]
            .includes('strIngredient') && ele[1]).map((ele) => ele[1]).length);
          if (inProgressRecipes.meals[id]) {
            setListOfIngredients(inProgressRecipes.meals[id]);
          }
        }); saveMeals();
    } else {
      fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then((response) => response.json())
        .then((fetchBebida) => {
          setDataDrinks(fetchBebida.drinks[0]);
          dispatch(receiveRecipeforId(fetchBebida));
          setNumberCheckbox(Object.entries(fetchBebida.drinks[0]).filter((ele) => ele[0]
            .includes('strIngredient') && ele[1]).map((ele) => ele[1]).length);
        });
      if (inProgressRecipes.drinks[id]) {
        setListOfIngredients(inProgressRecipes.drinks[id]);
      } saveDrinks();
    }
  }, []);

  const handleFinish = () => {
    const dma = new Date().toLocaleDateString();
    const tempo = new Date().toLocaleTimeString();
    const doneRecipesLocal = JSON.parse(localStorage.getItem('doneRecipes'));
    const result = location.pathname.includes('meals');
    const recipesFood = [...doneRecipesLocal, {
      id: result ? mealsID.idMeal : drinksID.idDrink,
      nationality: result ? mealsID.strArea : '',
      name: result ? mealsID.strMeal : drinksID.strDrink,
      category: result ? mealsID.strCategory : drinksID.strCategory,
      image: result ? mealsID.strMealThumb : drinksID.strDrinkThumb,
      tags: result ? mealsID.strTags : [],
      alcoholicOrNot: result ? '' : drinksID.strAlcoholic,
      type: result ? 'meal' : 'drink',
      doneDate: dma,
      time: tempo,
    }];
    localStorage.setItem('doneRecipes', JSON.stringify(recipesFood));
    history.push('/done-recipes');
  };


  return (
    <div>
      {drinksID ? (
        <div>
          <div className="inProgress-btns">
            <button
              className="details-backbtn"
              type="button"
              onClick={ () => {
                if (location.pathname.includes('drinks')) {
                  history.push('/drinks');
                } else {
                  history.push('/meals');
                }
              } }
            >
              <img src={ back } alt="" className="details-backicon" />
            </button>
            <div className="details-doubleBtns">
              <FavoriteButton />
              <ShareButton testid="share-btn" />
            </div>
          </div>
          <img
            className="inProgress-img"
            data-testid="recipe-photo"
            src={ drinksID.strDrinkThumb }
            alt={ drinksID.strDrink }
          />
          <div className="inProgress-paiName">
            <p
              data-testid="recipe-title"
              className="inProgress-name"
            >
              { drinksID.strDrink }
            </p>
          </div>
          <p 
            data-testid="recipe-category"
            className="details-category"
          >
            { `Category: ${drinksID.strCategory}` }
          </p>
          <div className="inProgress-paiInstruction">
            <div className="inProgress-imgpai1">
              <img src={ instruction } alt="" className="inProgress-IMGinstruction"/>
              <p className="inProgress-instructionTitle">Instruction</p>
            </div>
            <p
              data-testid="instructions"
              className="inProgress-instruction"
            >
              { drinksID.strInstructions }
            </p>
          </div>
          <div className="inProgress-checkbox">
            <div className="inProgress-imgpai2">
              <img src={ ingredientsImg } alt="" className="inProgress-IMGingredients" />
              <p className="inProgress-ingredient">Ingredients</p>
            </div>
            {Object.entries(drinksID).filter((ele) => ele[0]
              .includes('strIngredient') && ele[1]).map((ele) => ele[1])
              .map((ele2Ingredient, indexDrinks) => (
                <div key={ indexDrinks } className="paiCheckbox" >
                  <CheckBox
                    ingredient={ ele2Ingredient }
                    index={ indexDrinks }
                    id={ drinksID.idDrink }
                    type="drinks"
                    handleCheckedMain={ handleChecked }
                    listChecked={ listOfIngredients }
                    check={ testADD(ele2Ingredient) }
                  />
                </div>
              ))}
          </div>
        </div>
      ) : null}
      {/* metade//////////////////////////////////////////////////////////// */}
      {mealsID ? (
        <div>
          <div className="inProgress-btns">
            <button
              className="details-backbtn"
              type="button"
              onClick={ () => {
                if (location.pathname.includes('drinks')) {
                  history.push('/drinks');
                } else {
                  history.push('/meals');
                }
              } }
            >
              <img src={ back } alt="" className="details-backicon" />
            </button>
            <div className="details-doubleBtns">
              <FavoriteButton />
              <ShareButton testid="share-btn" />
            </div>
          </div>
          <img
            className="inProgress-img"
            data-testid="recipe-photo"
            src={ mealsID.strMealThumb }
            alt={ mealsID.strMeal }
          />
          <div className="inProgress-paiName">
            <p
              data-testid="recipe-title"
              className="inProgress-name"
            >
              { mealsID.strMeal }
            </p>
          </div>
          <p 
            data-testid="recipe-category"
            className="details-category"
          >
            { `Category: ${mealsID.strCategory}` }
          </p>
          <div className="inProgress-paiInstruction">
            <div className="inProgress-imgpai1">
              <img src={ instruction } alt="" className="inProgress-IMGinstruction"/>
              <p className="inProgress-instructionTitle">Instruction</p>
            </div>
            <p
              data-testid="instructions"
              className="inProgress-instruction"
            >
              { mealsID.strInstructions }
            </p>
          </div>
          <div className="inProgress-checkbox">
            <div className="inProgress-imgpai2">
              <img src={ ingredientsImg } alt="" className="inProgress-IMGinstruction"/>
              <p className="inProgress-ingredient">Ingredients</p>
            </div>
            {Object.entries(mealsID).filter((ele) => ele[0]
              .includes('strIngredient') && ele[1]).map((ele) => ele[1])
              .map((ele2Ingredient, indexMeals) => (
                <div key={ indexMeals } className="paiCheckbox">
                  <CheckBox
                    ingredient={ ele2Ingredient }
                    index={ indexMeals }
                    id={ mealsID.idMeal }
                    type="meals"
                    handleCheckedMain={ handleChecked }
                    listChecked={ listOfIngredients }
                    check={ testADD(ele2Ingredient) }
                  />
                </div>
              ))}
          </div>
        </div>
      ) : null}
      <div className="inProgress-paiBtnFinish">
        <button
          data-testid="finish-recipe-btn"
          type="button"
          onClick={ handleFinish }
          disabled={ finishBTN }
          className="inProgress-btnFinish"
        >
          Finish Recipe
        </button>
      </div>
    </div>
  );
}

RecipeInProgress.propTypes = {
  checked: PropTypes.func,
}.isRequired;

export default RecipeInProgress;

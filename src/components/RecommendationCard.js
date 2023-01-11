import React, { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import '../styles/RecommendationCard.css';

function RecommendationCard() {
  const history = useHistory();
  const location = useLocation();
  const recommendation = useSelector((state) => state.recipes.allRecipes);
  const [data, setData] = useState([]);
  const type = Object.keys(recommendation).toString();

  console.log(data);
  // console.log(window.location);
  // console.log(recommendation);
  // console.log(type);

  useEffect(() => {
    const key = 6;
    if (type) {
      if (type === 'drinks') {
        const drinkData = recommendation.drinks;
        const recommendationDataD = drinkData.slice(0, key);
        setData(recommendationDataD);
      } else {
        const mealsData = recommendation.meals;
        const recommendationDataM = mealsData.slice(0, key);
        setData(recommendationDataM);
      }
    }
  }, []);

  const startDrink = async (id) => {
    history.push(`/recipes/drinks/${id}`);
    document.location.reload(true);
  };
  const startMeal = async (id) => {
    history.push(`/recipes/meals/${id}`);
    document.location.reload(true);
  };

  return (
    <div>
      <h1 className="details-wrapper">Recomendações</h1>
      <div className="container-recommendation">
        <div className="container-wrapper">
          {type === 'drinks' ? (
              data.map((ele, i) => (
                <div key={ i }>
                  <button onClick={ () => startDrink(ele.idDrink) }>
                    <img src={ ele.strDrinkThumb } alt={ ele.strCategory } />
                    <p data-testid={ `${i}-recommendation-title` }>{ele.strDrink}</p>
                  </button>
                </div>
              ))
          ) : (
              data.map((ele, i) => (
                <div key={ i }>
                  <button onClick={ () => startMeal(ele.idMeal) }>
                    <img src={ ele.strMealThumb } alt={ ele.strCategory } />
                    <p data-testid={ `${i}-recommendation-title` }>{ele.strMeal}</p>
                  </button>
                </div>
              ))
            )
            }
        </div>
      </div>
    </div>
  );
}

export default RecommendationCard;

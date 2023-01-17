import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import '../styles/RecommendationCard.css';

function RecommendationCard() {
  const recommendation = useSelector((state) => state.recipes.allRecipes);
  const [data, setData] = useState([]);
  const type = Object.keys(recommendation).toString();

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

  return (
    <div>
      <h1 className="details-wrapper">Recomendações</h1>
      <div className="container-recommendation">
        <div className="container-wrapper">
          {type === 'drinks' ? (
            <section className="gallery">
              {data.map((element, i) => (
                <div
                  className="details-link"
                  data-testid={ `${i}-recommendation-card` }
                  key={ element.idDrink }
                >
                  <img src={ element.strDrinkThumb } alt={ element.strCategory } />
                  <p data-testid={ `${i}-recommendation-title` }>{element.strDrink}</p>
                </div>
              ))}
            </section>
          ) : (
            <section className="gallery">
              {data.map((element, i) => (
                <div
                  className="details-link"
                  data-testid={ `${i}-recommendation-card` }
                  key={ element.idMeal }
                >
                  <img src={ element.strMealThumb } alt={ element.strCategory } />
                  <p data-testid={ `${i}-recommendation-title` }>{element.strMeal}</p>
                </div>
              ))}
            </section>)}
        </div>
      </div>
    </div>
  );
}

export default RecommendationCard;

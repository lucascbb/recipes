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

  // console.log(data);
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

  // const startDrink = async (id) => {
  //   console.log(id);
  //   // console.log(location.pathname);
  //   history.push(`/recipes/drinks/${id}`);
  //   document.location.reload(true);
  // };
  // const startMeal = async (id) => {
  //   console.log(id);
  //   // console.log(location.pathname);
  //   history.push(`/recipes/meals/${id}`);
  //   document.location.reload(true);
  // };

  return (
    <div>
      <h1 className="details-wrapper">Recomendações</h1>
      <div className="container-recommendation">
        <div className="container-wrapper">
          {type === 'drinks' ? (
            <section className="gallery">
              {data.map((element, i) => (
                <Link
                  className="details-link"
                  data-testid={ `${i}-recommendation-card` }
                  key={ element.idDrink }
                  to={ `/recipes/drinks/${element.idDrink}` }
                  onClick={ () => window.location.replace(`/recipes/drinks/${element.idDrink}`) }
                >
                  <img src={ element.strDrinkThumb } alt={ element.strCategory } />
                  <p data-testid={ `${i}-recommendation-title` }>{element.strDrink}</p>
                </Link>
              ))}
            </section>
          ) : (
            <section className="gallery">
              {data.map((element, i) => (
                <Link
                  className="details-link"
                  data-testid={ `${i}-recommendation-card` }
                  key={ element.idMeal }
                  to={ `/recipes/meals/${element.idMeal}` }
                  onClick={ () => window.location.replace(`/recipes/meals/${element.idMeal}`) }
                >
                  <img src={ element.strMealThumb } alt={ element.strCategory } />
                  <p data-testid={ `${i}-recommendation-title` }>{element.strMeal}</p>
                </Link>
              ))}
            </section>)}
        </div>
      </div>
    </div>
  );
}

export default RecommendationCard;

import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { recipesMeals } from '../redux/actions';
import Header from '../components/Header';
import '../styles/Meals.css';
import chic from '../images/chicken.png';
import beef from '../images/beef.png';
import brea from '../images/breakfast.png';
import goat from '../images/goat.png';
import dess from '../images/dessert.png';
import lamb from '../images/lamb.png';
import misc from '../images/misc.png';
import pasta from '../images/pasta.png';
import pig from '../images/pig.png';
import sea from '../images/seafood.png';
import side from '../images/side.png';
import star from '../images/starter.png';
import vega from '../images/vegan.png';
import veg from '../images/veg.png';
import all from '../images/all.png';

class Meals extends React.Component {
  state = {
    categoriesMeals: [],
    selectedCategory: '',
    comidas: [],
    color: 'linear-gradient(to bottom, #f50043 5%, #a54e66 100%)',
    border: '5px solid black',
  };

  async componentDidMount() {
    const { dispatch } = this.props;
    const { selectedCategory, color, border } = this.state;
    const doze = 12;
    // const cinco = 5;

    const responseMeals = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const mealsData = await responseMeals.json();
    const dozeMeals = mealsData.meals.slice(0, doze);

    const responseCategories = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
    const mealsCategoriesData = await responseCategories.json();
    // const cincoCategoriesMeals = mealsCategoriesData.meals.slice(0, cinco);
    dispatch(recipesMeals(dozeMeals));

    this.setState({
      categoriesMeals: mealsCategoriesData.meals,
      selectedCategory: '',
      comidas: dozeMeals,
    });

    const allBTN = document.getElementsByClassName(selectedCategory)[0];
    if (allBTN) {
      allBTN.parentNode.style.background = '';
      allBTN.parentNode.style.border = '';
    }
    document.getElementsByClassName('all')[0].parentNode.style.background = color;
    document.getElementsByClassName('all')[0].parentNode.style.border = border;
  }

  categorySelected = async ({ target }) => {
    const { selectedCategory, comidas, color, border } = this.state;
    const { dispatch } = this.props;
    const doze = 12;

    document.getElementsByClassName('all')[0].parentNode.style.background = '';
    document.getElementsByClassName('all')[0].parentNode.style.border = '';

    const selectedData = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${target.id}`);
    const categoryData = await selectedData.json();
    const dozeCategories = categoryData.meals.slice(0, doze);
    dispatch(recipesMeals(dozeCategories));

    this.setState({ selectedCategory: target.id });
    const p = document.getElementsByClassName(selectedCategory)[0];

    if (target.id === selectedCategory) {
      dispatch(recipesMeals(comidas));
      this.setState({ selectedCategory: '' });
      target.parentNode.style.background = '';
      target.parentNode.style.border = '';
      document.getElementsByClassName('all')[0].parentNode.style.background = color;
      document.getElementsByClassName('all')[0].parentNode.style.border = border;
    } else if (target.id !== selectedCategory) {
      target.parentNode.style.background = color;
      target.parentNode.style.border = border;
      if (p) { p.parentNode.style.background = ''; p.parentNode.style.border = ''; }
    }
  };

  mealsRender = () => {
    const { categoriesMeals } = this.state;
    const { mealsState } = this.props;
    return (
      <section>
        <Header pageName="Meals" />
        <div className="meals-divBtnPai">
          <div className="meals-categoryALL">
            <button
              aria-label="categoryBTN"
              type="button"
              className="meals-btnCategory"
              onClick={ () => { this.componentDidMount(); } }
              data-testid="All-category-filter"
            >
              <img className="all" src={ all } alt="" />
            </button>
            All
          </div>
          {categoriesMeals.map((ele, index2) => (
            <div key={ index2 } className="meals-categoryALL">
              <button
                aria-label="categoryBTN"
                type="button"
                className="meals-btnCategory"
                id={ ele.strCategory }
                onClick={ this.categorySelected }
                data-testid={ `${ele.strCategory}-category-filter` }
              >
                {ele.strCategory === 'Beef' ? (
                  <img className="Beef" src={ beef } alt="" id={ ele.strCategory } />) : (
                  null)}
                {ele.strCategory === 'Breakfast' ? (
                  <img className="Breakfast" src={ brea } alt="" id={ ele.strCategory } />) : (
                  null)}
                {ele.strCategory === 'Chicken' ? (
                  <img className="Chicken" src={ chic } alt="" id={ ele.strCategory } />) : (
                  null)}
                {ele.strCategory === 'Dessert' ? (
                  <img className="Dessert" src={ dess } alt="" id={ ele.strCategory } />) : (
                  null)}
                {ele.strCategory === 'Goat' ? (
                  <img className="Goat" src={ goat } alt="" id={ ele.strCategory } />) : (
                  null)}
                {ele.strCategory === 'Lamb' ? (
                  <img className="Lamb" src={ lamb } alt="" id={ ele.strCategory } />) : (
                  null)}
                {ele.strCategory === 'Miscellaneous' ? (
                  <img className="Miscellaneous" src={ misc } alt="" id={ ele.strCategory } />) : (
                  null)}
                {ele.strCategory === 'Pasta' ? (
                  <img className="Pasta" src={ pasta } alt="" id={ ele.strCategory } />) : (
                  null)}
                {ele.strCategory === 'Pork' ? (
                  <img className="Pork" src={ pig } alt="" id={ ele.strCategory } />) : (
                  null)}
                {ele.strCategory === 'Seafood' ? (
                  <img className="Seafood" src={ sea } alt="" id={ ele.strCategory } />) : (
                  null)}
                {ele.strCategory === 'Side' ? (
                  <img className="Side" src={ side } alt="" id={ ele.strCategory } />) : (
                  null)}
                {ele.strCategory === 'Starter' ? (
                  <img className="Starter" src={ star } alt="" id={ ele.strCategory } />) : (
                  null)}
                {ele.strCategory === 'Vegan' ? (
                  <img className="Vegan" src={ vega } alt="" id={ ele.strCategory } />) : (
                  null)}
                {ele.strCategory === 'Vegetarian' ? (
                  <img className="Vegetarian" src={ veg } alt="" id={ ele.strCategory } />) : (
                  null)}
              </button>
              { ele.strCategory }
            </div>
          ))}
        </div>
        <div className="meals-divPai">
          {mealsState.map((ele, index) => (
            <Link to={ `/meals/${ele.idMeal}` } key={ index } className="meals-link">
              <div
                key={ index }
                data-testid={ `${index}-recipe-card` }
                className="meals-Card"
              >
                <img
                  src={ ele.strMealThumb }
                  alt={ ele.strMeal }
                  className="meals-img"
                  data-testid={ `${index}-card-img` }
                />
                <p
                  data-testid={ `${index}-card-name` }
                  className="meals-nameRecipe"
                >
                  {ele.strMeal}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    );
  };

  render() {
    return (
      <div>
        {this.mealsRender()}
      </div>
    );
  }
}
Meals.propTypes = {
  dispatch: PropTypes.func,
}.isRequired;

const mapStateToProps = (state) => ({
  mealsState: state.recipes.meals,
});

export default connect(mapStateToProps)(Meals);

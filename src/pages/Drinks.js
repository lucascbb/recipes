import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { recipesDrinks } from '../redux/actions';
import Header from '../components/Header';
import '../styles/Drinks.css';
import shake from '../images/shake.png';
import cocktail from '../images/cocktail.png';
import coc from '../images/cocoa.png';
import shot from '../images/shot.png';
import coffee from '../images/coffee.png';
import liqueur from '../images/liqueur.png';
import punch from '../images/punch.png';
import beer from '../images/beer.png';
import soft from '../images/soft.png';
import unknown from '../images/unknow.png';
import alldrink from '../images/alldrink.png';

class Drinks extends React.Component {
  state = {
    bebidas: [],
    categoriesDrink: [],
    selectedCategory: '',
    color: 'linear-gradient(to bottom, #f50043 5%, #a54e66 100%)',
    border: '5px solid black',
  };

  async componentDidMount() {
    const { dispatch } = this.props;
    const { selectedCategory, color, border } = this.state;
    const doze = 12;
    // const cinco = 5;

    const responseDrinks = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    const drinksData = await responseDrinks.json();
    const dozeDrinks = drinksData.drinks.slice(0, doze);

    const responseCategories = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
    const categoriesDrinkData = await responseCategories.json();
    // const cincoCategoriesDrinks = categoriesDrinkData.drinks.slice(0, cinco);

    dispatch(recipesDrinks(dozeDrinks));
    this.setState({
      categoriesDrink: categoriesDrinkData.drinks,
      selectedCategory: '',
      bebidas: dozeDrinks,
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
    const { selectedCategory, bebidas, color, border } = this.state;
    const { dispatch } = this.props;
    const doze = 12;

    document.getElementsByClassName('all')[0].parentNode.style.background = '';
    document.getElementsByClassName('all')[0].parentNode.style.border = '';

    const selectedData = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${target.id}`);
    const categoryData = await selectedData.json();
    const dozeCategories = categoryData.drinks.slice(0, doze);
    dispatch(recipesDrinks(dozeCategories));

    this.setState({ selectedCategory: target.id });

    const p = document.getElementsByClassName(selectedCategory)[0];

    if (target.id === selectedCategory) {
      dispatch(recipesDrinks(bebidas));
      this.setState({ selectedCategory: '' });
      target.parentNode.style.background = '';
      target.parentNode.style.border = '';
      document.getElementsByClassName('all')[0].parentNode.style.background = color;
      document.getElementsByClassName('all')[0].parentNode.style.border = border;
      console.log('primeiro if');
    } else if (target.id !== selectedCategory) {
      target.parentNode.style.background = color;
      target.parentNode.style.border = border;
      console.log('segundo if');
      if (p) { p.parentNode.style.background = ''; p.parentNode.style.border = ''; }
    }
  };

  drinksRender = () => {
    const { categoriesDrink } = this.state;
    const { drinkState } = this.props;

    return (
      <section>
        <Header pageName="Drinks" />
        <div className="drinks-divBtnPai">
          <div className="drinks-categoryALL">
            <button
              type="button"
              className="drinks-btnCategory"
              onClick={ () => { this.componentDidMount(); } }
              data-testid="All-category-filter"
            >
              <img className="all" src={ alldrink } alt="" />
            </button>
            All
          </div>
          {categoriesDrink.map((ele, index2) => (
            <div key={ index2 } className="drinks-categoryALL">
              <button
                type="button"
                className="drinks-btnCategory"
                // id={ ele.strCategory }
                onClick={ this.categorySelected }
                data-testid={ `${ele.strCategory}-category-filter` }
              >
                {ele.strCategory === 'Shake' ? (
                  <img
                    className="Shake"
                    src={ shake }
                    alt=""
                    id={ ele.strCategory }
                  />) : (
                  null)}
                {ele.strCategory === 'Ordinary Drink' ? (
                  <img
                    className="Ordinary"
                    className="Ordinary Drink"
                    src={ shake }
                    alt=""
                    id={ ele.strCategory }
                  />) : (
                  null)}
                {ele.strCategory === 'Cocktail' ? (
                  <img
                    className="Cocktail"
                    src={ cocktail }
                    alt=""
                    id={ ele.strCategory }
                  />) : (
                  null)}
                {ele.strCategory === 'Cocoa' ? (
                  <img className="Cocoa" src={ coc } alt="" id={ ele.strCategory } />) : (
                  null)}
                {ele.strCategory === 'Shot' ? (
                  <img className="Shot" src={ shot } alt="" id={ ele.strCategory } />) : (
                  null)}
                {ele.strCategory === 'Coffee / Tea' ? (
                  <img
                    className="Coffee"
                    className="Coffee / Tea"
                    src={ coffee }
                    alt=""
                    id={ ele.strCategory }
                  />) : (
                  null)}
                {ele.strCategory === 'Homemade Liqueur' ? (
                  <img
                    className="Homemade"
                    className="Homemade Liqueur"
                    src={ liqueur }
                    alt=""
                    id={ ele.strCategory }
                  />) : (
                  null)}
                {ele.strCategory === 'Punch / Party Drink' ? (
                  <img
                    className="Punch"
                    className="Punch / Party Drink"
                    src={ punch }
                    alt=""
                    id={ ele.strCategory }
                  />) : (
                  null)}
                {ele.strCategory === 'Beer' ? (
                  <img className="Beer" src={ beer } alt="" id={ ele.strCategory } />) : (
                  null)}
                {ele.strCategory === 'Soft Drink' ? (
                  <img
                    className="Soft"
                    className="Soft Drink"
                    src={ soft }
                    alt=""
                    id={ ele.strCategory }
                  />) : (
                  null)}
                {ele.strCategory === 'Other / Unknown' ? (
                  <img
                    className="Unknown"
                    className="Other / Unknown"
                    src={ unknown }
                    alt=""
                    id={ ele.strCategory }
                  />) : (
                  null)}
              </button>
              { ele.strCategory.split(' ')[0]}
            </div>
          ))}
        </div>
        <div className="drinks-divPai">
          {drinkState.map((ele, index) => (
            <Link to={ `/drinks/${ele.idDrink}` } key={ index } className="drinks-link">
              <div
                className="drinks-Card"
                key={ index }
                data-testid={ `${index}-recipe-card` }
                aria-hidden="true"
              >
                <img
                  src={ ele.strDrinkThumb }
                  alt={ `${ele.strDrink} imagem` }
                  data-testid={ `${index}-card-img` }
                  className="drinks-img"
                />
                <p
                  data-testid={ `${index}-card-name` }
                  className="drinks-nameRecipe"
                >
                  {ele.strDrink}
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
        {this.drinksRender()}
      </div>
    );
  }
}

Drinks.propTypes = {
  dispatch: PropTypes.func,
}.isRequired;

const mapStateToProps = (state) => ({
  drinkState: state.recipes.drinks,
});

export default connect(mapStateToProps)(Drinks);

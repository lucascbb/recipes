import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import '../styles/Header.css';
import headerIcon from '../styles/icons/iconeRecipesapp.png';
import mealsIcon from '../styles/icons/icone-prato.png';
import doneIcon from '../styles/icons/done.png';
import favoritesIcon from '../styles/icons/favorites.png';
import drinkIcon from '../styles/icons/icone-drink.png';
import perfilIcon from '../styles/icons/Perfil.png';

function Header({ pageName, searchingOFF }) {
  const [searchDisplay, setSearchDisplay] = useState(false);
  const history = useHistory();
  const headerLogo = () => {
    switch (pageName) {
    case 'Drinks': return drinkIcon;
    case 'Meals': return mealsIcon;
    case 'Profile': return perfilIcon;
    case 'Done Recipes': return doneIcon;
    case 'Favorite Recipes': return favoritesIcon;
    default: return mealsIcon;
    }
  };
  return (
    <div className="HeaderPrincipalDiv">

      <div className="HeaderSecondDiv">
        <img src={ headerIcon } alt="ícone bandeja de comida" className="HeaderIcon" />
        <button
          type="button"
          className="HeaderButtonTitle"
          onClick={ () => { history.push('/meals'); } }
        >
          <h1 className="HeaderTitle">Recipes App</h1>
        </button>
        <div className="HeaderButtonsDiv">

          {!searchingOFF && (
            <div>
              <button
                className="HeaderBTNs"
                type="button"
                onClick={ () => {
                  setSearchDisplay(!searchDisplay);
                } }
              >
                <img
                  className="HeaderSearchBTN"
                  src={ searchIcon }
                  data-testid="search-top-btn"
                  alt="Ícone de Perfil de busca"
                />
              </button>

            </div>
          )}
          <button
            type="button"
            className="HeaderBTNs"
            onClick={ () => {
              history.push('/profile');
            } }
          >
            <img
              className="HeaderProfileBTN"
              src={ profileIcon }
              data-testid="profile-top-btn"
              alt="Ícone de Perfil"
            />
          </button>
        </div>
      </div>

      <h1 data-testid="page-title" className="HeaderPageName">
        <img
          src={ headerLogo() }
          alt="ícone de prato"
          className="HeaderIconPage"
          width={ pageName === 'Meals' ? '85px' : '65px' }
        />
        {pageName}
        {' '}
      </h1>
      {searchDisplay && <SearchBar />}
    </div>
  );
}

Header.propTypes = {
  pageName: PropTypes.string.isRequired,
  searchingOFF: PropTypes.bool,
};
Header.defaultProps = {
  searchingOFF: false,
};

export default Header;

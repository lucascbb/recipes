import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/user.png';
import searchIcon from '../images/search.png';
import SearchBar from './SearchBar';
import '../styles/Header.css';
import headerIcon from '../images/logo-Recipes.png';
import xremove from '../images/close.png';

function Header({ pageName }) {
  const [searchDisplay, setSearchDisplay] = useState(false);
  const history = useHistory();

  return (
    <div className="HeaderPrincipalDiv">
      <div 
        className="HeaderSecondDiv" 
        style={history.location.pathname === '/recipes/profile' ? {justifyContent : 'center'} : null}
      >
        <div className="Header-logo" >
          <button
            type="button"
            className="HeaderButtonTitle"
            onClick={ () => { history.push('/recipes/meals'); } }
          >
            <img src={ headerIcon } alt="ícone bandeja de comida" className="HeaderIcon" />
          </button>
        </div>
        {history.location.pathname !== '/recipes/profile' ? 
        <div className="HeaderButtonsDiv">
          <div className="Header-btns">
            {(history.location.pathname !== '/recipes/done-recipes') &&
              (history.location.pathname !== '/recipes/favorite-recipes') ? (
            <button
              className="searchBTNs"
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
            </button>) : (null)}
          </div>

          <div>
            <button
              type="button"
              className="profileBTNs"
              onClick={ () => {
                history.push('/recipes/profile');
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
        </div> : null}
      </div>
      <h1 data-testid="page-title" className="HeaderPageName">
        {pageName}
      </h1>
      {searchDisplay && <SearchBar />}
      {searchDisplay && 
      <button
        type="button"
        className="profile-paix"
        onClick={ () => {
        setSearchDisplay(!searchDisplay);
        } }
      >
        <img
          className="profile-x"
          src={ xremove }
          data-testid="profile-top-btn"
          alt="Ícone de Perfil"
        />
      </button>}
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

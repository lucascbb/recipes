import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/user.png';
import searchIcon from '../images/search.png';
import SearchBar from './SearchBar';
import '../styles/Header.css';
import headerIcon from '../images/roxo-logo-Recipes.png';

function Header({ pageName }) {
  const [searchDisplay, setSearchDisplay] = useState(false);
  const history = useHistory();

  return (
    <div className="HeaderPrincipalDiv">
      <div 
        className="HeaderSecondDiv" 
        style={history.location.pathname === '/profile' ? {justifyContent : 'center'} : null}
      >
        <div className="Header-logo" >
          <button
            type="button"
            className="HeaderButtonTitle"
            onClick={ () => { history.push('/meals'); } }
          >
            <img src={ headerIcon } alt="ícone bandeja de comida" className="HeaderIcon" />
          </button>
        </div>

        <div className="Header-title">
          <button
            type="button"
            className="HeaderButtonTitle"
            onClick={ () => { history.push('/meals'); } }
          >
            <h1 className="HeaderTitle" >Recipes App</h1>
          </button>
        </div>
        {history.location.pathname !== '/profile' ? 
        <div className="HeaderButtonsDiv">
          <div className="Header-btns">
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
            </button>
          </div>

          <div>
            <button
              type="button"
              className="profileBTNs"
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
        </div> : null}
      </div>
      <h1 data-testid="page-title" className="HeaderPageName">
        {pageName}
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

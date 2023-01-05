import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import DoneRecipesIcon from '../styles/icons/done.png';
import favoriteIcon from '../styles/icons/FavoriteIcon.png';
import logoutIcon from '../styles/icons/LogoutIcon.png';
import profileIcon from '../images/user-white.png';
import '../styles/Profile.css';

function Profile({ history }) {
  const [email, setEmail] = useState('teste@teste.com');

  const getLocalStorageEmail = () => {
    const emailLocalStorage = JSON.parse(localStorage.getItem('user'));
    if (!emailLocalStorage) {
      // history.push('/');
    } else {
      setEmail(emailLocalStorage.email);
    }
  };

  const logoutButton = () => {
    localStorage.clear();
    history.push('/recipes');
  };

  useEffect(() => {
    getLocalStorageEmail();
  }, []);

  return (
    <div>
      <Header pageName="Profile" />
      <div className="email-paititle">
        <img
          className="profile-ProfileBTN"
          src={ profileIcon }
          alt="Ícone de Perfil"
        />
        <p data-testid="profile-email" className="email-title">{ email }</p>
      </div>
      <div className="profile-paiBtns">
        <button
          data-testid="profile-done-btn"
          className="button-profile"
          type="button"
          src="aas"
          onClick={ () => history.push('/done-recipes') }
        >
          <img
            src={ DoneRecipesIcon }
            alt="Ícone de receita feita"
            className="icon-profile"
          />
          Done Recipes
        </button>
        <button
          data-testid="profile-favorite-btn"
          className="button-profile"
          type="button"
          onClick={ () => history.push('/favorite-recipes') }
        >
          <img
            src={ favoriteIcon }
            alt="Ícone de receita feita"
            className="icon-profile"
          />
          Favorite Recipes
        </button>
        <button
          data-testid="profile-logout-btn"
          className="button-profile"
          type="button"
          onClick={ logoutButton }
        >
          <img
            src={ logoutIcon }
            alt="Ícone de receita feita"
            className="icon-profile"
          />
          Logout
        </button>
      </div>
      <Footer />
    </div>
  );
}

Profile.propTypes = {
  history: PropTypes.object,
}.isRequired;

export default Profile;

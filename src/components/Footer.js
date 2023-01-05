import React from 'react';
import { useHistory } from 'react-router-dom';
import mealIcon from '../images/mealIcon.svg';
import drinkIcon from '../images/drinkIcon.svg';
import '../styles/Footer.css';

function Footer() {
  const history = useHistory();
  return (
    <footer data-testid="footer" className="footer">
      <div className="footer-pricipalDiv">
        <div className="footer-paibuttons">
          <button
            className="footer-buttons1"
            type="button"
            src={ drinkIcon }
            data-testid="drinks-bottom-btn"
            onClick={ () => { history.push('/drinks'); } }
          >
            <img
              className="footer-img"
              src={ drinkIcon }
              alt="drinkIcon"
            />
          </button>
        </div>
        <div className="footer-paibuttons">
          <button
            type="button"
            className="footer-buttons2"
            src={ mealIcon }
            data-testid="meals-bottom-btn"
            onClick={ () => { history.push('/meals'); } }
          >
            <img
              className="footer-img"
              src={ mealIcon }
              alt="mealIcon"
            />
          </button>
        </div>
      </div>
    </footer>
  );
}

Footer.propTypes = {}.isRequired;
export default Footer;

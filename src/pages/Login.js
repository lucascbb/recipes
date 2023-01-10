import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/Login.css';
import logoLogin from '../images/logo-Recipes-1.png';

function Login({ history }) {
  const [buttonDisable, setButtonDisable] = useState(true);
  const [inputValue, setInputValue] = useState({
    email: '',
    password: '',
  });

  const onInputChange = (event) => {
    setInputValue({
      ...inputValue,
      [event.target.name]: event.target.value,
    });
  };

  const onClickButton = () => {
    localStorage.setItem('user', JSON.stringify({ email: inputValue.email }));
    history.push('/recipes/meals');
  };

  useEffect(() => {
    const buttonDisableControl = () => {
      const emailConditions = /^[a-z0-9.]+@[a-z0-9]+\.[a-z0-9]+?$/i;
      const emailConditions2 = /^[a-z0-9.]+@[a-z0-9]+\.[a-z0-9]+\.[a-z0-9]+?$/i;
      const passwordMinLength = 6;

      if ((emailConditions.test(inputValue.email)
        || emailConditions2.test(inputValue.email))
        && inputValue.password.length > passwordMinLength) {
        setButtonDisable(false);
      } else { setButtonDisable(true); }
    };

    buttonDisableControl();
  }, [inputValue]);

  return (
    <div className="login-divPai">
      <form className="login-form">
        <img src={ logoLogin } alt="" className="login-logo" />
        <p className="login-login">Login</p>
        <label htmlFor="email" className="login-labelEmail">
          <input
            type="text"
            data-testid="email-input"
            className="login-inputSenha"
            placeholder="Email"
            id="email"
            name="email"
            value={ inputValue.email }
            onChange={ onInputChange }
          />
        </label>
        <label htmlFor="password" className="login-labelSenha">
          <input
            type="password"
            data-testid="password-input"
            className="login-inputEmail"
            placeholder="Senha"
            id="password"
            name="password"
            value={ inputValue.password }
            onChange={ onInputChange }
          />
        </label>
        <button
          type="button"
          data-testid="login-submit-btn"
          className="login-btn"
          disabled={ buttonDisable }
          onClick={ onClickButton }
        >
          Enter
        </button>
      </form>
    </div>
  );
}

Login.propTypes = {
  history: PropTypes.object,
}.isRequired;

export default Login;

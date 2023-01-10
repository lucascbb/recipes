import React, { useState } from 'react';
import Copy from 'clipboard-copy';
import { useLocation } from 'react-router-dom';
import shareIcon from '../styles/icons/share.png';

function ShareButton() {
  const location = useLocation();

  let url = `http://localhost:3000${location.pathname}`;

  if (url.includes('in-progress')) {
    const newUrl = url.split('/in-progress')[0];
    url = newUrl;
  }
  const [isCopied, setIsCopied] = useState(false);
  const quatroMil = 4000;

  const onCopyButtonClick = () => {
    Copy(url);
    setIsCopied(true);
    const textCopied = document.getElementsByClassName('linkCopied')[0];
    if (textCopied) {
      textCopied.innerHTML = 'Link copied!';
      textCopied.style.backgroundColor = 'white';
    }
  };

  const removeCopied = () => {
    const textCopied = document.getElementsByClassName('linkCopied')[0];
    if (textCopied) {
      textCopied.innerHTML = '';
      textCopied.style.backgroundColor = 'transparent';
      textCopied.style.boxShadow = 'none';
    }
  };

  setTimeout(removeCopied, quatroMil);

  return (
    <div>
      <button
        type="button"
        data-testid="share-btn"
        onClick={ onCopyButtonClick }
        className="buttons"
      >
        <img
          alt="favorite-icon"
          src={ shareIcon }
          width="25px"
        />
      </button>
      {
        (isCopied)
          ? <p className={ isCopied ? 'linkCopied' : 'outro' }>Link copied!</p>
          : (null)
      }
    </div>
  );
}

export default ShareButton;

import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Copy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';

function ShareButtonFavorites({ index, id, type, name }) {
  const [isCopied, setIsCopied] = useState(false);
  const onCopyButtonClick = () => {
    const hostUrl = window.location.origin.toString();
    const url = `${hostUrl}/${type}/${id}`;
    Copy(url);
    setIsCopied(true);
  };

  return (
    <div>
      <button
        className={ name }
        type="button"
        data-testid={ `${index}-horizontal-share-btn` }
        onClick={ onCopyButtonClick }
        src={ shareIcon }
      >
        <img src={ shareIcon } alt="Share button" />
      </button>
      {
        (isCopied)
          ? <p>Link copied!</p>
          : (null)
      }
    </div>
  );
}

ShareButtonFavorites.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
};

export default ShareButtonFavorites;

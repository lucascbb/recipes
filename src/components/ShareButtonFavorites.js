import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Copy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';

function ShareButtonFavorites({ index, id, type, name }) {
  const [isCopied, setIsCopied] = useState(false);
  const [copy, setCopy] = useState(<p className={`favorite-copy`}>Link copied!</p>);
  const onCopyButtonClick = () => {
    setCopy(<p className={`favorite-copy`}>Link copied!</p>)
    const hostUrl = window.location.origin.toString();
    const url = `${hostUrl}/${type}/${id}`;
    Copy(url);
    setIsCopied(true);
  };

  setTimeout(() => {
    setCopy('')
  }, 4000)


  return (
    <div>
      <button
        className={ name }
        id='btn-favorite'
        type="button"
        data-testid={ `${index}-horizontal-share-btn` }
        onClick={ onCopyButtonClick }
        src={ shareIcon }
      >
        <img src={ shareIcon } alt="Share button" className='favorite-sharebtn' />
      </button>
      {
        (isCopied)
          ? <div className='favorite-paicopy'>{copy}</div>
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

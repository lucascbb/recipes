import React from 'react';

function CheckBox({ ingredient, index,
  handleCheckedMain, check }) {
  return (
    <div>
      <label
        htmlFor={ ingredient }
        data-testid={ `${index}-ingredient-step` }
        className={ check ? 'addedIngredient' : 'NotaddedIngredient' }
      >
        <input
          className="inprogress-input"
          type="checkbox"
          id={ ingredient }
          name={ ingredient }
          onClick={ handleCheckedMain }
          checked={ check }
        />
        {ingredient}
      </label>
    </div>
  );
}
CheckBox.propTypes = {
}.isRequired;

export default CheckBox;

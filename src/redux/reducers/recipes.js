import { RECEIVE_RECIPES,
  RECEIVE_RECIPE_FOR_ID,
  REQUEST_RECIPES,
  DRINKS,
  MEALS,
} from '../actions';

const INITIAL_STATE = {
  IsLoading: true,
  recipesForId: {},
  allRecipes: [],
  drinks: [],
  meals: [],
};

const recipes = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_RECIPES: {
    return {
      ...state,
      IsLoading: true,
    };
  }
  case RECEIVE_RECIPE_FOR_ID: {
    return {
      ...state,
      IsLoading: false,
      recipesForId: action.payload,
    };
  }
  case RECEIVE_RECIPES: {
    return {
      ...state,
      IsLoading: false,
      allRecipes: action.payload,
    };
  }
  case MEALS:
    return ({
      ...state,
      IsLoading: true,
      meals: action.meals,
    });
  case DRINKS:
    return ({
      ...state,
      IsLoading: true,
      drinks: action.drinks,
    });
  default:
    return state;
  }
};

export default recipes;

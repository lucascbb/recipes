import { combineReducers } from 'redux';
import recipes from './recipes';
import user from './user';

const rootReducer = combineReducers({ user, recipes });

export default rootReducer;

import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Recipes from './components/Recipes';
import RecipeDetails from './components/RecipeDetails';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import RecipeInProgress from './components/RecipeInProgress';

function App() {
  return (
    <Switch>
      <Route exact path="/recipes" component={ Login } />
      <Route exact path="/recipes/meals" component={ Recipes } />
      <Route exact path="/recipes/drinks" component={ Recipes } />
      <Route exact path="/recipes/meals/:id" component={ RecipeDetails } />
      <Route exact path="/recipes/drinks/:id" component={ RecipeDetails } />
      <Route exact path="/recipes/meals/:id/in-progress" component={ RecipeInProgress } />
      <Route exact path="/recipes/drinks/:id/in-progress" component={ RecipeInProgress } />
      <Route path="/recipes/profile" component={ Profile } />
      <Route path="/recipes/done-recipes" component={ DoneRecipes } />
      <Route path="/recipes/favorite-recipes" component={ FavoriteRecipes } />
    </Switch>
  );
}

export default App;

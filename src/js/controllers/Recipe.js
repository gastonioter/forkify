import RecipeModel from '../models/Recipe';
import RecipeView from '../views/RecipeView';
import SearchBarView from '../views/searchBarView';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

init();

async function showRecipe(e) {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    RecipeView.renderSpinner();

    await RecipeModel.fetchRecipe(id);

    const recipe = RecipeModel.getRecipe();

    RecipeView.render(recipe);
  } catch (e) {
    console.error(e.message);
    RecipeView.renderError();
  }
}

async function controlSearchResults() {
  try {
    const query = SearchBarView.getQuery();
    if (!query) return;
    await RecipeModel.loadSearchResults(query);
  } catch (err) {
    console.log(err);
    RecipeView.renderError();
  }
}

function init() {
  RecipeView.addHandlerRender(showRecipe);
  SearchBarView.addHandlerSearch(controlSearchResults);
}

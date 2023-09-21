import { RecipeModel } from '../models/Recipe';
import RecipeView from '../views/RecipeView';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

async function showRecipe(e) {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    RecipeView.renderSpinner();

    await RecipeModel.fetchRecipe(id);

    const recipe = RecipeModel.getReipe;

    RecipeView.render(recipe);
  } catch (e) {
    console.error(e.message);
  }
}

['hashchange', 'load'].forEach(ev => window.addEventListener(ev, showRecipe));

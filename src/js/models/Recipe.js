import { getJSON } from '../helpers/getJSON';
import { baseURL } from '../config';

const state = {
  recipe: {},
};

const setRecipe = function (recipe) {
  state.recipe = recipe;
};

const getRecipe = function () {
  return state.recipe;
};

const fetchRecipe = async function (id) {
  try {
    const data = await getJSON(`${baseURL}/${id}`);
    let { recipe } = data.data;

    recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };

    setRecipe(recipe);
  } catch (err) {
    throw err;
  }
};

export default { getRecipe, fetchRecipe };

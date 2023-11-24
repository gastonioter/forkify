import { getJSON } from '../helpers/getJSON';
import { baseURL, API_KEY } from '../config';

const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
  },
};

const setRecipe = function (recipe) {
  state.recipe = recipe;
};

const setResults = function (results) {
  state.search.results = results;
};

const getRecipe = function () {
  return state.recipe;
};

const getResults = function () {
  return state.search.results;
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

const loadSearchResults = async function (search) {
  try {
    const data = await getJSON(`${baseURL}?search=${search}&key=${API_KEY}`);
    const results = data.data.recipes.map(function (recipe) {
      return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        image: recipe.image_url,
      };
    });
    setResults(results);
    state.search.query = search;
    console.log(state.search);
  } catch (err) {
    throw err;
  }
};

export default { getRecipe, fetchRecipe, loadSearchResults };

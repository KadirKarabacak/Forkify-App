//* Model klasörü, uygulamanızın verileri ilgilidir.
//* Veritabanı işlemleri, veri çekme ve depolama ve işleme işlevlerini içerir.
//* Veritabanıyla iletişim kurmak için kullanılan kodlar bu klasöre aittir.
//* Uygulamanızın veri tabanındaki tabloları veya dokümanları temsil eden veri modelleri burada tanımlanır.

import { API_URL, RES_PER_PAGE, START_PAGE } from './config.js';
import { getJSON } from './helpers.js';

// State includes all the data about application [ Export for controller ]
export const state = {
  // For each recipe includes ingredients vs
  recipe: {},
  // For all recipes from search feature
  search: {
    query: '',
    results: [],
    page: START_PAGE,
    resultsPerPage: RES_PER_PAGE,
  },
  bookmarks: [],
};

// Load recipe [ Right sidebar feature ]
export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}${id}`);
    const { recipe } = data.data;
    // Fast and dirty way
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };

    // Checks bookmarks for any id === eachbookmark.id and set true or false
    if (state.bookmarks.some(bookmark => bookmark.id === id))
      state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;
    console.log(state.recipe);
  } catch (err) {
    // To render error into view, we have to throw it
    throw err;
  }
};

// Load search results at the left
export const loadSearchResults = async function (query) {
  try {
    // Save queries into state for analyze later
    state.search.query = query;

    const data = await getJSON(`${API_URL}?search=${query}`);

    // Change state.search and properties which comes all recipes
    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
      };
    });
    // Search something and move another page and search again so reset page
    state.search.page = 1;
  } catch (err) {
    throw err; // Throw to controller
  }
};

// Pagination, not async func, already loaded all recipes
export const getSearchResultsPage = function (page = state.search.page) {
  // To know which page we are in.
  state.search.page = page;

  const start = (page - 1) * state.search.resultsPerPage; // 0
  const end = page * state.search.resultsPerPage; // 9
  return state.search.results.slice(start, end);
};

// Update servings
export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
    // newQt = oldQt * newServings / oldServings
  });

  state.recipe.servings = newServings;
};

// Add Bookmark
export const addBookmark = function (recipe) {
  // Add bookmark
  state.bookmarks.push(recipe);

  // Mark current recipe as bookmarked
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
  // Add new property
};

export const deleteBookmark = function (id) {
  // Find index
  const index = state.bookmarks.findIndex(el => el.id === id);
  state.bookmarks.splice(index, 1);

  // Mark current recipe as NOT bookmarked
  if (id === state.recipe.id) state.recipe.bookmarked = false;
};

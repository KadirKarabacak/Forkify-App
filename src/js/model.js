//* Model klasörü, uygulamanızın verileri ilgilidir.
//* Veritabanı işlemleri, veri çekme ve depolama ve işleme işlevlerini içerir.
//* Veritabanıyla iletişim kurmak için kullanılan kodlar bu klasöre aittir.
//* Uygulamanızın veri tabanındaki tabloları veya dokümanları temsil eden veri modelleri burada tanımlanır.

import { API_URL, RES_PER_PAGE } from './config.js';
import { getJSON } from './helpers.js';

// State includes all the data about application [ Export for controller ]
export const state = {
  // For each recipe includes ingredients vs
  recipe: {},
  // For all recipes from search feature
  search: {
    query: '',
    results: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE,
  },
};

// Load recipe [ Right sidebar feature ]
export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}${id}`);

    //! To better format our recipe data (remove underscores)
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
    console.log(state.recipe);
  } catch (err) {
    // To render error into view, we have to throw it
    throw err;
  }
};

//! Search feature, pass query for controller [ All Recipes ] Left sidebar
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

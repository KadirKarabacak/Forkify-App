import { KEY, API_URL, RES_PER_PAGE, START_PAGE } from './config.js';
import { AJAX } from './helpers.js';

// State includes all the data about application [ Export for controller ]
export const state = {
  // For each recipe includes ingredients e.c
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

const createRecipeObject = function (data) {
  const { recipe } = data.data;
  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    ...(recipe.key && { key: recipe.key }),
    // if there is key, it returns {key: recipe.key} and ... _> key: recipe.key
    // if there is no key, simply nothing
  };
};

// Load recipe 
export const loadRecipe = async function (id) {
  try {
    const data = await AJAX(`${API_URL}${id}?key=${KEY}`);

    state.recipe = createRecipeObject(data);

    // Checks bookmarks for any id === eachbookmark.id and set true or false
    if (state.bookmarks.some(bookmark => bookmark.id === id))
      state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;
  } catch (err) {
    // To render error into view, we have to throw it
    throw err;
  }
};

// Load search results
export const loadSearchResults = async function (query) {
  try {
    // Save queries into state for analyze later
    state.search.query = query;

    const data = await AJAX(`${API_URL}?search=${query}&key=${KEY}`);

    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
        ...(rec.key && { key: rec.key }),
      };
    });
    // To reset page after any search
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

// Add localStorage
const persistBookmarks = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

// Add Bookmark
export const addBookmark = function (recipe) {
  state.bookmarks.push(recipe);

  // Mark current recipe as bookmarked, Add new property
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;

  // Set local storage
  persistBookmarks();
};

// Delete Bookmark
export const deleteBookmark = function (id) {
  // Find index
  const index = state.bookmarks.findIndex(el => el.id === id);
  state.bookmarks.splice(index, 1);

  // Mark current recipe as NOT bookmarked
  if (id === state.recipe.id) state.recipe.bookmarked = false;

  // Set local storage
  persistBookmarks();
};

// Get stored items
const init = function () {
  const storage = localStorage.getItem('bookmarks');
  if (storage) state.bookmarks = JSON.parse(storage);
};
// Its an error, we need to render bookmarks at the beginning
// The update method we made simply switching changed elements, not adds new elements
// And here we trying to add new bookmarks [<li> elements], the solve is rendering bookmarks at the beginning.
init();

// -- Clear localstorage
// const clearBookmarks = function () {
//   localStorage.clear('bookmarks');
// };
//  clearBookmarks()

// Upload own recipe
export const uploadRecipe = async function (newRecipe) {
  try {
    const ingredients = Object.entries(newRecipe)
      .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
      .map(ing => {
        const ingArr = ing[1].split(',').map(el => el.trim());
        if (ingArr.length !== 3)
          throw new Error(
            'Wrong ingredient format! Please use the correct format'
          );
          // Immediately destructure 
        const [quantity, unit, description] = ingArr;
        // Return as an object
        return { quantity: quantity ? +quantity : null, unit, description };
      });

    // Change datas to original one
    const recipe = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      cooking_time: +newRecipe.cookingTime,
      servings: +newRecipe.servings,
      ingredients,
    };

    // POST our recipe into API
    const data = await AJAX(`${API_URL}?key=${KEY}`, recipe);
    
    // Update our state exactly the same as we do before
    state.recipe = createRecipeObject(data);

    // Add bookmarks
    addBookmark(state.recipe);
  } catch (err) {
    throw err;
  }
};

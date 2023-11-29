// Both import Model and Views for MVC
import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';
import { MODAL_TIMEOUT } from './config.js';

// Control Recipes
const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1); // #56544eedads561c456e4as start from 1
    // But not works on page load

    if (!id) return; // To don't get alert before search for recipe

    // Render Spinner
    recipeView.renderSpinner();

    // Update resultsView to mark selected search result
    resultsView.update(model.getSearchResultsPage()); // And pass current page

    // Update bookmarks also
    bookmarksView.update(model.state.bookmarks);

    // Loading recipe from API
    await model.loadRecipe(id); // No need to store, returns nothing.

    // 2) Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    // Render error on recipe
    recipeView.renderError();
  }
};

// Left sidebar for all recipes
const controlSearchResults = async function () {
  try {
    // Render spinner before load
    resultsView.renderSpinner();

    // 1) Get search query [ return input value ]
    const query = searchView.getQuery();
    if (!query) return;

    // 2) Load search results by query
    await model.loadSearchResults(query);

    // 3) Render results
    resultsView.render(model.getSearchResultsPage());

    // 4) Render paginition buttons
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

// Control pagination for more results
const controlPagination = function (goToPage) {
  //! Render method overwrite the new results, cuz we have clear method, emptying parentEl

  // 1) Render NEW results
  resultsView.render(model.getSearchResultsPage(goToPage));

  // 2) Render NEW paginition buttons
  paginationView.render(model.state.search);
};

// Control and update servings
const controlServings = function (newServings) {
  // Update the recipe servings [in state]
  model.updateServings(newServings);

  //! Update the recipe view, Right here we updating whole recipe container,
  //! its bad for performance we need to fix only for ingredients
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};
const controlAddBookmark = function () {

// Control bookmark
  // Add/Remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  // Update recipe
  recipeView.update(model.state.recipe);

  // Render bookmarks
  bookmarksView.render(model.state.bookmarks);

};

// Render bookmarks
const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

// To render error into modal, we need an async func and wait for uploadRecipe
const controlAddRecipe = async function (newRecipe) {
  try {
    // Render spinner
    addRecipeView.renderSpinner();

    // Upload the new recipe to API
    await model.uploadRecipe(newRecipe);

    // Render recipe
    recipeView.render(model.state.recipe);

    // Success message
    addRecipeView.renderMessage();

    // Render bookmarks
    bookmarksView.render(model.state.bookmarks);

    // Change id in url as our own added recipe id
    window.history.pushState(null, '', `#${model.state.recipe.id}`); // Allow us to change url without reload page. Take 3 args

    // Close form window
    setTimeout(() => {
      addRecipeView._toggleWindow();
    }, MODAL_TIMEOUT * 1000);
  } catch (err) {
    // Render error
    addRecipeView.renderError(err.message);
  }
};

// Publisher - Subscriber Pattern
const init = function () {
  recipeView.addHandlerAddBookmark(controlAddBookmark); // Add Bookmark
  bookmarksView.addHandlerRender(controlBookmarks); // Render bookmarks at the beginning
  recipeView.addHandlerRender(controlRecipes); // Control Hashchange
  recipeView.addHandlerUpdateServings(controlServings); // Change Servings
  searchView.addHandlerSearch(controlSearchResults); // Search Results
  paginationView.addHandlerClick(controlPagination); // Pagination buttons
  addRecipeView.addHandlerUpload(controlAddRecipe); // Add new Recipe
};
init();

//* The addEventListener about view, so we need to put it into view
//* But, we don't want to put our controlRecipes function into view
//* Then, what we need to do ? [ PUBLISHER - SUBSCRIBER PATTERN ]

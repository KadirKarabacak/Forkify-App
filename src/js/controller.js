//: --- CONTROLLER ---
//* Model ve view arasındaki iletişimi sağlar.
//* Kullanıcının taleplerini işler. Uygulamanın iş mantığını içerir.
//* Kullanıcı talebiyle hangi sayfaların görüntüleneceğini belirlemek için yönlendirme kodlarını içerir.
//* Kullanıcı taleplerini işleyen kodlar, veritabanı sorgularını yürüten işlevler -
//* ve sayfaların görüntülenmesini sağlayan işlevler bu klasörde bulunur.

// Both import Model and View
import * as model from './model.js'; // Model
import paginationView from './views/paginationView.js';
import recipeView from './views/recipeView.js'; // recipeView
import resultsView from './views/resultsView.js';
import searchView from './views/searchView.js'; // searchView

import 'core-js/stable'; // Others
import 'regenerator-runtime/runtime'; // Async - await

// Parcel hot module
// if (module.hot) {
//   module.hot.accept();
// }

///////////////////////////////////////////////////////////////////////////////
//* LECTURES :
// Parcel changes SASS to CSS and rename all imgs and icons.

// Take all data from Model and View
const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1); // #56544eedads561c456e4as start from 1
    // But this not works on copy and paste that link

    if (!id) return; // To don't get alert before search for recipe

    // Render Spinner
    recipeView.renderSpinner();

    // Loading recipe from API
    await model.loadRecipe(id); // No need to store, returns nothing.

    // 2) Rendering recipe like ReactJS
    recipeView.render(model.state.recipe); // Render method allow us pass data
  } catch (err) {
    recipeView.renderError();
  }
};

// Left sidebar for all recipes
const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    // 1) Get search query
    const query = searchView.getQuery();
    if (!query) return;

    // 2) Load search results
    await model.loadSearchResults(query);

    // 3) Render results
    resultsView.render(model.getSearchResultsPage(4));

    // 4) Render paginition buttons
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (goToPage) {
  // 1) Render NEW results
  resultsView.render(model.getSearchResultsPage(goToPage));
  //! Render method overwrite the new results, cuz we have clear method, emptying parentEl
  // 2) Render NEW paginition buttons
  paginationView.render(model.state.search);
};

// Publisher - Subscriber Pattern
const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
};
init();

//* The addEventListener about view, so we need to put it into view
//* But, we don't want to put our controlRecipes function into view
//* Then, what we need to do ? [ PUBLISHER - SUBSCRIBER PATTERN ]

import View from './View.js';
import previewView from './previewView.js';

// We use mostly same code like recipeView, so we create a parent class for reusable.
class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _error = 'No bookmarks yet! Find a nice recipe and bookmark it.';
  _message = '';

  // To fix error at the beginning load bookmarks
  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  //! Can't call simply previewView.generateMarkup(), we have to change _data
  _generateMarkup() {
    //! We need to return a string right here to able to use insertAdjacentHTML, otherwise doensn't work
    //! So add a second parameter to render method
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }
}

export default new BookmarksView();

import View from './View';
import previewView from './previewView.js'; // Child class for bookmarks and results

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _error = 'No recipes found for your query! Please try again.';
  _message = '';

  //! We can't call simply previewView.generateMarkup(), we have to change _data
  _generateMarkup() {
    //! We need to return a string right here to able to use insertAdjacentHTML, otherwise doensn't work
    //! So add a second parameter to render method
    return this._data
      .map(result => previewView.render(result, false))
      .join('');
  }
}

export default new ResultsView();

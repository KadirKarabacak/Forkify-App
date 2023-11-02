import View from './View';
import previewView from './previewView.js'; // Child class for bookmarks and results

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _error = 'No recipes found for your query! Please try again.';
  _message = '';

  _generateMarkup() {
    return this._data
      .map(result => previewView.render(result, false))
      .join('');
  }
}

export default new ResultsView();

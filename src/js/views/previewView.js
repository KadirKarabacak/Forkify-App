import View from './View'; // Child class for bookmarks and results

class PreviewView extends View {
  _parentElement = '';

  // We create markup for both bookmarksView and resultsView
  _generateMarkup() {
    // Creating id for dynamicly add active class, and update into controller
    const id = window.location.hash.slice(1);
    return `
        <li class="preview">
            <a class="preview__link ${
              this._data.id === id ? 'preview__link--active ' : ''
            }"  href="#${this._data.id}">
              <figure class="preview__fig">
                <img src="${this._data.image}" alt="${this._data.title}" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${this._data.title}</h4>
                <p class="preview__publisher">${this._data.publisher}</p>
              </div>
            </a>
        </li>
        `;
  }
}

export default new PreviewView();
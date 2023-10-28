import View from './View';
// import icons from 'url:../../img/icons.svg'; // Icons [ Parcel 2 ]

// We use mostly same code like recipeView, so we create a parent class for reusable.
class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _error = 'No recipes found for your query! Please try again.';
  _message = '';

  _generateMarkup() {
    return this._data.map(prev => this._generateMarkupPreview(prev)).join('');
  }

  _generateMarkupPreview(prev) {
    // Creating id for dynamicly add active class, and update into controller
    const id = window.location.hash.slice(1);
    return `
        <li class="preview">
            <a class="preview__link ${
              prev.id === id ? 'preview__link--active ' : ''
            }"  href="#${prev.id}">
              <figure class="preview__fig">
                <img src="${prev.image}" alt="${prev.title}" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${prev.title}</h4>
                <p class="preview__publisher">${prev.publisher}</p>
              </div>
            </a>
        </li>
        `;
  }
}

export default new ResultsView();

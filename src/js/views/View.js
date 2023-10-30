//: --- VIEW ---
import icons from 'url:../../img/icons.svg'; // Icons [ Parcel 2 ]

// We simply export whole class, there is no instances.
export default class View {
  _data;

  // Render func to use into controller for render recipes
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const markup = this._generateMarkup();

    // For bookmarksView and resultsView use this guard claus and return string markup.
    if(!render) return markup;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  // Only for update ingredients instead of whole recipe container
  update(data) {
    this._data = data;
    
    // At here, we have a string and we need some dom to manipulate
    const newMarkup = this._generateMarkup();
    // To convert string to dom nodes [a virtual (sanal) DOM]
    const newDOM = document.createRange().createContextualFragment(newMarkup); // Makes virtual dom from newMarkup
    const newElements = Array.from(newDOM.querySelectorAll('*')); // Returns nodelist, so use Array.from to convert a real array
    const curElements = Array.from(this._parentElement.querySelectorAll('*')); // Returns nodelist, so use Array.from to convert a real array

    // We need to compare them to only update necessery places so looping both array at the same time
    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      // Update changed TEXTS
      if (
        !newEl.isEqualNode(curEl) && // Not works, it changes container, we only need to change texts
        newEl.firstChild?.nodeValue.trim() !== '' // need to select first child to reach text
      ) {
        curEl.textContent = newEl.textContent;
      }

      // Update DATASET attributes
      if (!newEl.isEqualNode(curEl)) {
        // Attributes return all changed attributes
        Array.from(newEl.attributes).forEach(
          (
            attr // Create new arr from nodelist and foreach
          ) => curEl.setAttribute(attr.name, attr.value) // set new Attributes with name and value
        );
      }
    });
  }

  // Common parent element cleaner for views
  _clear() {
    this._parentElement.innerHTML = '';
  }

  // Create and Show Spinner
  renderSpinner() {
    const markup = `
    <div class="spinner">
      <svg>
        <use href="${icons}#icon-loader"></use>
      </svg>
    </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  // Render error [wrong recipe id]
  renderError(message = this._error) {
    const markup = `
    <div class="error">
      <div>
        <svg>
          <use href="${icons}#icon-alert-triangle"></use>
        </svg>
      </div>
      <p>${message}</p>
    </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  // Success Message for future
  renderMessage(message = this._message) {
    const markup = `
    <div class="error">
      <div>
        <svg>
          <use href="${icons}#icon-smile"></use>
        </svg>
      </div>
      <p>${message}</p>
    </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}

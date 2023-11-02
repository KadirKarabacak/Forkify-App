import icons from 'url:../../img/icons.svg'; // Icons [ Parcel 2 ]

// We simply export whole class, there is no instances.
export default class View {
  _data;

  /**
   * Render the recieved object to the DOM
   * @param {Object | Object[]} data The data to be rendered (e.g. recipe)
   * @param {boolean} [render=true] If false, create markup string instead of rendering the DOM
   * @returns {undefined | string} A markup string is returned if render=false
   * @this {Object} View Instance
   * @author Kadir Karabacak
   */ // JSDocs Comments
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

      // Each time called render, set data to state.recipe
    this._data = data;
    const markup = this._generateMarkup();

    // For bookmarksView and resultsView use this guard claus and return string markup.
    if(!render) return markup;

    // Clear parent el then insert New DOM
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  // Only update part of changes instead of whole section
  update(data) {
    this._data = data;
    
    // At here, we have a string and we need some dom to manipulate
    const newMarkup = this._generateMarkup();
    // To convert string to dom nodes [a virtual (sanal) DOM]
    const newDOM = document.createRange().createContextualFragment(newMarkup); // Makes virtual dom from newMarkup
    const newElements = Array.from(newDOM.querySelectorAll('*')); // Returns nodelist, so use Array.from to convert a real array
    const curElements = Array.from(this._parentElement.querySelectorAll('*')); // Returns nodelist, so use Array.from to convert a real array

    // Compare them to only update changed places. Looping both array at the same time
    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      // Update changed TEXTS
      if (
        !newEl.isEqualNode(curEl) && // Not works, it changes container, we need to change texts
        newEl.firstChild?.nodeValue.trim() !== '' // need to select first child to reach text prop
      ) {
        // Change cur elements with changed elements
        curEl.textContent = newEl.textContent;
      }

      // Update DATASET attributes
      if (!newEl.isEqualNode(curEl)) {
        // Attributes return all changed attributes
        Array.from(newEl.attributes).forEach(
          (
            attr
          ) => curEl.setAttribute(attr.name, attr.value) // set new Attributes with name and value
        );
      }
    });
  }

  // Clear parent element
  _clear() {
    this._parentElement.innerHTML = '';
  }

  // Create and insert Spinner
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

  // Render and insert error [wrong recipe id]
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

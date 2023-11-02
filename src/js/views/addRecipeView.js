import View from './View';

class AddRecipeView extends View {
  // Selections
  _parentElement = document.querySelector('.upload');
  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');
  _message = 'Recipe was successfully uploaded ✔';

  // Call methods at the beginning
  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
  }

  // Remove hidden classes from both overlay and window
  _toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }

  // Show create recipe form
  _addHandlerShowWindow() {
    this._btnOpen.addEventListener('click', this._toggleWindow.bind(this));
  }

  // Hide create recipe form
  _addHandlerHideWindow() {
    this._btnClose.addEventListener('click', this._toggleWindow.bind(this));
    this._overlay.addEventListener('click', this._toggleWindow.bind(this));
  }

  // Submit created recipe form
  addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      // Take all inputs at once, but it returns something weird.
      const dataArr = [...new FormData(this)]; // This refers _parentElement
      const data = Object.fromEntries(dataArr); // Arr to Object
      
      handler(data); // We need to pass this data into model to fetch another API
    });
  }


}

export default new AddRecipeView();

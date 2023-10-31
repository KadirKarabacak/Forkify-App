class SearchView {
  _parentEl = document.querySelector('.search'); // Form el

  // Gets input value
  getQuery() {
    const query = this._parentEl.querySelector('.search__field').value;
    this._clearInput();
    return query;
  }

  // Clear input after submit
  _clearInput() {
    this._parentEl.querySelector('.search__field').value = '';
  }

  // Event Handler [ Subscriber - Publisher Pattern ]
  addHandlerSearch(handler) {
    this._parentEl.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }
}

// Always export instance, not whole Class for performance
export default new SearchView();

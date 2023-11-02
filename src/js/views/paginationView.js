import View from './View';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');
  buttons = document.querySelectorAll('.btn--inline');

  // Pagination buttons
  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = +btn.dataset.goto; // Takes buttons's page num from dataset
      handler(goToPage);
    });
  }

  // Generate HTML
  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      // Calculate how many pages we have [Resulst arr / 10]
      this._data.results.length / this._data.resultsPerPage
    );

    // We are in page 1, and there are other pages
    if (curPage === 1 && numPages > 1) {
      return `
          <button data-goto="${
            curPage + 1
          }" class="btn--inline pagination__btn--next">
              <span>Page ${curPage + 1}</span>
              <svg class="search__icon">
                  <use href="${icons}#icon-arrow-right"></use>
              </svg>
          </button>
        `;
    }

    // We are in last page
    if (curPage === numPages && numPages > 1) {
        return `
            <button data-goto="${
              curPage - 1
            }" class="btn--inline pagination__btn--prev">
                <svg class="search__icon">
                    <use href="${icons}#icon-arrow-left"></use>
                </svg>
                <span>Page ${curPage - 1}</span>
            </button>
          `;
    }

    // We are in between first and last pages
    if (curPage < numPages) {
      return `
          <button data-goto="${
            curPage - 1
          }" class="btn--inline pagination__btn--prev">
              <svg class="search__icon">
                  <use href="${icons}#icon-arrow-left"></use>
              </svg>
              <span>Page ${curPage - 1}</span>
          </button>
          <button data-goto="${
            curPage + 1
          }" class="btn--inline pagination__btn--next">
              <span>Page ${curPage + 1}</span>
              <svg class="search__icon">
                  <use href="${icons}#icon-arrow-right"></use>
              </svg>
          </button>
        `;
    }

    // We are in Page 1, and there are no other pages
    return ``;
  }
}

export default new PaginationView();

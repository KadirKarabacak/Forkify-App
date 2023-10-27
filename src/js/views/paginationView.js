import View from './View';
import icons from 'url:../../img/icons.svg'; // Icons [ Parcel 2 ]

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');
  buttons = document.querySelectorAll('.btn--inline');

  //   _generateMarkupButtons(direction) {
  //     if (direction === 'prev') {
  //       return `
  //         <button class="btn--inline pagination__btn--prev">
  //               <svg class="search__icon">
  //                   <use href="${icons}#icon-arrow-left"></use>
  //               </svg>
  //               <span>Page ${curPage - 1}</span>
  //         </button>
  //         `;
  //     }
  //     if (direction === 'next') {
  //       return `
  //         <button class="btn--inline pagination__btn--next">
  //               <svg class="search__icon">
  //                   <use href="${icons}#icon-arrow-right"></use>
  //               </svg>
  //               <span>Page ${curPage + 1}</span>
  //         </button>
  //         `;
  //     }
  //     if (direction === 'both') {
  //       return `
  //         <button class="btn--inline pagination__btn--prev">
  //               <svg class="search__icon">
  //                   <use href="${icons}#icon-arrow-left"></use>
  //               </svg>
  //               <span>Page ${curPage - 1}</span>
  //         </button>
  //         <button class="btn--inline pagination__btn--next">
  //               <svg class="search__icon">
  //                   <use href="${icons}#icon-arrow-right"></use>
  //               </svg>
  //               <span>Page ${curPage + 1}</span>
  //         </button>
  //         `;
  //     }
  //   }

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      console.log(btn);
      handler(goToPage);

      if (btn.classList.contains('pagination__btn--prev')) {
      }
      if (btn.classList.contains('pagination__btn--next')) {
      }
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    // Calculate how many pages we have [Resulst arr / 10]
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    console.log(`There is ${numPages} pages`);

    // Page 1, and there are other pages
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

    // Last page
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

    // Other page
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

    // Page 1, and there are no other pages
    return ``;
  }
}

export default new PaginationView();

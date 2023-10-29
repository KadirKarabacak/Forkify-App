import View from './View';
import icons from 'url:../../img/icons.svg'; // Icons [ Parcel 2 ]

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');
  buttons = document.querySelectorAll('.btn--inline');

  // Pagination buttons feature
  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = +btn.dataset.goto; // Takes buttons's page num from dataset
      handler(goToPage);
    });
  }

  // _generateMarkupBtns(direction) {
  //   const curPage = this._data.page;
  //   const numPages = Math.ceil(
  //     this._data.results.length / this._data.resultsPerPage
  //   );
  //   console.log(`There is ${numPages} pages`);
  //   if (direction === 'next') {
  //     return `
  //     <button data-goto="${
  //       curPage + 1
  //     }" class="btn--inline pagination__btn--next">
  //         <span>Page ${curPage + 1}</span>
  //         <svg class="search__icon">
  //             <use href="${icons}#icon-arrow-right"></use>
  //         </svg>
  //     </button>
  //   `;
  //   }

  //   if (direction === 'prev') {
  //     return `
  //     <button data-goto="${
  //       curPage - 1
  //     }" class="btn--inline pagination__btn--prev">
  //         <svg class="search__icon">
  //             <use href="${icons}#icon-arrow-left"></use>
  //         </svg>
  //         <span>Page ${curPage - 1}</span>
  //     </button>
  //   `;
  //   }
  // }

  // Generate HTML
  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      // Calculate how many pages we have [Resulst arr / 10]
      this._data.results.length / this._data.resultsPerPage
    );

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
      // this._generateMarkupBtns('next');
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
      
      // this._generateMarkupBtns('prev');
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
      // this._generateMarkupBtns('prev');
      // this._generateMarkupBtns('next');
    }

    // Page 1, and there are no other pages
    return ``;
  }
}

export default new PaginationView();

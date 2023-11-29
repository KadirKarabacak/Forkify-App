import View from './View';
import icons from 'url:../../img/icons.svg';

// For both bookmarksView and resultsView
class PreviewView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _parentElementResults = document.querySelector('.results');

  // We create markup for both bookmarksView and resultsView
  _generateMarkup() {
    const id = window.location.hash.slice(1);

    // Burada bookmark olanların width'ini 100% yapman lazım.
    // if(this._parentElement.classList.contains('bookmark__width')) {
    //   return `
    //   <li class="preview bookmark__preview">
    //       <a class="preview__link ${
    //         this._data.id === id ? 'preview__link--active' : ''
    //       }"  href="#${this._data.id}">
    //         <figure class="preview__fig">
    //           <img src="${this._data.image}" alt="${this._data.title}" />
    //         </figure>
    //         <div class="preview__data">
    //           <h4 class="preview__title">${this._data.title}</h4>
    //           <p class="preview__publisher">${this._data.publisher}</p>
    //           <div class="preview__user-generated ${
    //             this._data.key ? '' : 'hidden'
    //           }">
    //             <svg>
    //               <use href="${icons}#icon-user"></use>
    //             </svg>
    //           </div>
    //         </div>
    //       </a>
    //   </li>
    //   `;
    // }

      return `
      <li class="preview ">
          <a class="preview__link ${
            this._data.id === id ? 'preview__link--active' : ''
          }"  href="#${this._data.id}">
            <figure class="preview__fig">
              <img src="${this._data.image}" alt="${this._data.title}" />
            </figure>
            <div class="preview__data">
              <h4 class="preview__title">${this._data.title}</h4>
              <p class="preview__publisher">${this._data.publisher}</p>
              <div class="preview__user-generated ${
                this._data.key ? '' : 'hidden'
              }">
                <svg>
                  <use href="${icons}#icon-user"></use>
                </svg>
              </div>
            </div>
          </a>
      </li>
      `;   
  }
}

export default new PreviewView();

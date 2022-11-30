import Pagination from 'tui-pagination';
import FilmApi from './movieAPI';
import { createMarkUp } from './createMarkUp';
import { spinnerPlay, spinnerStop } from './spinner.js';
import Notiflix from 'notiflix';

const container = document.getElementById('tui-pagination-container');
const filmAPI = new FilmApi();
const ulEl = document.querySelector('.films');

export function createPagination(total_results) {
  let currentPage = 1;

  const instance = new Pagination(container, {
    totalItems: total_results,
    itemsPerPage: 20,
    visiblePages: 5,
    page: currentPage,
    centerAlign: false,
  });

  instance.on('afterMove', event => {
    ulEl.replaceChildren([]);
    currentPage = event.page;

    filmAPI
      .getPopularFilms(currentPage)
      .then(({ results }) => {
        spinnerPlay();
        const markUp = createMarkUp(results);
        ulEl.insertAdjacentHTML('beforeend', markUp);
      })
      .catch(err => Notiflix.Notify.failure(err.message))
      .finally(spinnerStop());
  });
}

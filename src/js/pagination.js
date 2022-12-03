import Pagination from 'tui-pagination';
import FilmApi from './movieAPI';
import { createMarkUp } from './createMarkUp';
import fixArray from './fixArray';
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

  instance.on('afterMove', onInstansEvent);
}

async function onInstansEvent(event) {
  try {
    ulEl.replaceChildren([]);
    currentPage = event.page;
    spinnerPlay();
    const { results } = await filmAPI.getPopularFilms(currentPage);

    const correctFilmsList = fixArray(results);
    const markUp = createMarkUp(correctFilmsList);
    ulEl.insertAdjacentHTML('beforeend', markUp);
  } catch (error) {
    Notiflix.Notify.failure(error.message);
  } finally {
    spinnerStop();
  }
}

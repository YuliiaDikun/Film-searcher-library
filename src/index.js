import './js/getGenres';
import './js/movieAPI';
import './js/modal-team';
import FilmApi from './js/movieAPI';
import Notiflix from 'notiflix';
import { createMarkUp } from './js/createMarkUp';
import { createPagination } from './js/pagination';
import { spinnerPlay, spinnerStop } from './js/spinner.js';
import './js/theme';
import './js/topBtn';
import './js/form';
import './js/pagination';

import fixArray from './js/fixArray';

export const filmAPI = new FilmApi();
const ulEl = document.querySelector('.films');

async function initPage() {
  try {
    spinnerPlay();
    const { page, results, total_pages, total_results } =
      await filmAPI.getPopularFilms();
    const correctFilmsList = fixArray(results);
    const markUp = createMarkUp(correctFilmsList);
    ulEl.insertAdjacentHTML('beforeend', markUp);
    createPagination(total_results);
  } catch (error) {
    Notiflix.Notify.failure(error.message);
  } finally {
    spinnerStop();
  }
}
initPage();

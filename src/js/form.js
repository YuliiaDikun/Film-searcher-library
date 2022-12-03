import FilmApi from './movieAPI';
import { createMarkUp } from './createMarkUp';
import { createPagination } from './pagination';
import Pagination from 'tui-pagination';
import fixArray from './fixArray';
import { spinnerPlay, spinnerStop } from './spinner.js';
import Notiflix from 'notiflix';

const container = document.getElementById('tui-pagination-container');
const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;
const formEl = document.querySelector('.film-form');
const ulEl = document.querySelector('.films');

const filmAPIByQuery = new FilmApi();

formEl.addEventListener('input', debounce(onFormInput, DEBOUNCE_DELAY));

function createQueryPagination(total_results) {
  let currentPage = 1;

  const instance = new Pagination(container, {
    totalItems: total_results,
    itemsPerPage: 20,
    visiblePages: 5,
    page: currentPage,
    centerAlign: false,
  });

  instance.on('afterMove', onInstanceEvent);
}

async function onInstanceEvent(event) {
  try {
    ulEl.replaceChildren([]);
    currentPage = event.page;
    spinnerPlay();
    const { results } = await filmAPIByQuery.getFilmByQuery(currentPage);

    const correctFilmsList = fixArray(results);
    const markUp = createMarkUp(correctFilmsList);
    ulEl.insertAdjacentHTML('beforeend', markUp);
  } catch (error) {
    Notiflix.Notify.failure(error.message);
  } finally {
    spinnerStop();
  }
}

async function onFormInput(e) {
  try {
    if (!e.target.value) {
      const { results, total_results } = await filmAPIByQuery.getPopularFilms();
      const correctFilmsList = fixArray(results);
      const markUp = createMarkUp(correctFilmsList);
      ulEl.innerHTML = markUp;
      createPagination(total_results);
      return;
    } else {
      const searchFilm = e.target.value.trim();
      filmAPIByQuery.query = searchFilm;

      const { results, total_results } = await filmAPIByQuery.getFilmByQuery();
      const correctFilmsList = fixArray(results);
      const markUp = createMarkUp(correctFilmsList);
      ulEl.innerHTML = markUp;
      createQueryPagination(total_results);
    }
  } catch (error) {
    Notiflix.Notify.failure(error.message);
  } finally {
    spinnerStop();
  }
}

import FilmApi from './movieAPI';
import { createMarkUp } from './createMarkUp';
import { createPagination } from './pagination';
import Pagination from 'tui-pagination';
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

  instance.on('afterMove', (event) => {
    ulEl.replaceChildren([]);
    currentPage = event.page;

    filmAPIByQuery
    .getFilmByQuery(currentPage)
    .then(({results}) => {
      const markUp = createMarkUp(results);
      ulEl.insertAdjacentHTML('beforeend', markUp);
    })
    .catch(err => console.log(err.message));
  });
};

function onFormInput(e) {
  if (!e.target.value) {
    filmAPIByQuery
      .getPopularFilms()
      .then(({ page, results, total_pages, total_results }) => {
        console.log(results);
        const markUp = createMarkUp(results);
        ulEl.innerHTML = markUp;
        createPagination(total_results);
      })
      .catch(err => console.log(err.message));
    return;
  }
  const searchFilm = e.target.value.trim();
  console.log(searchFilm);
  filmAPIByQuery.query = searchFilm;
  console.log(filmAPIByQuery);
  filmAPIByQuery
    .getFilmByQuery()
    .then(({ page, results, total_pages, total_results }) => {
      console.log(results);
      const markUp = createMarkUp(results);
      ulEl.innerHTML = markUp;
      createQueryPagination(total_results);
    })
    .catch(err => console.log(err.message));
}

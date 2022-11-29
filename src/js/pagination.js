import Pagination from 'tui-pagination';
import FilmApi from './movieAPI';
import { createMarkUp } from './createMarkUp';

const container = document.getElementById('tui-pagination-container');
const filmAPI = new FilmApi();
const ulEl = document.querySelector('.films');
let currentPage = 1;

const instance = new Pagination(container, {
  totalItems: 20000,
  itemsPerPage: 20,
  visiblePages: 5,
  page: currentPage,
  centerAlign: false,
});

instance.on('afterMove', (event) => {
  ulEl.replaceChildren([]);
  currentPage = event.page;

  filmAPI
  .getPopularFilms(currentPage)
  .then(({ page, results, total_pages, total_results }) => {
    const markUp = createMarkUp(results);
    ulEl.insertAdjacentHTML('beforeend', markUp);
  })
  .catch(err => console.log(err.message));
});
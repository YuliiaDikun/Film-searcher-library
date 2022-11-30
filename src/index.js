import FilmApi from './js/movieAPI';
import { createMarkUp } from './js/createMarkUp';
import { createPagination } from './js/pagination';
import './js/form';
import './js/pagination';
import './js/modal-open';
import './js/localStorage';

export const filmAPI = new FilmApi();
const ulEl = document.querySelector('.films');
filmAPI
  .getPopularFilms()
  .then(({ page, results, total_pages, total_results }) => {
    console.log(results);
    const markUp = createMarkUp(results);
    ulEl.insertAdjacentHTML('beforeend', markUp);
    createPagination(total_results);
  })
  .catch(err => console.log(err.message));

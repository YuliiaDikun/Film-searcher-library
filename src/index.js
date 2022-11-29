import FilmApi from './js/movieAPI';
import { createMarkUp } from './js/createMarkUp';
import './js/form';
import './js/pagination';

export const filmAPI = new FilmApi();
const ulEl = document.querySelector('.films');
filmAPI
  .getPopularFilms()
  .then(({ page, results, total_pages, total_results }) => {
    console.log(results);
    const markUp = createMarkUp(results);
    ulEl.insertAdjacentHTML('beforeend', markUp);
  })
  .catch(err => console.log(err.message));

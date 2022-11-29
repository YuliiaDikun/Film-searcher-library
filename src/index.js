import FilmApi from './js/movieAPI';
import './js/form';

const formAPI = new FilmApi();
const ulEl = document.querySelector('.films');
formAPI
  .getPopularFilms()
  .then(({ page, results, total_pages, total_results }) => {
    console.log(results);
  });

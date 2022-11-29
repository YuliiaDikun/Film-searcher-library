import FilmApi from './js/movieAPI';
import filmCard from './templates/markupGallery.hbs';
import './js/form';

const formAPI = new FilmApi();
const ulEl = document.querySelector('.films');
formAPI
  .getPopularFilms()
  .then(({ page, results, total_pages, total_results }) => {
    createMarkUp(results);
  });

function createMarkUp(arrOfFilms) {
  const markUp = arrOfFilms.map(film => filmCard(film)).join('');
  ulEl.insertAdjacentHTML('beforeend', markUp);
}

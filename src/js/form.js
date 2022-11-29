import FilmApi from './movieAPI';
import { createMarkUp } from './createMarkUp';
const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;
const formEl = document.querySelector('.film-form');
const ulEl = document.querySelector('.films');
const filmAPIByQuery = new FilmApi();
formEl.addEventListener('input', debounce(onFormInput, DEBOUNCE_DELAY));

function onFormInput(e) {
  if (!e.target.value) {
    filmAPIByQuery
      .getPopularFilms()
      .then(({ page, results, total_pages, total_results }) => {
        console.log(results);
        const markUp = createMarkUp(results);
        ulEl.innerHTML = markUp;
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
    })
    .catch(err => console.log(err.message));
}

import FilmApi from './movieAPI';
import debounce from 'lodash.debounce';
const DEBOUNCE_DELAY = 300;
const formEl = document.querySelector('.film-form');

formEl.addEventListener('input', debounce(onFormInput, DEBOUNCE_DELAY));

function onFormInput() {
  const searchFilm = e.target.value.trim();
}

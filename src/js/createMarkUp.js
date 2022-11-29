import filmCard from '../templates/markupGallery.hbs';

export function createMarkUp(arrOfFilms) {
  const markUp = arrOfFilms.map(film => filmCard(film)).join('');
  return markUp;
}

export function createFilm(filmObj) {
  const markUp = filmCard(filmObj);
  return markUp;
}

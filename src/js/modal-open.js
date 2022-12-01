import Notiflix from 'notiflix';
import FilmApi from './movieAPI';
import filmCard from '../templates/modal-film.hbs';
import fixObject from './fixObject';

const ulEl = document.querySelector('.films');
const modal = document.querySelector('.modal-backdrop');
const closeBtn = document.querySelector('.modal-close-btn');
ulEl.addEventListener('click', onFimlsListClick);
const filmAPIByID = new FilmApi();

async function onFimlsListClick(evt) {
  try {
    console.log(evt.target.nodeName);
    if (evt.target.nodeName === 'UL') {
      return;
    }
    let id = evt.target.closest('li').dataset.id;
    filmAPIByID.idFilm = id;
    const film = await filmAPIByID.getFilmByID();
    console.log(film);
    const fixedFilm = fixObject(film);
    const filmMarkUp = filmCard(fixedFilm);
    document.querySelector('body').insertAdjacentHTML('beforeend', filmMarkUp);

    console.log(closeBtn);
  } catch (error) {
    Notiflix.Notify.failure(error.message);
  }
}
closeBtn.addEventListener('click', () => {
  modal.classList.add('is-hidden');
});

import Notiflix from 'notiflix';
import FilmApi from './movieAPI';
import filmCard from '../templates/modal-film.hbs';
import fixObject from './fixObject';
import { setLocalStorage, getLocalStorage } from './localStorage';
import setFilmToLocalStorage from './setFilmToLocalStorage';

const ulEl = document.querySelector('.films');
const LOCAL_WATCHED = 'watchedList';
const LOCAL_QUEUE = 'queueList';

ulEl.addEventListener('click', onFimlsListClick);

const filmAPIByID = new FilmApi();

async function onFimlsListClick(evt) {
  try {
    if (evt.target.nodeName === 'UL') {
      return;
    }
    const item = evt.target.closest('li');

    let id = item.dataset.id;

    filmAPIByID.idFilm = id;
    const film = await filmAPIByID.getFilmByID();

    const fixedFilm = fixObject(film);
    const filmMarkUp = filmCard(fixedFilm);

    document.querySelector('body').insertAdjacentHTML('beforeend', filmMarkUp);

    let modal = document.querySelector('.modal-backdrop');
    let closeBtn = document.querySelector('.modal-close-btn');

    const onClose = event => {
      if (event.code === 'Escape') {
        modal.remove();
        document.removeEventListener('keydown', onClose);
      }
    };

    const onModalFilmClick = event => {
      if (event.target.nodeName === 'path' || event.target.nodeName === 'svg') {
        modal.remove();
        document.removeEventListener('keydown', onClose);
      }
      if (event.target === event.currentTarget) {
        modal.remove();
        document.removeEventListener('keydown', onClose);
      }

      if (event.target.dataset.name === 'watched') {
        setFilmToLocalStorage(LOCAL_WATCHED, id, fixedFilm);
      }
      if (event.target.dataset.name === 'queue') {
        setFilmToLocalStorage(LOCAL_QUEUE, id, fixedFilm);
      }
    };
    modal.addEventListener('click', onModalFilmClick);
    document.addEventListener('keydown', onClose);
  } catch (error) {
    Notiflix.Notify.failure(error.message);
  }
}

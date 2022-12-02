import Notiflix from 'notiflix';
import FilmApi from './movieAPI';
import filmCard from '../templates/modal-film.hbs';
import fixObject from './fixObject';
import { setLocalStorage, getLocalStorage } from './localStorage';
import filmLibraryCard from '../templates/filmLibraryCard.hbs';
import setFilmToLocalStorage from './setFilmToLocalStorage';

const watchedLibraryBtn = document.querySelector('[data-watched]');
const queueLibraryBtn = document.querySelector('[data-queue]');
const ulEl = document.querySelector('.films');

const LOCAL_WATCHED = 'watchedList';
const LOCAL_QUEUE = 'queueList';
const LOCAL_LIST = 'selectedList';

watchedLibraryBtn.addEventListener('click', onWatchedLibrary);
queueLibraryBtn.addEventListener('click', onQueueLibrary);
ulEl.addEventListener('click', onUlElClick);

const filmAPIByID = new FilmApi();

function onWatchedLibrary() {
  queueLibraryBtn.classList.remove('is-active');
  watchedLibraryBtn.classList.add('is-active');

  createFilmList(LOCAL_WATCHED);
  setLocalStorage(LOCAL_LIST, 'watched');
}

function onQueueLibrary() {
  watchedLibraryBtn.classList.remove('is-active');
  queueLibraryBtn.classList.add('is-active');

  createFilmList(LOCAL_QUEUE);
  setLocalStorage(LOCAL_LIST, 'queue');
}

async function onUlElClick(e) {
  try {
    if (e.target.nodeName === 'UL') {
      return;
    }
    const selectedList = getLocalStorage(LOCAL_LIST);

    const item = e.target.closest('li');

    let id = item.dataset.id;

    filmAPIByID.idFilm = id;
    const film = await filmAPIByID.getFilmByID();

    const fixedFilm = fixObject(film);
    const filmMarkUp = filmCard(fixedFilm);

    document.querySelector('body').insertAdjacentHTML('beforeend', filmMarkUp);
    let modal = document.querySelector('.modal-backdrop');
    let watchedBtn = document.querySelector('[data-name="watched"]');
    let queueBtn = document.querySelector('[data-name="queue"]');
    watchedBtn.textContent = 'REMOVE';
    if (selectedList === 'queue') {
      queueBtn.textContent = 'ADD TO WATCHED';
    }
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
    };
    const onWatchedBtn = event => {
      if (selectedList === 'watched') {
        removeFromLocal(LOCAL_WATCHED, id, item, modal);
      } else {
        removeFromLocal(LOCAL_QUEUE, id, item, modal);
      }
    };
    const onQueueBtn = event => {
      if (selectedList === 'queue') {
        setFilmToLocalStorage(LOCAL_WATCHED, id, fixedFilm, onClose);
        removeFromLocal(LOCAL_QUEUE, id, item, modal);
      } else {
        setFilmToLocalStorage(LOCAL_QUEUE, id, fixedFilm, onClose);
        removeFromLocal(LOCAL_WATCHED, id, item, modal);
      }
    };
    modal.addEventListener('click', onModalFilmClick);
    document.addEventListener('keydown', onClose);
    watchedBtn.addEventListener('click', onWatchedBtn);
    queueBtn.addEventListener('click', onQueueBtn);
  } catch (error) {
    Notiflix.Notify.failure(error.message);
  }
}

function removeFromLocal(localKey, filmId, li, modal, onClose) {
  const watchedArray = getLocalStorage(localKey);
  const index = watchedArray.findIndex(film => film.id === Number(filmId));
  watchedArray.splice(index, 1);
  setLocalStorage(localKey, watchedArray);
  li.remove();
  modal.remove();
  document.removeEventListener('keydown', onClose);
}

function createFilmList(localKey) {
  ulEl.innerHTML = '';
  const arrayOfWatchedFilms = getLocalStorage(localKey);
  if (!arrayOfWatchedFilms.length) {
    Notiflix.Notify.failure('The list is empty.');
  }
  const watchedMarkUp = arrayOfWatchedFilms
    .map(film => filmLibraryCard(film))
    .join('');
  ulEl.insertAdjacentHTML('beforeend', watchedMarkUp);
}

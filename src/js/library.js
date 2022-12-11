import Notiflix from 'notiflix';
import FilmApi from './movieAPI';
import filmCard from '../templates/modal-film.hbs';
import fixObject from './fixObject';
import { setLocalStorage, getLocalStorage } from './localStorage';
import filmLibraryCard from '../templates/filmLibraryCard.hbs';
import setFilmToLocalStorage from './setFilmToLocalStorage';
import { getFavGenres } from './getFavGenres';
import { spinnerPlay, spinnerStop } from './spinner.js';
import fixArray from './fixArray';
import { createPagination } from './pagination';
import { createMarkUp } from './createMarkUp';
import './theme';
import './topBtn';

const watchedLibraryBtn = document.querySelector('[data-watched]');
const queueLibraryBtn = document.querySelector('[data-queue]');
const favBtn = document.querySelector('[data-fav]');
const h2Rec = document.querySelector('.recom');

const ulEl = document.querySelector('.films');
const modalContainer = document.querySelector('#js-film-modal');

const LOCAL_WATCHED = 'watchedList';
const LOCAL_QUEUE = 'queueList';
const LOCAL_LIST = 'selectedList';
const FAV_KEY = 'favouriteMovies';

watchedLibraryBtn.addEventListener('click', onWatchedLibrary);
queueLibraryBtn.addEventListener('click', onQueueLibrary);
favBtn.addEventListener('click', onFavBtn);
ulEl.addEventListener('click', onUlElClick);

const filmAPIByID = new FilmApi();

function onWatchedLibrary() {
  queueLibraryBtn.classList.remove('is-active');
  favBtn.classList.remove('is-active');
  watchedLibraryBtn.classList.add('is-active');

  createFilmList(LOCAL_WATCHED);
  setLocalStorage(LOCAL_LIST, 'watched');
}

function onQueueLibrary() {
  watchedLibraryBtn.classList.remove('is-active');
  favBtn.classList.remove('is-active');
  queueLibraryBtn.classList.add('is-active');

  createFilmList(LOCAL_QUEUE);
  setLocalStorage(LOCAL_LIST, 'queue');
}
async function onFavBtn() {
  try {
    setLocalStorage(LOCAL_LIST, 'fav');
    ulEl.innerHTML = '';
    watchedLibraryBtn.classList.remove('is-active');
    queueLibraryBtn.classList.remove('is-active');
    favBtn.classList.add('is-active');
    const favGenres = getFavGenres();
    if (!favGenres.length) {
      Notiflix.Notify.failure("We don't have any recomendations for you :(");
      return;
    }
    h2Rec.classList.remove('visually-hidden');

    spinnerPlay();

    const { results, total_results } = await filmAPIByID.getFavMovies(
      favGenres
    );
    const correctFilmsList = await fixArray(results);
    const markUp = createMarkUp(correctFilmsList);
    ulEl.insertAdjacentHTML('beforeend', markUp);
  } catch (error) {
    Notiflix.Notify.failure(error.message);
  } finally {
    spinnerStop();
  }
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

    const video = await filmAPIByID.getTrailerById();

    let arr = video.results;

    function findTrailer(arr) {
      return arr
        .map(el => {
          return el;
        })
        .find(el => el.name.includes('Trailer') || el.name);
    }
    let objectWithTrailer = findTrailer(arr);

    function trailerCheck(object) {
      if (!object) {
        Notiflix.Notify.failure('Oops! Trailer did not find...');
      } else {
        return `https://www.youtube.com/embed/${object.key}`;
      }
    }
    const movieLink = trailerCheck(objectWithTrailer);

    const fixedFilm = fixObject(film);

    fixedFilm.movie = movieLink;

    const filmMarkUp = filmCard(fixedFilm);

    modalContainer.innerHTML = filmMarkUp;
    modalContainer.classList.remove('is-hidden');
    let trailerBtnRef = document.querySelector('.trailerShow');
    let iframeRef = document.querySelector('.hidden');
    trailerBtnRef.addEventListener('click', toggleIframe);

    function disabledtrailerBtn() {
      if (!fixedFilm.movie) {
        trailerBtnRef.disabled = true;
      }
    }
    disabledtrailerBtn();
    function toggleIframe() {
      iframeRef.classList.toggle('trailer__youtube');
    }

    let watchedBtn = document.querySelector('[data-name="watched"]');
    let queueBtn = document.querySelector('[data-name="queue"]');
    watchedBtn.textContent = 'REMOVE';
    if (selectedList === 'queue') {
      queueBtn.textContent = 'ADD TO WATCHED';
    }

    const onWatchedBtn = event => {
      if (selectedList === 'watched') {
        removeFromLocal(LOCAL_WATCHED, id, item);
      } else {
        removeFromLocal(LOCAL_QUEUE, id, item);
      }
    };
    const onQueueBtn = event => {
      if (selectedList === 'queue') {
        setFilmToLocalStorage(LOCAL_WATCHED, id, fixedFilm);
        removeFromLocal(LOCAL_QUEUE, id, item);
      } else {
        setFilmToLocalStorage(LOCAL_QUEUE, id, fixedFilm);
        removeFromLocal(LOCAL_WATCHED, id, item);
      }
    };
    modalContainer.addEventListener('click', onModalFilmClick);
    document.addEventListener('keydown', onClose);
    watchedBtn.addEventListener('click', onWatchedBtn);
    queueBtn.addEventListener('click', onQueueBtn);
  } catch (error) {
    Notiflix.Notify.failure(error.message);
  }
}

function removeFromLocal(localKey, filmId, li) {
  const watchedArray = getLocalStorage(localKey);
  const index = watchedArray.findIndex(film => film.id === Number(filmId));
  watchedArray.splice(index, 1);
  setLocalStorage(localKey, watchedArray);
  closeModal();
  li.remove();
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
function closeModal() {
  modalContainer.innerHTML = '';
  modalContainer.classList.add('is-hidden');
  document.removeEventListener('keydown', onClose);
  modalContainer.removeEventListener('click', onModalFilmClick);
}
function onClose(event) {
  if (event.code === 'Escape') {
    closeModal();
  }
}
function onModalFilmClick(event) {
  if (event.target.nodeName === 'path' || event.target.nodeName === 'svg') {
    closeModal();
  }
  if (event.target === event.currentTarget) {
    closeModal();
  }
}

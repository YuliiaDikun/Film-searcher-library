import Notiflix from 'notiflix';
import FilmApi from './movieAPI';
import filmCard from '../templates/modal-film.hbs';
import fixObject from './fixObject';

import setFilmToLocalStorage from './setFilmToLocalStorage';

const ulEl = document.querySelector('.films');
const modalContainer = document.querySelector('#js-film-modal');
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

    const id = item.dataset.id;

    filmAPIByID.idFilm = id;

    const film = await filmAPIByID.getFilmByID();

    // =============================================================
    const video = await filmAPIByID.getTrailerById();
    let arr = video.results;
    console.log(arr);
    function findTrailer(arr) {
      return arr
        .map(el => {
          return el;
        })
        .find(el => el.name.includes('Trailer') || el.name);
    }
    let objectWithTrailer = findTrailer(arr);
    console.log(objectWithTrailer);

    function trailerCheck(object) {
      if (!objectWithTrailer) {
        Notiflix.Notify.failure('Trailer did not find');
      } else {
        return `https://www.youtube.com/embed/${objectWithTrailer.key}`;
      }
    }
    const movieLink = trailerCheck(objectWithTrailer);
    // const movieLink = `https://www.youtube.com/embed/${objectWithTrailer.key}`;

    const fixedFilm = fixObject(film);
    fixedFilm.movie = movieLink;

    const filmMarkUp = filmCard(fixedFilm);

    modalContainer.innerHTML = filmMarkUp;

    let trailerBtnRef = document.querySelector('.trailerShow');
    let iframeRef = document.querySelector('.hidden');

    modalContainer.classList.remove('is-hidden');
    modalContainer.addEventListener('click', onModalFilmClick);
    document.addEventListener('keydown', onClose);
    trailerBtnRef.addEventListener('click', toggleIframe);

    function toggleIframe() {
      if (!fixedFilm.movie) {
        Notiflix.Notify.failure('Trailer did not find');
      }
      iframeRef.classList.toggle('trailer__youtube');
    }
    function closeModal() {
      modalContainer.innerHTML = '';
      modalContainer.classList.add('is-hidden');
      document.removeEventListener('keydown', onClose);
      modalContainer.removeEventListener('click', onModalFilmClick);
      trailerBtnRef.removeEventListener('click', toggleIframe);
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

      if (event.target.dataset.name === 'watched') {
        setFilmToLocalStorage(LOCAL_WATCHED, id, fixedFilm);
      }
      if (event.target.dataset.name === 'queue') {
        setFilmToLocalStorage(LOCAL_QUEUE, id, fixedFilm);
      }
    }
  } catch (error) {
    Notiflix.Notify.failure(error.message);
  }
}

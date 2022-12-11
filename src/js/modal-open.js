import Notiflix from 'notiflix';
import FilmApi from './movieAPI';
import filmCard from '../templates/modal-film.hbs';
import fixObject from './fixObject';
import { setLocalStorage, getLocalStorage } from './localStorage';
import setFilmToLocalStorage from './setFilmToLocalStorage';
const ulEl = document.querySelector('.films');
const modalContainer = document.querySelector('#js-film-modal');
const LOCAL_WATCHED = 'watchedList';
const LOCAL_QUEUE = 'queueList';
const FAV_KEY = 'favouriteMovies';
let favObj = getLocalStorage(FAV_KEY);
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
    let genres = film.genres;
    if (evt.target.nodeName === 'svg' || evt.target.nodeName === 'path') {
      let favIcon = evt.target.closest('svg');
      favIcon.classList.toggle('active');
      let favId = Object.keys(favObj);
      if (favIcon.classList.contains('active') && !favId.includes(id)) {
        genres.forEach(genre => (favObj[id] = genre));
        setLocalStorage(FAV_KEY, favObj);
      }
    } else {
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

      let trailerBtnRef = document.querySelector('.trailerShow');
      let iframeRef = document.querySelector('.hidden');

      modalContainer.classList.remove('is-hidden');
      modalContainer.addEventListener('click', onModalFilmClick);
      document.addEventListener('keydown', onClose);
      trailerBtnRef.addEventListener('click', toggleIframe);

      function disabledtrailerBtn() {
        if (!fixedFilm.movie) {
          trailerBtnRef.disabled = true;
          trailerBtnRef.classList.add('noHover');
        }
      }

      disabledtrailerBtn();
      function toggleIframe() {
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
        if (
          event.target.nodeName === 'path' ||
          event.target.nodeName === 'svg'
        ) {
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
    }
  } catch (error) {
    Notiflix.Notify.failure(error.message);
  }
}

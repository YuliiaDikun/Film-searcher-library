import Notiflix from 'notiflix';
import FilmApi from './movieAPI';
import filmCard from '../templates/modal-film.hbs';
import fixObject from './fixObject';
import { setLocalStorage, getLocalStorage } from './localStorage';

const ulEl = document.querySelector('.films');
export const LOCAL_WATCHED = 'watchedList';
export const LOCAL_QUEUE = 'queueList';

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
    // =============================================================
    const video = await filmAPIByID.getTrailerById();
    let trailerKey = video.results[0].key;
    function youtubeLink(key) {
      let movie;
      movie = `https://www.youtube.com/embed/${key}`;
      return movie;
    }
    const movieLink = youtubeLink(trailerKey);

    const fixedFilm = fixObject(film);
    fixedFilm.movie = movieLink;
    console.log(fixedFilm);
    const filmMarkUp = filmCard(fixedFilm);
    document.querySelector('body').insertAdjacentHTML('beforeend', filmMarkUp);

    let youtubeBtnRef = document.querySelector('.trailerShow');
    let iframeRef = document.querySelector('.hidden');
    youtubeBtnRef.addEventListener('click', () => {
      iframeRef.classList.toggle('trailer__youtube');
      // modal.scrollTo(0, 400);
    });
    // =================================================================
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
        let watchedLocalArray = getLocalStorage(LOCAL_WATCHED);
        watchedLocalArray = watchedLocalArray ? watchedLocalArray : [];
        if (!watchedLocalArray.length) {
          watchedLocalArray.push(fixedFilm);
          setLocalStorage(LOCAL_WATCHED, watchedLocalArray);
        } else {
          const hasId = watchedLocalArray.some(film => film.id === Number(id));
          if (hasId) {
            Notiflix.Notify.failure('Already in list!');
          }
          if (!hasId) {
            watchedLocalArray.push(fixedFilm);
            setLocalStorage(LOCAL_WATCHED, watchedLocalArray);
          }
        }
      }
      if (event.target.dataset.name === 'queue') {
        let queueLocalArray = getLocalStorage(LOCAL_QUEUE);
        queueLocalArray = queueLocalArray ? queueLocalArray : [];
        if (!queueLocalArray.length) {
          queueLocalArray.push(fixedFilm);
          setLocalStorage(LOCAL_QUEUE, queueLocalArray);
        } else {
          const hasId = queueLocalArray.some(film => film.id === Number(id));
          if (hasId) {
            Notiflix.Notify.failure('Already in queue!');
          }
          if (!hasId) {
            queueLocalArray.push(fixedFilm);
            setLocalStorage(LOCAL_QUEUE, queueLocalArray);
          }
        }
      }
    };
    modal.addEventListener('click', onModalFilmClick);
    document.addEventListener('keydown', onClose);
  } catch (error) {
    Notiflix.Notify.failure(error.message);
  }
}

import Notiflix from 'notiflix';
import FilmApi from './movieAPI';
import filmCard from '../templates/modal-film.hbs';
import fixObject from './fixObject';

const ulEl = document.querySelector('.films');

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
    
    const fixedFilm = fixObject(film);
    const filmMarkUp = filmCard(fixedFilm);

    document.querySelector('body').insertAdjacentHTML('beforeend', filmMarkUp);

    let modal = document.querySelector('.modal-backdrop');
    let closeBtn = document.querySelector('.modal-close-btn');

    modal.addEventListener('click', event => {
      if (event.target.nodeName === 'path' || event.target.nodeName === 'svg') {
        console.log(event.target.nodeName);
        modal.remove();
      }
      if (event.target === event.currentTarget) {
        modal.remove();
      }
      if (event.target.dataset.name === 'watched') {
        console.log('watched');
      }
      if (event.target.dataset.name === 'queue') {
        console.log('queue');
      }
    });
    console.log(closeBtn);
  } catch (error) {
    Notiflix.Notify.failure(error.message);
  }
}

import Notiflix from 'notiflix';
import FilmApi from './movieAPI';
import filmCard from '../templates/modal-film.hbs';
import fixObject from './fixObject';

const ulEl = document.querySelector('.films');

ulEl.addEventListener('click', onFimlsListClick);

const filmAPIByID = new FilmApi();

async function onFimlsListClick(evt) {
  try {   
    if (evt.target.nodeName === 'UL') {
      return;
    }
    const item = evt.target.closest('li');
    let info = item.dataset.info;
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
        };        
      }

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
        console.log('watched');
        console.log(info)
      }
      if (event.target.dataset.name === 'queue') {
        console.log('queue');
        console.log(info);
      }     
  }
  modal.addEventListener('click', onModalFilmClick);
  document.addEventListener('keydown', onClose);

} catch (error) {
    Notiflix.Notify.failure(error.message);
  }
}

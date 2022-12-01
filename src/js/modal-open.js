import Notiflix from 'notiflix';
import FilmApi from './movieAPI';
import filmCard from '../templates/modal-film.hbs';
import fixObject from './fixObject';
import {setLocalStorage, getLocalStorage} from './localStorage'

const ulEl = document.querySelector('.films');
const LOCAL_WATCHED = 'watchedList';
const LOCAL_QUEUE = 'queueList';

let watchedList = []; // for film id
let queueList = []; //for id
let watchedFilms = []; // for film markup
let queueFilms = []; // for film markup

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
        watchedList.push(id);
        const watchedLocalArray = getLocalStorage(LOCAL_WATCHED);
        if(watchedLocalArray){
           const hasFilm = watchedLocalArray.find(film => watchedList.includes(film.id)); 
            if(watchedLocalArray && hasFilm){
                Notiflix.Notify.failure('Already on list')
            } else if(watchedLocalArray && !hasFilm){
                watchedFilms.push(filmMarkUp);
                setLocalStorage(LOCAL_WATCHED, watchedFilms);
                return;
            } 
        } else{
            watchedFilms.push(filmMarkUp);
            setLocalStorage(LOCAL_WATCHED, watchedFilms);
        }       
      }
      if (event.target.dataset.name === 'queue') {
        queueList.push(id);
        const queueLocalArray = getLocalStorage(LOCAL_QUEUE);
        if(queueLocalArray){
           const hasFilm = queueLocalArray.find(film => queueList.includes(film.id)); 
            if(queueLocalArray && hasFilm){
                Notiflix.Notify.failure('Already on queue!')
            } else if(queueLocalArray && !hasFilm){
                queueFilms.push(filmMarkUp);
                setLocalStorage(LOCAL_QUEUE, queueFilms);
                return;
            } 
        } else{
            queueFilms.push(filmMarkUp);
            setLocalStorage(LOCAL_QUEUE, queueFilms);
        }        
      }     
  }
  modal.addEventListener('click', onModalFilmClick);
  document.addEventListener('keydown', onClose);

} catch (error) {
    Notiflix.Notify.failure(error.message);
  }
}

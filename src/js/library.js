import { setLocalStorage, getLocalStorage } from './localStorage';
import filmLibraryCard from '../templates/filmLibraryCard.hbs';

const watchedLibraryBtn = document.querySelector('[data-watched]');
const queueLibraryBtn = document.querySelector('[data-queue]');
const filmContainer = document.querySelector('.films');

const LOCAL_WATCHED = 'watchedList';
const LOCAL_QUEUE = 'queueList';

watchedLibraryBtn.addEventListener('click', onWatchedLibrary);
queueLibraryBtn.addEventListener('click', onQueueLibrary);

function onWatchedLibrary() {
  filmContainer.innerHTML = '';
  const arrayOfWatchedFilms = getLocalStorage(LOCAL_WATCHED);
  const watchedMarkUp = arrayOfWatchedFilms
    .map(film => filmLibraryCard(film))
    .join('');
  console.log(watchedMarkUp);
  filmContainer.insertAdjacentHTML('beforeend', watchedMarkUp);
}

function onQueueLibrary() {
  filmContainer.innerHTML = '';
  const arrayOfQueueFilms = getLocalStorage(LOCAL_QUEUE);
  const watchedMarkUp = arrayOfQueueFilms
    .map(film => filmLibraryCard(film))
    .join('');
  console.log(watchedMarkUp);
  filmContainer.insertAdjacentHTML('beforeend', watchedMarkUp);
}

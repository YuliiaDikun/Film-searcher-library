import { setLocalStorage, getLocalStorage } from './localStorage';
import Notiflix from 'notiflix';

export default function setFilmToLocalStorage(localKey, filmId, filmObj) {
  let watchedLocalArray = getLocalStorage(localKey);
  watchedLocalArray = watchedLocalArray ? watchedLocalArray : [];
  if (!watchedLocalArray.length) {
    watchedLocalArray.push(filmObj);
    setLocalStorage(localKey, watchedLocalArray);
  } else {
    const hasId = watchedLocalArray.some(film => film.id === Number(filmId));
    if (hasId) {
      Notiflix.Notify.failure('Already in list!');
    }
    if (!hasId) {
      watchedLocalArray.push(filmObj);
      setLocalStorage(localKey, watchedLocalArray);
    }
  }
}

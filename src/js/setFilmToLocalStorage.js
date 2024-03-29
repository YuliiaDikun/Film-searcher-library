import { setLocalStorage, getLocalStorage } from './localStorage';
import Notiflix from 'notiflix';

export default function setFilmToLocalStorage(localKey, filmId, filmObj) {
  let watchedLocalArray = getLocalStorage(localKey);
  watchedLocalArray = watchedLocalArray ? watchedLocalArray : [];
  if (!watchedLocalArray.length) {
    watchedLocalArray.push(filmObj);
    setLocalStorage(localKey, watchedLocalArray);
    Notiflix.Notify.success('Success! The movie has been added to the list.');
  } else {
    const hasId = watchedLocalArray.some(film => film.id === Number(filmId));
    if (hasId) {
      Notiflix.Notify.failure('Already in list!');
    }
    if (!hasId) {
      watchedLocalArray.push(filmObj);
      setLocalStorage(localKey, watchedLocalArray);
      Notiflix.Notify.success('Success! The movie has been added to the list.');
    }
  }
}
export function setFavFilmsToLocalStorage(localKey, genre, filmId) {
  let watchedLocalObj = getLocalStorage(localKey);
  watchedLocalObj = watchedLocalObj ? watchedLocalObj : {};

  if (!Object.keys(watchedLocalObj).length) {
    watchedLocalObj[filmId] = genre;
    setLocalStorage(localKey, watchedLocalObj);
    Notiflix.Notify.success(
      'Success! The movie has been added to your favourites.'
    );
  } else {
    const favId = Object.keys(watchedLocalObj);
    if (favId.includes(String(filmId))) {
      delete watchedLocalObj[filmId];
      setLocalStorage(localKey, watchedLocalObj);
      Notiflix.Notify.success(
        'Success! The movie has been deleted from your favourites.'
      );
    } else {
      watchedLocalObj[filmId] = genre;
      setLocalStorage(localKey, watchedLocalObj);
      Notiflix.Notify.success(
        'Success! The movie has been added to your favourites.'
      );
    }
  }
}

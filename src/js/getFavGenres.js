import { setLocalStorage, getLocalStorage } from './localStorage';
const FAV_KEY = 'favouriteMovies';
const favLocal = getLocalStorage(FAV_KEY);
const arrayOfValues = Object.values(favLocal);
export function getFavGenres() {
  const object = {};

  arrayOfValues.forEach(film => {
    if (object[film.id]) {
      object[film.id] = object[film.id] + 1;
    } else {
      object[film.id] = 1;
    }
  });
  const sortedGenres = Object.entries(object).sort((a, b) => b[1] - a[1]);
  const favGenres = [];
  sortedGenres.forEach(genre => favGenres.push(Number(genre[0])));
  return favGenres.slice(0, 3).join(', ');
}

import { SESSION_KEY } from './getGenres';
const genresListSaved = sessionStorage.getItem(SESSION_KEY);
const parsedGenresList = JSON.parse(genresListSaved);

export default function fixArray(array) {
  return array.map(film => {
    if (film.release_date) {
      const date = film.release_date;
      const year = date.slice(0, 4);
      film.release_date = year;
    }
    if (film.genre_ids) {
      const validGenres = film.genre_ids.map(
        id => parsedGenresList.find(({ id: filmId }) => id === filmId).name
      );

      const genres =
        validGenres.length > 2
          ? `${validGenres[0]}, ${validGenres[1]}, Other`
          : `${validGenres.join(', ')}`;
      film.genre_ids = genres;
    }    
    return film;
  });
}

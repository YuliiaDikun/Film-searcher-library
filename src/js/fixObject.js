import { SESSION_KEY } from './getGenres';
const genresListSaved = sessionStorage.getItem(SESSION_KEY);
const parsedGenresList = JSON.parse(genresListSaved);

export default function fixObject(film) {
  if (film.vote_average) {
    const vote = film.vote_average;
    film.vote_average = vote.toFixed(1);
  }
  if (film.popularity) {
    const rating = film.popularity;
    film.popularity = rating.toFixed(1);
  }
  if (film.genres) {
    const validGenres = film.genres.map(film => film.name);
    const genresStr =
      validGenres.length > 2
        ? `${validGenres[0]}, ${validGenres[1]}, Other`
        : `${validGenres.join(', ')}`;
    film.genres = genresStr;
  }
  return film;
}

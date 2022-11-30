import FilmApi from './js/movieAPI';
import { createMarkUp } from './js/createMarkUp';
import { createPagination } from './js/pagination';
import './js/form';
import './js/pagination';
import { SESSION_KEY } from './js/getGenres';

const genresListSaved = sessionStorage.getItem(SESSION_KEY);
const parsedGenresList = JSON.parse(genresListSaved);

export const filmAPI = new FilmApi();
const ulEl = document.querySelector('.films');
filmAPI
  .getPopularFilms()
  .then(({ page, results, total_pages, total_results }) => {
    const correctFilmsList = results.map(film => {
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
    console.log(correctFilmsList);

    const markUp = createMarkUp(correctFilmsList);
    ulEl.insertAdjacentHTML('beforeend', markUp);
    createPagination(total_results);
  })
  .catch(err => console.log(err.message));

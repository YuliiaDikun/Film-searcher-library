import FilmApi from './movieAPI';

const genresAPI = new FilmApi();
export const SESSION_KEY = 'genresList';

genresAPI.getGenres().then(({ genres }) => {
  localStorage.setItem(SESSION_KEY, JSON.stringify(genres));
});

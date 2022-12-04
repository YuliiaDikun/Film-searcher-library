import axios from 'axios';
const API_KEY = 'f9c0bb738fb5ed39704a871786e56353';
axios.defaults.baseURL = 'https://api.themoviedb.org/3';

export default class FilmApi {
  constructor() {
    this.query = '';
    this.id = null;
  }
  get idFilm() {
    return this.id;
  }
  set idFilm(newId) {
    this.id = newId;
  }
  async getPopularFilms(page = 1) {
    const { data } = await axios.get(
      `/trending/movie/week?api_key=${API_KEY}&page=${page}`
    );
    return data;
  }
  async getFilmByID() {
    const { data } = await axios.get(`/movie/${this.id}?api_key=${API_KEY}`);
    return data;
  }
  async getFilmByQuery(page = 1) {
    const { data } = await axios.get(
      `/search/movie?api_key=${API_KEY}&query=${this.query}&page=${page}`
    );
    return data;
  }
  async getGenres() {
    const { data } = await axios.get(
      `/genre/movie/list?api_key=${API_KEY}&language=en-US`
    );
    return data;
  }
  async getTrailerById() {
    const { data } = await axios.get(
      `/movie/${this.id}/videos?api_key=${API_KEY}&language=en-US`
    );
    return data;
  }
}

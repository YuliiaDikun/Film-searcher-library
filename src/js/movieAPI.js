import axios from 'axios';

export default class FilmApi {
  constructor() {
    this.query = '';
    this.id = null;
    this.API_KEY = 'f9c0bb738fb5ed39704a871786e56353';
    this.BASE_URL = 'https://api.themoviedb.org/3/';
  }
  get idFilm() {
    return this.id;
  }
  set idFilm(newId) {
    this.id = newId;
  }
  async getPopularFilms(page = 1) {
    const { data } = await axios.get(
      `${this.BASE_URL}trending/movie/week?api_key=${this.API_KEY}&page=${page}`
    );
    return data;
  }
  async getFilmByID() {
    const { data } = await axios.get(
      `${this.BASE_URL}/movie/${this.id}?api_key=${this.API_KEY}`
    );
    return data;
  }
  async getFilmByQuery(page = 1) {
    const { data } = await axios.get(
      `${this.BASE_URL}/search/movie?api_key=${this.API_KEY}&query=${this.query}&page=${page}`
    );
    return data;
  }
  async getGenres() {
    const { data } = await axios.get(
      `${this.BASE_URL}genre/movie/list?api_key=${this.API_KEY}&language=en-US`
    );
    return data;
  }
  async getTrailerById() {
    const { data } = await axios.get(
      `${this.BASE_URL}/movie/${this.id}/videos?api_key=${this.API_KEY}&language=en-US`
    );
    return data;
  }
}

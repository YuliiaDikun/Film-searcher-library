import axios from 'axios';

const TOKEN =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmOWMwYmI3MzhmYjVlZDM5NzA0YTg3MTc4NmU1NjM1MyIsInN1YiI6IjYzODRkZDQxMjI5YWUyMTU1NDI4NzZlZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MG5ERw-LsYYIi76z7VCjip-mCqVCLGAMh-W1Q30enAc';
axios.defaults.baseURL = 'https://api.themoviedb.org/3';

export default class FilmApi {
  #API_KEY = 'f9c0bb738fb5ed39704a871786e56353';
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
      `/trending/movie/week?api_key=${this.#API_KEY}&page=${page}`
    );
    return data;
  }
  async getFilmByID() {
    const { data } = await axios.get(
      `/movie/${this.id}?api_key=${this.#API_KEY}`
    );
    return data;
  }
  async getFilmByQuery(page = 1) {
    const { data } = await axios.get(
      `/search/movie?api_key=${this.#API_KEY}&query=${this.query}&page=${page}`
    );
    return data;
  }
}

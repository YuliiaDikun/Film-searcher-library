import axios from 'axios';

const TOKEN =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmOWMwYmI3MzhmYjVlZDM5NzA0YTg3MTc4NmU1NjM1MyIsInN1YiI6IjYzODRkZDQxMjI5YWUyMTU1NDI4NzZlZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MG5ERw-LsYYIi76z7VCjip-mCqVCLGAMh-W1Q30enAc';
axios.defaults.baseURL = 'https://api.themoviedb.org/3';

export default class FilmApi {
  #API_KEY = 'f9c0bb738fb5ed39704a871786e56353';
  constructor() {
    this.page = 1;
    this.query = '';
    this.id = null;
  }
  get id() {
    return this.id;
  }
  set id(newId) {
    this.id = newId;
  }
  get page() {
    return this.page;
  }
  set page(newPage) {
    this.page = newPage;
  }
  async getPopularFilms() {
    const { data } = await axios.get(
      `/trending/movie/week?api_key=${this.#API_KEY}&page=${this.page}`
    );
    console.log(data);
    return data;
  }
  async getFilmByID() {
    const { data } = await axios.get(
      `/movie/${this.id}?api_key=${this.#API_KEY}`
    );
    console.log(data);
    return data;
  }
  async getFilmByQuery() {
    const { data } = await axios.get(
      `/search/movie?api_key=${this.#API_KEY}&query=${this.query}`
    );
    console.log(data);
    return data;
  }
}

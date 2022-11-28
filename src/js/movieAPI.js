import axios from 'axios';
const API_KEY = 'f9c0bb738fb5ed39704a871786e56353';
const TOKEN =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmOWMwYmI3MzhmYjVlZDM5NzA0YTg3MTc4NmU1NjM1MyIsInN1YiI6IjYzODRkZDQxMjI5YWUyMTU1NDI4NzZlZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MG5ERw-LsYYIi76z7VCjip-mCqVCLGAMh-W1Q30enAc';
axios.defaults.baseURL = 'https://api.themoviedb.org/3';

export async function getPopularFilms(page = 1) {
  const { data } = await axios.get(
    `/trending/movie/week?api_key=${API_KEY}&page=${page}`
  );
  console.log(data);
}
getPopularFilms();

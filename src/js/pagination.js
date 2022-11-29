import Pagination from 'tui-pagination';
import FilmApi from './movieAPI';

const container = document.getElementById('tui-pagination-container');
const instance = new Pagination(container, {
  totalItems: 10000,
  itemsPerPage: 10,
  visiblePages: 5,
  centerAlign: true
});
instance.getCurrentPage();
import { setLocalStorage, getLocalStorage } from './localStorage';

const toggleEl = document.querySelector('.theme-switch__toggle');
const MENU_STORAGE_KEY = 'menu-storage-key';

const onToggleChange = event => {
  const { checked } = event.target;
  document.body.className = checked ? 'dark-theme' : 'light-theme';
  setLocalStorage(MENU_STORAGE_KEY, checked);
};

const initPage = () => {
  const savedCheck = getLocalStorage(MENU_STORAGE_KEY);
  document.body.className = savedCheck ? 'dark-theme' : 'light-theme';
  toggleEl.checked = savedCheck ? true : false;
};

toggleEl.addEventListener('input', onToggleChange);
initPage();

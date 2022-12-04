import { setLocalStorage, getLocalStorage } from './localStorage';

const toggleEl = document.querySelector('.theme-switch__toggle');
const THEME_STORAGE_KEY = ' theme-storage-key';

const onToggleChange = event => {
  const { checked } = event.target;
  document.body.className = checked ? 'dark-theme' : 'light-theme';
  setLocalStorage(THEME_STORAGE_KEY, checked);
};

const initPage = () => {
  const savedCheck = getLocalStorage(THEME_STORAGE_KEY);
  document.body.className = savedCheck ? 'dark-theme' : 'light-theme';
  toggleEl.checked = savedCheck ? true : false;
};

toggleEl.addEventListener('input', onToggleChange);
initPage();

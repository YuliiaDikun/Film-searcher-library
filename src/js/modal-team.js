const openModal = document.querySelector('.js-team-link');

const modalWindow = document.querySelector('#js-modal');
const btnClose = document.querySelector('#modal-btn');
const modalTeam = document.querySelector('#js-modal-team');

const close = event => {
  if (event.code === 'Escape') {
    modalWindow.classList.add('is-hidden');
    document.body.style.overflow = 'auto';
    document.removeEventListener('keydown', close);
  }
};
const onModalWindow = event => {
  if (event.target === event.currentTarget) {
    modalWindow.classList.add('is-hidden');
    document.body.style.overflow = 'auto';
    document.removeEventListener('keydown', close);
    modalWindow.removeEventListener('click', onModalWindow);
  }
};

const onModalClick = event => {
  modalWindow.classList.remove('is-hidden');
  document.body.style.overflow = 'hidden';

  document.addEventListener('keydown', close);
  modalWindow.addEventListener('click', onModalWindow);
};

const onCloseBtn = () => {
  modalWindow.classList.add('is-hidden');
  document.body.style.overflow = 'auto';
  document.removeEventListener('keydown', close);
};

btnClose.addEventListener('click', onCloseBtn);
openModal.addEventListener('click', onModalClick);

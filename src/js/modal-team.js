const openModal = document.querySelector('.js-team-link');
const modalWindow = document.querySelector('#js-modal');
const btnClose = document.querySelector('#modal-btn');

const onTeamClick = event => {
  modalWindow.classList.remove('is-hidden');
};

openModal.addEventListener('click', onTeamClick);

const onCloseBtn = () => {
  modalWindow.classList.add('is-hidden');
};

btnClose.addEventListener('click', onCloseBtn);

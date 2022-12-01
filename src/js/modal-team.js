const openModal = document.querySelector('.js-team-link');
const modalWindow = document.querySelector('#js-modal')
const btnClose = document.querySelector('#modal-btn')
const modalTeam = document.querySelector('#js-modal-team')

const onModalClick = (event) => {
  modalWindow.classList.remove('visually-hidden');
  document.body.style.overflow = "hidden";

  document.addEventListener('keydown', event => {
    if (event.code === 'Escape') {
      modalWindow.classList.add('visually-hidden');
      document.body.style.overflow = "auto";
      document.removeEventListener('keydown', onModalClick);
    }
  });

    //   window.onclick = () => {
    //   console.log(event.target);
    //   if (event.target !== modalTeam) {
    //     modalWindow.classList.add('visually-hidden')
    //   };
    // };
};

openModal.addEventListener('click', onModalClick)



const onCloseBtn = () => {
  modalWindow.classList.add('visually-hidden');
  document.body.style.overflow = "auto";
  document.removeEventListener('keydown', onModalClick);
}

btnClose.addEventListener('click', onCloseBtn)





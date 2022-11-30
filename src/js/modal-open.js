const ulEl = document.querySelector('.films');
const modal = document.querySelector('.modal-backdrop');
const closeBtn = document.querySelector('.modal-close-btn');

ulEl.addEventListener('click', evt => {
  if (evt.target.nodeName === 'UL') {
    return;
  }
  modal.classList.remove('visually-hidden');
});

closeBtn.addEventListener('click', () => {
  modal.classList.add('visually-hidden');
});

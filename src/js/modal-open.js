const ulEl = document.querySelector('.films');
const modal = document.querySelector('.modal-backdrop');
const closeBtn = document.querySelector('.modal-close-btn');

ulEl.addEventListener('click', onFimlsListClick);

function onFimlsListClick(evt) {
  console.log(evt.target.nodeName);
  if (evt.target.nodeName === 'UL') {
    return;
  }

  modal.classList.remove('is-hidden');
}

closeBtn.addEventListener('click', () => {
  modal.classList.add('is-hidden');
});

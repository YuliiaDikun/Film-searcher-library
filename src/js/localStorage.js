// const watchedBnt = document.querySelector('.modal-button-watched');
// const queuedBnt = document.querySelector('.modal-button-queue');

// watchedBnt.addEventListener('click', () =>
//   onModalBtnClick('WAТСHED_KEY', 'hello')
// );
// queuedBnt.addEventListener('click', () =>
//   onModalBtnClick('QUEUE_KEY', 'hello')
// );

let watchedList = [];
let queueList = [];

function onModalBtnClick(key, value) {
  let savedArray = localStorage.getItem(key);
  savedArray = savedArray ? JSON.parse(savedArray) : [];
  if (savedArray.includes(value)) {
    return;
  } else {
    savedArray.push(value);
  }
  localStorage.setItem(key, JSON.stringify(savedArray));
}

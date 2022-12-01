const watchedBnt = document.querySelector('.modal-button-watched');
const queuedBnt = document.querySelector('.modal-button-queue');

watchedBnt.addEventListener('click', () =>
  onModalBtnClick('WAТСHED_KEY', 'hello')
);
queuedBnt.addEventListener('click', () =>
  onModalBtnClick('QUEUE_KEY', 'hello')
);

let watchedList = [];
let queueList = [];

// localStorage.setItem('WAТСHED_KEY', JSON.stringify(watchedList));
// localStorage.setItem('QUEUE_KEY', JSON.stringify(queueList));

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

// const saveInStorage = (key, value) => {
//   try {
//     const serializedState = JSON.stringify(value);
//     localStorage.setItem(key, serializedState);
//   } catch (error) {
//     console.error('Set state error: ', error.message);
//   }
// };

// const load = key => {
//   try {
//     const serializedState = localStorage.getItem(key);
//     return serializedState === null ? undefined : JSON.parse(serializedState);
//   } catch (error) {
//     console.error('Get state error: ', error.message);
//   }
// };

// export default {
//   save,
//   load,
// };

const watchedBnt = document.querySelector('.modal-button_watched');
const queuedBnt = document.querySelector('.modal-button_queue');

watchedBnt.addEventListener('click', () => onModalBtnClick('WAТСHED_KEY', id));
queuedBnt.addEventListener('click', () => onModalBtnClick('QUEUE_KEY', id));

const watchedList = [];
const queueList = [];

localStorage.setItem('WAТСHED_KEY', watchedList);
localStorage.setItem('QUEUE_KEY', queueList);

function onModalBtnClick(key, value) {
  const savedArray = localStorage.getItem(key);
  if (savedArray.includes(value)) {
    return;
  } else {
    value = savedArray.push(value);
  }
  localStorage.setItem(key, value);
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

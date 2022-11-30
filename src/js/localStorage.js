const WAТСHED_KEY = 'H';
const QUEUE_KEY = 'H';

const watchedBnt = document.querySelector('.modal-button_watched');
const queuedBnt = document.querySelector('.modal-button_queue');

watchedBnt.addEventListener('click', onWatchedBtnClick);
queuedBnt.addEventListener('click', onQueueBtnClick);

const watchedList = localStorage.getItem(WAТСHED_KEY);
const queueList = localStorage.getItem(QUEUE_KEY);

// const save = (key, value) => {
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

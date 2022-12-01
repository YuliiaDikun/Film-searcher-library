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

export function setLocalStorage(key, value) {
    try {
      const serializedState = JSON.stringify(value);
      localStorage.setItem(key, serializedState);
    } catch (error) {
      console.error('Set state error: ', error.message);
    }
  }
  
export function getLocalStorage(key) {
    try {
      const serializedState = localStorage.getItem(key);
      return serializedState ? JSON.parse(serializedState) : undefined;
    } catch (error) {
      console.error('Get state error: ', error.message);
    }
  }
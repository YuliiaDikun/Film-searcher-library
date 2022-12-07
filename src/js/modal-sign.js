import firestore from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/messaging';
import 'firebase/storage';

const singInEmailBnt = document.querySelector('.singInEmailBnt');
const openSignModalBtn = document.querySelector('.sing-btn');
const modalSignBackdrop = document.querySelector('.modal-sign-backdrop');

const openSignModal = () => {
  modalSignBackdrop.style.display = 'flex';
  openSignModalBtn.removeEventListener('click', openSignModal);
  modalSignBackdrop.addEventListener('click', closeSingModal);
  document.addEventListener('keydown', closeSingModal);
  singInEmailBnt.addEventListener('click', onsingInEmailBntClick);
};
openSignModalBtn.addEventListener('click', openSignModal);

const closeSingModal = event => {
  if (
    event.code === 'Escape' ||
    event.target.className == 'modal-sign-backdrop'
  )
    modalSignBackdrop.style.display = 'none';
  openSignModalBtn.addEventListener('click', openSignModal);
  //   modalSignBackdrop.removeEventListener('click', closeSingModal);
  //   document.removeEventListener('keydown', closeSingModal);
};

function onsingInEmailBntClick(event) {
  event.preventDefault();
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;
  authUserWithEmailAndPassword(email, password).then(token => {});
}
export function authUserWithEmailAndPassword(email, password) {
  const apiKey = 'AIzaSyAkvDQ6iF3wRHd3Zm0o5l-VTvkNOeKKXwk';
  return fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
    {
      method: 'POST',
      body: JSON.stringify({ email, password, returnSecureTocken: true }),
      headers: {},
    }
  )
    .then(response => response.json())
    .then(data => console.log(data));
}

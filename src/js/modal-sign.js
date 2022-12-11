const btn1 = document.querySelector('.btn_1');

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAkvDQ6iF3wRHd3Zm0o5l-VTvkNOeKKXwk',
  authDomain: 'movie-26873.firebaseapp.com',
  projectId: 'movie-26873',
  storageBucket: 'movie-26873.appspot.com',
  messagingSenderId: '926047790761',
  appId: '1:926047790761:web:9203dceeeffec26a94ebb8',
  measurementId: 'G-S7W7TJ4K47',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

btn1.addEventListener('click', event => {
  event.preventDefault();
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;
  createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      // Signed in
      const user = userCredential.user;
      alert('User created succesfully!');
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert('Error!');
      console.log(Error);
    });
});

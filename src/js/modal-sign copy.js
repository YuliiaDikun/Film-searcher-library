const btn1 = document.querySelector('.btn_1');

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { getDatabase, set, ref, update } from 'firebase/database';
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
const database = getDatabase(app);

btn1.addEventListener('click', e => {
  e.preventDefault();
  let email = document.querySelector('#email').value;
  let password = document.querySelector('#password').value;

  //sign up user
  createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      // Signed in
      const user = userCredential.user;
      // ... user.uid
      set(ref(database, 'users/' + user.uid), {
        email: email,
        password: password,
      })
        .then(() => {
          // Data saved successfully!
          alert('user created successfully');
        })
        .catch(error => {
          // The write failed...
          alert(error);
        });
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
      alert(errorMessage);
    });

  // log in user
  signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      // Signed in
      const user = userCredential.user;
      // ...

      // save log in details into real time database
      var lgDate = new Date();
      update(ref(database, 'users/' + user.uid), {
        last_login: lgDate,
      })
        .then(() => {
          // Data saved successfully!
          alert('user logged in successfully');
        })
        .catch(error => {
          // The write failed...
          alert(error);
        });
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
    });
  const signBtn = document.querySelector('.sing-text');
  signBtn.addEventListener('click', signOut);
  signOut(auth)
    .then(() => {
      // Sign-out successful.
    })
    .catch(error => {
      // An error happened.
    });
});

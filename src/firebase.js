import firebase from 'firebase/app';
import 'firebase/database';

var firebaseConfig = {
  apiKey: "AIzaSyBpw3tE6AJyaDq67EN3TSNLSYQCL-Ylxis",
  authDomain: "not-so-trivial-pursuit.firebaseapp.com",
  databaseURL: "https://not-so-trivial-pursuit.firebaseio.com",
  projectId: "not-so-trivial-pursuit",
  storageBucket: "",
  messagingSenderId: "657152516422",
  appId: "1:657152516422:web:57fd70d13c20a1e33e0547"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
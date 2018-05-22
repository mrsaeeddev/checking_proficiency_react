import * as firebase from 'firebase';

const prodConfig = {
  apiKey: "AIzaSyB2924y1RXrxSpLediJ3rDPyxnwue6laZE",
  authDomain: "peekaboo-guru-f8b71.firebaseapp.com",
  databaseURL: "https://peekaboo-guru-f8b71.firebaseio.com",
  projectId: "peekaboo-guru-f8b71",
  storageBucket: "peekaboo-guru-f8b71.appspot.com",
  messagingSenderId: "481781432314",
};

const devConfig = {
  apiKey: "AIzaSyB2924y1RXrxSpLediJ3rDPyxnwue6laZE",
  authDomain: "peekaboo-guru-f8b71.firebaseapp.com",
  databaseURL: "https://peekaboo-guru-f8b71.firebaseio.com",
  projectId: "peekaboo-guru-f8b71",
  storageBucket: "peekaboo-guru-f8b71.appspot.com",
  messagingSenderId: "481781432314",
};

const config = process.env.NODE_ENV === 'production'
  ? prodConfig
  : devConfig;

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const db = firebase.database();
const auth = firebase.auth();

export {
  db,
  auth,
};

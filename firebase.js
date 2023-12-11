
import firebase from 'firebase/app';
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAGDW5dJpssu_K5lt76lBlAJa0nNXX0918",
  authDomain: "cc-project-b6562.firebaseapp.com",
  projectId: "cc-project-b6562",
  storageBucket: "cc-project-b6562.appspot.com",
  messagingSenderId: "936537012002",
  appId: "1:936537012002:web:5121bb336e3ce552a1d77b",
  measurementId: "G-4XGW6SJ9KN"
};

let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
}
else {
  app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export { db, auth };
import firebase from "firebase";
import { removeItem, setLogin, setOffline } from "../modules/LocalDB";
import { goToForm, goToHome } from "../modules/Router";

firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
});

export const user = firebase.auth().currentUser;

export function handleSignOut() {
  firebase
    .auth()
    .signOut()
    .then(function () {
      removeItem("login");
      removeItem("offline");
      goToHome();
    })
    .catch(function () {
      // An error happened.
    });
}

export function googleSignIn(online) {
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      setLogin(result.user.uid);
      setOffline(online.toString());
      goToForm();
    })
    .catch((error) => {
      console.log(error);
    });
}

export function generalSignIn() {
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      setLogin(result.user.uid);
    })
    .catch((error) => {
      console.log(error);
    });
}

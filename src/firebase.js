import firebase from "firebase";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCmCvOgWehZgwLqN76OtYQpfcD1QLwG6q4",
  authDomain: "fm-live-29e10.firebaseapp.com",
  databaseURL: "https://fm-live-29e10.firebaseio.com",
  projectId: "fm-live-29e10",
  storageBucket: "",
  messagingSenderId: "529969028224",
  appId: "1:529969028224:web:8ec351de0a937349"
};

firebase.initializeApp(firebaseConfig);

window.firebase = firebase;

export const firestore = firebase.firestore();

const settings = { timestampsInSnapshots: true };
firestore.settings(settings);

export default firebase;

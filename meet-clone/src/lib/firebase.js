import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD8fBZI2jVdWHqD2C17dpjdWBJW3tPvW3s",
  authDomain: "meet-clone-c8c63.firebaseapp.com",
  projectId: "meet-clone-c8c63",
  storageBucket: "meet-clone-c8c63.appspot.com",
  messagingSenderId: "877559202278",
  appId: "1:877559202278:web:2edb06b97f4abd549ad627",
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

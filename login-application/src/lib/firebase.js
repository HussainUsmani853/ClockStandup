import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD1-Ui0w-PH2G8jnBaTMyyO2wIpSAO3urU",
  authDomain: "authentication-d2707.firebaseapp.com",
  projectId: "authentication-d2707",
  storageBucket: "authentication-d2707.appspot.com",
  messagingSenderId: "10480165522",
  appId: "1:10480165522:web:fa069211b35b91a0a7bc4b"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
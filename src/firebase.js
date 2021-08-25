import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyDKeTV_-rUSMEqWeRJWClEDBamwdVn8ySk",
  authDomain: "fir-chat-app-e6772.firebaseapp.com",
  projectId: "fir-chat-app-e6772",
  storageBucket: "fir-chat-app-e6772.appspot.com",
  messagingSenderId: "211013233716",
  appId: "1:211013233716:web:752d35369b679873deae61",
  measurementId: "G-FZMLXG7R5R",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//firebase.analytics();

export default firebase;

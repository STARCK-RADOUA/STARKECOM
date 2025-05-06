import firebase from "firebase/app";
import "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyA9l6UVccLJLLzspzv-ZoPNi4kCDOCHLac",
  authDomain: "ecomstark-d3df4.firebaseapp.com",
  projectId: "ecomstark-d3df4",
  storageBucket: "ecomstark-d3df4.appspot.com",
  messagingSenderId: "525940977520",
  appId: "1:525940977520:web:300a5284368bd9944329b5",
  measurementId: "G-4RS5GZ8W7G"
};

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();

export { firebase, storage };

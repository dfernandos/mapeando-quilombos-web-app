import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/analytics';


const firebaseConfig = {
    apiKey: "AIzaSyB1sPjMwxRuNeIJII40hjahe_hOsi9Pofg",
    authDomain: "mapeando--quilombos.firebaseapp.com",
    projectId: "mapeando--quilombos",
    storageBucket: "mapeando--quilombos.appspot.com",
    messagingSenderId: "76027542153",
    appId: "1:76027542153:web:d8cd4f8f49cf84859ce458",
    measurementId: "G-10RD7E30PR"
  };

  firebase.initializeApp(firebaseConfig);

  export const auth = firebase.auth();
  
  export default firebase;
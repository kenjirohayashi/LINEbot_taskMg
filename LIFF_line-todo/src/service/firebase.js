import firebase from 'firebase/compat/app';
import "firebase/compat/firestore";

firebase.initializeApp({
  apiKey:process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain:process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL:process.env.REACT_APP_FIREBASE_DATABASE,
  projectId:process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket:process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  senderId:process.env.REACT_APP_FIREBASE_SENDER_ID,
  appID:process.env.REACT_APP_FIREBASE_APP_ID,
  measurementID:process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
});




export const db = firebase.firestore();
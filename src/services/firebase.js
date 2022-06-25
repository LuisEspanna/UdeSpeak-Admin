import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/database';
import 'firebase/compat/auth';
import 'firebase/compat/messaging';
import { getAuth } from 'firebase/auth';

let firebaseConfig = {
  apiKey: `${process.env.REACT_APP_API_KEY}`,
  authDomain: `${process.env.REACT_APP_AUTH_DOMAIN}`,
  projectId: `${process.env.REACT_APP_PROJECT_ID}`,
  storageBucket: `${process.env.REACT_APP_STORAGE_BUCKET}`,
  messagingSenderId: `${process.env.REACT_APP_MESSAGING_SENDER_ID}`,
  appId: `${process.env.REACT_APP_APP_ID}`,
  measurementId: `${process.env.REACT_APP_MEASUREMENT_ID}`
};

const app = firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const rtdb = firebase.database();
const Auth = firebase.auth;
const auth = getAuth(app);

const sendFCM = async (data = {}) => {
  const body = {
    to: '/topics/all',
    data
  };

  const response = await fetch('https://fcm.googleapis.com/fcm/send', {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json; UTF-8',
      Authorization: `key=${firebaseConfig.serverKey}`
    }),
    body: JSON.stringify(body)
  });
  return response.json();
};

export {
  db,
  rtdb,
  Auth,
  sendFCM,
  auth
};

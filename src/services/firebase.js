import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/database';
import 'firebase/compat/auth';
import 'firebase/compat/storage';
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
const firestore = firebase.firestore;
const storage = firebase.storage();

/**
 * @param {string} collection 
 * @param {string} document 
 * @param {Object} data 
 * @returns 
 */
 const saveOnFirestore = async(collection, document, data) => {
  if(document)return  firestore().collection(collection).doc(document).set(data);
  else return firestore().collection(collection).add(data);
}

/**
* @param {string} collection 
* @param {string} document 
* @returns 
*/
const readFromFirestore = async(collection, document) => {
  if(document)return  firestore().collection(collection).doc(document).get();
  else return firestore().collection(collection).get();
}

/**
* 
* @param {string} collection
* @param {string} document
* @param {*} data 
*/
const updateFirestoreDoc = async(collection, document, data) => {
  if(document)return  firestore().collection(collection).doc(document).update(data);
}

/**
* 
* @param {string} collection
* @param {string} document
* @param {*} data 
*/
const incrementFieldValue = async(collection, document, value) => {
  const increment = firestore.FieldValue.increment(value);
  return firestore().collection(collection).doc(document).update({
     value : increment
  });
}


/**
 * @typedef { "==" | "!=" | "<" | "<=" | ">" | ">=" | "array-contains" | "in" | "not-in" | "array-contains-any"} Comparators
 * @param {string} collection
 * @param {string} document
 * @param {string} field 
 * @param {Comparators} comparator
 * @param {any} value 
 * @returns 
 */
const readFromFirestoreWhere = async(collection, document, field, comparator, value) => {
  if(document)return  firestore().collection(collection).doc(document).where(field, comparator, value).get();
  else return firestore().collection(collection).where(field, comparator, value).get();
}

/**
* @param {string} collection 
* @param {string} document 
* @returns 
*/
const deleteFromFirestore = async(collection, document) => {
  if(document)return  firestore().collection(collection).doc(document).delete();
  else return firestore().collection(collection).delete();
}

/**
* @param {string} route 
* @param {string} fileName 
* @param {File} file
* @returns 
*/
const saveFileOnFirebase = async(route, fileName, file) => {
  const ref = storage.ref(route+'/'+fileName);
  return ref.put(file).then(snapshot => {
    if(snapshot.state === 'success'){ 
      return storage.ref(snapshot.ref.fullPath).getDownloadURL();  
    } else {
      return null;
    }
  });
}

/**
* @param {string} fileURL
* @returns 
*/
const deleteFileFromFirebase = async(fileURL) => {
  const ref = storage.refFromURL(fileURL);
  return ref.delete();
}


const Auth = firebase.auth;
const auth = getAuth(app);


export {
  Auth,
  auth,
  firestore,
  saveOnFirestore,
  readFromFirestore,
  updateFirestoreDoc,
  incrementFieldValue,
  readFromFirestoreWhere,
  deleteFromFirestore,
  saveFileOnFirebase,
  deleteFileFromFirebase
};

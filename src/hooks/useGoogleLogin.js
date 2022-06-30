import { useEffect, useState } from 'react';
import { Auth, auth, db } from '../services/firebase';
import { useDispatch } from 'react-redux';
import {createUserWithEmailAndPassword}  from 'firebase/auth';
import { getUserDataFromResult } from '../services/functions'
import constants from '../config/constants.json'
import Swal from 'sweetalert2';

// Redyx actions
import { setUser } from '../state/reducers/userSlice';
import useUsers from '../hooks/useUsers';

export default function useGoogleLogin () {
  const [provider, setProvider] = useState(null);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const {getUser} = useUsers();
  const COLLECTION_USERS = constants.COLLECTION_USERS;

  useEffect(() => {
    setProvider(new Auth.GoogleAuthProvider());
    const uid = window.sessionStorage.getItem('uid');
    if ( uid ) {
      // Load info from db, automatically login
      readUserInfo(uid).then((user)=>{
        const newUser = {...user}
        newUser.isLogged = true;
        window.sessionStorage.setItem('uid', uid);
        dispatch(setUser(newUser));
      })
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const readUserInfo = async( uid ) => {
    const res = await getUser(uid);
    return res;
  };

  /**
   * Receive a next function that it will be executed
   * @param {function} next
   */
  const login = (next) => {
    Auth().signInWithPopup(provider)
      .then(result => {
        const uid = result?.user?.uid || '';
        readUserInfo(uid).then(userRes => {
          if(userRes !== undefined){
            console.log("Loading from database")
            const newUser = {...userRes}
            newUser.isLogged = true
            dispatch(setUser(newUser))
          }
          else{
            // Save on database
            const localUser = getUserDataFromResult(result?.user);
            console.log("Saving on database")
            const newUser = {...localUser};
            delete newUser['isLogged'];

            db.collection(COLLECTION_USERS).doc(localUser.uid).set(newUser).then(()=>{             
              dispatch(setUser(localUser));
            });
          }
        });
        window.sessionStorage.setItem('uid', uid);
      })
      .catch(err => {
        console.log(err);
      });
  };

  /**
   * Receive a next function that it will be executed
   * @param {function} next
   */
  const otherAccount = (next) => {
    provider.setCustomParameters({
      prompt: 'select_account'
    });
    Auth().signInWithPopup(provider)
      .then(result => {
        readUserInfo(result?.user?.uid || '');
      })
      .catch(err => {
        console.log(err);
        setError(err);
      });
  };

  /**
   * Receive a next function that it will be executed
   * @param {function} next
   */
  const logout = (next) => {
    return Auth().signOut()
      .then(result => {
        console.log('Bye');
        window.sessionStorage.clear();
        dispatch(setUser({
          isLogged:false,
          displayName:undefined,
          email:undefined,
          photoURL:undefined,
          uid:undefined
        }));
      });
  };

  const singUpWithEmailAndPassword = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password).catch((error)=>{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error
      });
    });
  };


  return {
    error,
    login,
    logout,
    otherAccount,
    singUpWithEmailAndPassword
  };
}
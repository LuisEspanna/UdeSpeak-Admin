import { useEffect, useState } from 'react';
import { Auth, auth } from '../services/firebase';
import { useDispatch } from 'react-redux';
import {createUserWithEmailAndPassword}  from 'firebase/auth';
import { getUserDataFromResult } from '../services/functions'
//import Swal from 'sweetalert2';

// Redyx actions
import { setUser } from '../state/reducers/userSlice';
import useUsers from '../hooks/useUsers';

export default function useGoogleLogin () {
  const [provider, setProvider] = useState(null);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const {getUser} = useUsers();

  useEffect(() => {
    setProvider(new Auth.GoogleAuthProvider());
    const uid = window.sessionStorage.getItem('uid');
    if ( uid ) readUserInfo(uid);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const readUserInfo = async( uid ) => {
    const res = await getUser(uid);
    console.log("useGoogleLogin", res, uid);
    return res;
    /*
    if (user?.admin) {
        dispatch(setUser(user));
        window.sessionStorage.setItem('uid', uid);
      } else {
        Swal.fire('No tiene permisos!', '', 'error');
        logout();
      }
    */
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
          if(userRes !== undefined)dispatch(setUser(userRes))
          else{
            // Save on database
            const localUser = getUserDataFromResult(result?.user);
            dispatch(setUser(localUser));
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
    Auth().signOut()
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

  const singUpWithEmailAndPassword = (email, password) => 
    createUserWithEmailAndPassword(auth, email, password);


  return {
    error,
    login,
    logout,
    otherAccount,
    singUpWithEmailAndPassword
  };
}

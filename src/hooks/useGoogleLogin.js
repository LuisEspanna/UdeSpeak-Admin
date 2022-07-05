import { useEffect, useState } from 'react';
import { Auth, auth, db } from '../services/firebase';
import { useDispatch } from 'react-redux';
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail}  from 'firebase/auth';
import { getUserDataFromResult } from '../services/functions'
import constants from '../config/constants.json'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

// Redyx actions
import { setUser } from '../state/reducers/userSlice';
import useUsers from '../hooks/useUsers';
import useDbCounters from './useDbCounters';

export default function useGoogleLogin () {
  const [provider, setProvider] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const {getUser} = useUsers();
  const COLLECTION_USERS = constants.COLLECTION_USERS;

  const navigate = useNavigate();
  const { incrementUsers } = useDbCounters();

  useEffect(() => {
    setProvider(new Auth.GoogleAuthProvider());
    const uid = window.sessionStorage.getItem('uid');
    if ( uid ) {
      // Load info from db, automatically login
      setIsLoading(true);
      readUserInfo(uid).then((user)=>{
        const newUser = {...user}
        newUser.isLogged = true;
        window.sessionStorage.setItem('uid', uid);
        dispatch(setUser(newUser));
      }).finally(()=>{
        setIsLoading(false);
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
  const googleLogin = (next) => {
    setIsLoading(true);
    Auth().signInWithPopup(provider)
      .then(result => {
        login(result?.user);
      })
      .catch(err => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error
        });
      }).finally(()=>{
        setIsLoading(false);
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
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error
        });
        setError(err);
      });
  };

  /**
   * Receive a next function that it will be executed
   * @param {function} next
   */
  const logout = (next) => {
    setIsLoading(true);
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
      })
      .finally(()=>{
        setIsLoading(false);
      });
  };

  const register = (email, password, displayName) => {
    setIsLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const user = result?.user;
        user.displayName=displayName;
        login(user);
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error
        });
      })
      .finally(()=>{
        setIsLoading(false);
      });
  };

  const loginWithEmailAndPassword = (email, password) => {
    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        login(result?.user);
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error
        });
      })
      .finally(()=>{
        setIsLoading(false);
      });
  };

  /**
   * 
   * @param {String} email 
   */
  const recoverAccount = (email) => {
    setIsLoading(true);
    sendPasswordResetEmail(auth, email)
      .then((result) => {
        Swal.fire({
          icon: 'success',
          title: 'Revisa tu correo: ',
          text: "El proceso finalizó correctamente, se envió un correo a " + email
        }).then(res => {
          if(res.isConfirmed || res.isDismissed){
            navigate("/", {replace: true})
          }
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error
        });
      })
      .finally(()=>{
        setIsLoading(false);
      });
  };

  /**
   * Function that receive a login result, save info in local storage and
   * set the info in the state and the db
   * @param {*} user 
   */
  const login = (user) => {
    const uid = user?.uid || '';
    readUserInfo(uid).then(userRes => {
      if (userRes !== undefined) {
        console.log("Loading from database")
        const newUser = { ...userRes }
        newUser.isLogged = true
        dispatch(setUser(newUser))
      }
      else {
        // Save on database
        const localUser = getUserDataFromResult(user);
        console.log("Saving on database")
        const newUser = { ...localUser };
        delete newUser['isLogged'];

        db.collection(COLLECTION_USERS).doc(localUser.uid).set(newUser).then(() => {
          dispatch(setUser(localUser));
          incrementUsers(1);
        });
      }
    });
    window.sessionStorage.setItem('uid', uid);
  };


  return {
    error,
    isLoading,
    googleLogin,
    logout,
    otherAccount,
    register,
    loginWithEmailAndPassword,
    recoverAccount
  };
}

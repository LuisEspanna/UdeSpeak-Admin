import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Auth, auth } from '../services/firebase';
import { createUserWithEmailAndPassword,
         signInWithEmailAndPassword,
         sendPasswordResetEmail }  from 'firebase/auth';
import { getUserDataFromResult } from '../services/functions';
import Swal from 'sweetalert2';

// Redux actions
import { setUser } from '../state/reducers/userSlice';
import useUsers from '../hooks/useUsers';
import useDbCounters from './useDbCounters';

export default function useGoogleLogin () {
  const [provider, setProvider] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { getUser, createUser } = useUsers();

  const navigate = useNavigate();
  const { incrementUsers } = useDbCounters();

  useEffect(() => {
    setProvider(new Auth.GoogleAuthProvider());
  }, [])
  

  const autoLogin = async () => {
    setTimeout(()=>{
      const uid = auth.currentUser?.uid;
      if(uid === null || uid === undefined ) return;
      setIsLoading(true);
      getUser(uid).then((user)=>{
        const newUser = {...user};
        newUser.isLogged = true;
        window.sessionStorage.setItem('uid', uid);
        dispatch(setUser(newUser));
      })
      .finally(()=>{
          setIsLoading(false);
      })
    }, 1000);
  }

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
  }

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
        getUser(result?.user?.uid || '');
      })
      .catch(err => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error
        });
        setError(err);
      });
  }

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
          uid:undefined,
          permission: undefined
        }));
      })
      .finally(()=>{
        setIsLoading(false);
      });
  }

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
  }

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
  }

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
            navigate("/", {replace: true});
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
  }

  /**
   * Function that receive a login result, save info in local storage and
   * set the info in the state and the db
   * @param {*} user 
   */
   const login = (user) => {   
    if(user?.uid !== null && user?.uid !== undefined){
      getUser(user?.uid).then(userRes => {
        if (userRes !== undefined) {
          console.log("Loading from database");
          const newUser = { ...userRes }
          newUser.isLogged = true;
          dispatch(setUser(newUser));
        }
        else {
          const localUser = getUserDataFromResult(user);
          console.log("Saving on database");
          const newUser = { ...localUser };
          delete newUser['isLogged'];

          createUser(newUser).then(()=>{
            dispatch(setUser(localUser));
            incrementUsers(1);
          });
        }
      });
    }
  }


  return {
    error,
    isLoading,
    googleLogin,
    logout,
    otherAccount,
    register,
    loginWithEmailAndPassword,
    recoverAccount,
    autoLogin
  };
}

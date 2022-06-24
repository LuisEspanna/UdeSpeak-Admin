import { useEffect, useState } from 'react';
import { auth } from '../services/firebase';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';

// Redyx actions
import { setUser } from '../state/reducers/userSlice';
import useUsers from '../hooks/useUsers';

export default function useGoogleLogin () {
  const [provider, setProvider] = useState(null);
  const dispatch = useDispatch();
  const {getUser} = useUsers();

  useEffect(() => {
    setProvider(new auth.GoogleAuthProvider());
    const uid = window.sessionStorage.getItem('uid');
    if ( uid ) readUserInfo(uid);
  }, []);

  const readUserInfo = async( uid ) => {

    const res = await getUser(uid);
    console.log("useGoogleLogin", res);
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
    auth().signInWithPopup(provider)
      .then(result => {
        readUserInfo(result?.user?.uid || '');
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
    auth().signInWithPopup(provider)
      .then(result => {
        readUserInfo(result?.user?.uid || '');
      })
      .catch(err => {
        console.log(err);
      });
  };

  /**
   * Receive a next function that it will be executed
   * @param {function} next
   */
  const logout = (next) => {
    auth().signOut()
      .then(result => {
        console.log('Bye');
        window.sessionStorage.clear();
        dispatch(setUser(null));
      });
  };

  return {
    login,
    logout,
    otherAccount
  };
}

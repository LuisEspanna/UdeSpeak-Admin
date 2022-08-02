import { COLLECTIONS } from '../constants'
import {
    readFromFirestore,
    saveOnFirestore,
    updateFirestoreDoc,
    readFromFirestoreWhere
} from '../services/firebase'

export default function useUsers() {

    const getAll = async() => {
        const snapshot = await readFromFirestore(COLLECTIONS.USERS);
        const localUsers = [];
        
        snapshot.forEach(doc => {
            const user = doc.data();
            localUsers.push(user);
        });

        return(localUsers);
    }

    const getUser = async(uid) => {
        const res = await readFromFirestore(COLLECTIONS.USERS, uid);
        return res.data();
    }

    const createUser = async(user) => {
        return await saveOnFirestore(COLLECTIONS.USERS, user.uid, user);
    }

    const editUser = async(user) => {
        return updateFirestoreDoc(COLLECTIONS.USERS, user.uid, user);
    }

    const deleteUser = (uid) => {
        console.log('Editing user' , uid);
    }

    const getUserPermissions = async(user) => {
        const res = await readFromFirestoreWhere(COLLECTIONS.ACCESS_KEYS, undefined, 'uid', '==', user.uid);
        return res;
    }

    return {
        getAll,
        getUser,
        createUser,
        editUser,
        deleteUser,
        getUserPermissions
    };
}

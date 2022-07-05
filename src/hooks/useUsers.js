import { COLLECTIONS } from '../constants'
import { db } from '../services/firebase'

export default function useUsers() {

    const getAll = async() => {
        const userRef = db.collection(COLLECTIONS.USERS);
        const snapshot = await userRef.get();
        const localUsers = [];
        
        snapshot.forEach(doc => {
            const user = doc.data();
            localUsers.push(user);
        });

        return(localUsers);
    }

    const getUser = async(uid) => {
        const userRef = db.collection(COLLECTIONS.USERS).doc(uid);
        const snapshot = await userRef.get();
        return snapshot.data();
    }

    const saveUser = (user) => {
        console.log('Saving user' , user)
    }

    const editUser = (user) => {
        const userRef = db.collection(COLLECTIONS.USERS).doc(user.uid);
        return userRef.update(user);
    }

    const deleteUser = (uid) => {
        console.log('Editing user' , uid)
    }    

    return {
        getAll,
        getUser,
        saveUser,
        editUser,
        deleteUser
    };
}

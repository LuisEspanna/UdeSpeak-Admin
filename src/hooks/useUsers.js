import { useState, useEffect } from 'react'
import constants from '../config/constants.json'
import {db} from '../services/firebase'

export default function useUsers() {
    const [users, setUsers] = useState([]);

    const getUsers = async() => {
        const userRef = db.collection(constants.COLLECTION_USERS);
        const snapshot = await userRef.get();
        const localUsers = [];
        
        snapshot.forEach(doc => {
            const user = doc.data();
            localUsers.push(user);
        });

        setUsers(localUsers);
    }

    useEffect(() => {
        getUsers();
    }, []);
    

    return {
        users
    };
}

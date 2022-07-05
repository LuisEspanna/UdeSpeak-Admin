import {useState, useEffect} from 'react'
import constants from '../config/constants.json'
import { db } from '../services/firebase'
import { increment } from 'firebase/firestore'

export default function useDbCounters() {

    const { COLLECTION_COUNTERS, COLLECTION_USERS, COLLECTION_LEVELS } = constants;
    const [counters, setCounters] = useState({});

    useEffect(() => {
        readCounters();
    }, [])// eslint-disable-line react-hooks/exhaustive-deps


    const readCounters = async() => {
        const ref = db.collection(COLLECTION_COUNTERS);
        const snapshot = await ref.get();
        const localCounters = {};
        
        snapshot.forEach((doc) => {
            const counter = doc.data();
            localCounters[doc.id] = (counter);
        });
        setCounters(localCounters);
    }

    const incrementUsers = (value) => {
        const ref = db.collection(COLLECTION_COUNTERS).doc(COLLECTION_USERS);
        return ref.update({
            value: increment(value)
        });
    }

    const incrementLevels = (value) => {
        const ref = db.collection(COLLECTION_COUNTERS).doc(COLLECTION_LEVELS);
        return ref.update({
            value: increment(value)
        });
    }

    return {
        counters,
        incrementUsers,
        incrementLevels
    }
}

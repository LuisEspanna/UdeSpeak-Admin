import { useState, useEffect } from 'react'
import { COLLECTIONS } from '../constants'
import { db } from '../services/firebase'
import { increment } from 'firebase/firestore'

export default function useDbCounters() {

    const [counters, setCounters] = useState({});

    useEffect(() => {
        readCounters();
    }, [])// eslint-disable-line react-hooks/exhaustive-deps


    const readCounters = async() => {
        const ref = db.collection(COLLECTIONS.COUNTERS);
        const snapshot = await ref.get();
        const localCounters = {};
        
        snapshot.forEach((doc) => {
            const counter = doc.data();
            localCounters[doc.id] = (counter);
        });
        setCounters(localCounters);
    }

    const incrementUsers = (value) => {
        const ref = db.collection(COLLECTIONS.COUNTERS).doc(COLLECTIONS.USERS);
        return ref.update({
            value: increment(value)
        });
    }

    const incrementLevels = (value) => {
        const ref = db.collection(COLLECTIONS.COUNTERS).doc(COLLECTIONS.LEVELS);
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

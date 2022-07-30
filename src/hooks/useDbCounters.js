import { useState, useEffect } from 'react';
import { COLLECTIONS } from '../constants';
import { incrementFieldValue, readFromFirestore } from '../services/firebase';


export default function useDbCounters() {

    const [counters, setCounters] = useState({});

    useEffect(() => {
        readCounters();
    }, [])// eslint-disable-line react-hooks/exhaustive-deps


    const readCounters = async() => {
        const snapshot = await readFromFirestore(COLLECTIONS.COUNTERS);
        const localCounters = {};
        
        snapshot.forEach((doc) => {
            const counter = doc.data();
            localCounters[doc.id] = (counter);
        });

        setCounters(localCounters);
    }

    const incrementUsers = (value) => {
        incrementFieldValue(COLLECTIONS.COUNTERS, COLLECTIONS.USERS, value);
    }


    const incrementLevels = (value) => {
        incrementFieldValue(COLLECTIONS.COUNTERS, COLLECTIONS.LEVELS, value);
    }
    
    return {
        counters,
        incrementUsers,
        incrementLevels
    }
}

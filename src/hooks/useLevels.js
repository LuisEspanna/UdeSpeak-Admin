import { COLLECTIONS } from '../constants'
import {
    readFromFirestore,
    saveOnFirestore,
    updateFirestoreDoc,
} from '../services/firebase'

export default function useLevels() {

    const getAll = async() => {
        const snapshot = await readFromFirestore(COLLECTIONS.LEVELS);
        const locallevels = [];
        
        snapshot.forEach(doc => {
            const item = {...doc.data()};
            item.id = doc.id;
            locallevels.push(item);
        });

        return(locallevels);
    }

    const createLevel = async(level) => {
        return await saveOnFirestore(COLLECTIONS.LEVELS, level);
    }

    const editLevel = async(level) => {
        return updateFirestoreDoc(COLLECTIONS.LEVELS, level.id, level);
    }

    const deleteLevel = (id) => {
        console.log('Deleting level' , id);
    }

    return {
        getAll,
        createLevel,
        editLevel,
        deleteLevel,
    };
}

import { COLLECTIONS } from '../constants'
import {
    saveOnFirestore,
    updateFirestoreDoc,
    readFromFirestoreWhere,
    deleteFromFirestore
} from '../services/firebase';


export default function useLevels(language_id) {

    const getAll = async() => {
        const snapshot = await readFromFirestoreWhere(COLLECTIONS.LEVELS, null, 'language_id', '==', language_id);
        const locallevels = [];
        
        snapshot.forEach(doc => {
            const item = {...doc.data()};
            item.id = doc.id;
            locallevels.push(item);
        });

        return(locallevels);
    }

    const createLevel = (level) => {
        return  saveOnFirestore(COLLECTIONS.LEVELS, null, {...level, language_id});
    }

    const editLevel = (level) => {
        const newLevel = {...level};
        delete newLevel['id'];
        return updateFirestoreDoc(COLLECTIONS.LEVELS, level.id, newLevel);
    }

    const deleteLevel = async(item) => {
        let isDeleted = false;
        const snapshot = await readFromFirestoreWhere(COLLECTIONS.GROUPS, null, 'level_id', '==', item.id)
        
        if(snapshot.docs.length === 0){
            await deleteFromFirestore(COLLECTIONS.LEVELS, item.id);
            isDeleted = true;
        }

        return isDeleted;
    }

    return {
        getAll,
        createLevel,
        editLevel,
        deleteLevel,
    };
}

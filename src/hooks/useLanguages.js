import { COLLECTIONS } from '../constants'
import {
    readFromFirestore,
    saveOnFirestore,
    updateFirestoreDoc,
} from '../services/firebase'

export default function useLanguages() {

    const getAll = async() => {
        const snapshot = await readFromFirestore(COLLECTIONS.LANGUAGES);
        const localLanguages = [];
        
        snapshot.forEach(doc => {
            const item = {...doc.data()};
            item.id = doc.id;
            localLanguages.push(item);
        });

        return(localLanguages);
    }

    const createLanguage = async(language) => {
        const newData = {
            ...language,
            created_at: new Date().getTime()
        }
        return await saveOnFirestore(COLLECTIONS.LANGUAGES, newData);
    }

    const editLanguage = async(language) => {
        const newData = {
            ...language,
            edited_at: new Date().getTime()
        }
        return updateFirestoreDoc(COLLECTIONS.LANGUAGES, newData.id, newData);
    }

    const deleteLanguage = (id) => {
        console.log('Deleting Language' , id);
    }

    return {
        getAll,
        createLanguage,
        editLanguage,
        deleteLanguage,
    };
}

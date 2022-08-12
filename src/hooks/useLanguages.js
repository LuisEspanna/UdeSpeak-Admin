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
        return await saveOnFirestore(COLLECTIONS.LANGUAGES, language);
    }

    const editLanguage = async(language) => {
        return updateFirestoreDoc(COLLECTIONS.LANGUAGES, language.id, language);
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

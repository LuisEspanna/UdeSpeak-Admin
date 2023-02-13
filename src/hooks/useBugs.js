import { COLLECTIONS } from '../constants'
import {
    saveOnFirestore,
    updateFirestoreDoc,
    readFromFirestore,
    deleteFromFirestore
} from '../services/firebase';
import {  } from '../functions';


export default function useBugs() {

    const getAll = async() => {
        const items = [];
        let snapshot;

        snapshot = await readFromFirestore(COLLECTIONS.BUGS);
        snapshot?.forEach(doc => {
            const item = {...doc.data()};
            item.id = doc.id;
            items.push(item);
        });

        return(items);
    }

    const getBug = async(id) => {
        let snapshot;
        snapshot = await readFromFirestore(COLLECTIONS.BUGS, id);
        const question = snapshot.data();

        return(question);
    }

    const createBug = (bug) => {
        return saveOnFirestore(COLLECTIONS.BUGS, null,
        {
            ...bug
        });
    }

    const editBug = (item) => {
        const newItem = {...item};
        delete newItem['id'];
        return updateFirestoreDoc(COLLECTIONS.BUGS, item.id, newItem);
    }

    const deleteBug = async(item) => {
        //TODO: Validar si hay archivos guardados
        await deleteFromFirestore(COLLECTIONS.BUGS, item.id);
        return true;
    }

    return {
        getAll,
        createBug,
        editBug,
        deleteBug,
        getBug
    };
}
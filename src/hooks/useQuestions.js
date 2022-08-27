import { COLLECTIONS } from '../constants'
import {
    saveOnFirestore,
    updateFirestoreDoc,
    readFromFirestoreWhere,
    //deleteFromFirestore
} from '../services/firebase';
import {  } from '../functions';


export default function useGroups(questionnary_id) {

    const getAll = async() => {
        const items = [];
        let snapshot;

        snapshot = await readFromFirestoreWhere(COLLECTIONS.QUESTIONNARIES, null, 'questionnary_id', '==', questionnary_id);
        snapshot?.forEach(doc => {
            const item = {...doc.data()};
            item.id = doc.id;
            items.push(item);
        });

        return(items);
    }

    const createQuestion = (group) => {
        return saveOnFirestore(COLLECTIONS.QUESTIONNARIES, null,
        {
            ...group,
            questionnary_id
        });
    }

    const editQuestion = (group) => {
        const newGroup = {...group};
        delete newGroup['id'];
        return updateFirestoreDoc(COLLECTIONS.QUESTIONNARIES, group.id, newGroup);
    }

    const deleteQuestion = async(item) => {
        /*
        let isDeleted = false;
        const snapshot = await readFromFirestoreWhere(COLLECTIONS.QUESTIONS, null, 'questionnary_id', '==', item.id);
        
        if(snapshot.docs.length === 0){
            await deleteFromFirestore(COLLECTIONS.QUESTIONNARIES, item.id);
            isDeleted = true;
        }

        return isDeleted;*/
    }

    return {
        getAll,
        createQuestion,
        editQuestion,
        deleteQuestion,
    };
}
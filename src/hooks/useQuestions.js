import { COLLECTIONS } from '../constants'
import {
    saveOnFirestore,
    updateFirestoreDoc,
    readFromFirestoreWhere,
    readFromFirestore,
    deleteFromFirestore
} from '../services/firebase';
import {  } from '../functions';


export default function useQuestions(questionnary_id) {

    const getAll = async() => {
        const items = [];
        let snapshot;

        snapshot = await readFromFirestoreWhere(COLLECTIONS.QUESTIONS, null, 'questionnary_id', '==', questionnary_id);
        snapshot?.forEach(doc => {
            const item = {...doc.data()};
            item.id = doc.id;
            items.push(item);
        });

        return(items);
    }

    const getQuestion = async(id) => {
        let snapshot;
        snapshot = await readFromFirestore(COLLECTIONS.QUESTIONS, id);
        const question = snapshot.data();

        return(question);
    }

    const createQuestion = (group) => {
        return saveOnFirestore(COLLECTIONS.QUESTIONS, null,
        {
            ...group,
            questionnary_id
        });
    }

    const editQuestion = (group) => {
        const newGroup = {...group};
        delete newGroup['id'];
        return updateFirestoreDoc(COLLECTIONS.QUESTIONS, group.id, newGroup);
    }

    const deleteQuestion = async(item) => {        
        await deleteFromFirestore(COLLECTIONS.QUESTIONS, item.id);
        return true;
    }

    return {
        getAll,
        createQuestion,
        editQuestion,
        deleteQuestion,
        getQuestion
    };
}
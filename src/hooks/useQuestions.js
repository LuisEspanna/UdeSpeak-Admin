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

    const getQuestionsById = async(id) => {
        const items = [];
        let snapshot;

        snapshot = await readFromFirestoreWhere(COLLECTIONS.QUESTIONS, null, 'questionnary_id', '==', id);
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

    const editQuestion = (item) => {
        const newQuestion = {...item};
        delete newQuestion['id'];
        return updateFirestoreDoc(COLLECTIONS.QUESTIONS, item.id, newQuestion);
    }

    const deleteQuestion = async(item) => {
        //TODO: Validar si hay archivos guardados
        await deleteFromFirestore(COLLECTIONS.QUESTIONS, item.id);
        return true;
    }

    return {
        getAll,
        createQuestion,
        editQuestion,
        deleteQuestion,
        getQuestion,
        getQuestionsById
    };
}
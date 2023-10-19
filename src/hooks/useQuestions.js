import { COLLECTIONS } from '../constants'
import {
    saveOnFirestore,
    updateFirestoreDoc,
    readFromFirestoreWhere,
    readFromFirestore,
    deleteFromFirestore,
    deleteFileFromFirebase
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

    const createQuestion = (data) => {
        return saveOnFirestore(COLLECTIONS.QUESTIONS, null,
        {
            ...data,
            questionnary_id,
            created_at: new Date().getTime()
        });
    }

    const editQuestion = (item) => {
        const newQuestion = {
            ...item,
            edited_at: new Date().getTime()
        };
        delete newQuestion['id'];
        return updateFirestoreDoc(COLLECTIONS.QUESTIONS, item.id, newQuestion);
    }

    const editQuestionById = (id, item) => {
        const newQuestion = {
            ...item,
            edited_at: new Date().getTime()
        };
        return updateFirestoreDoc(COLLECTIONS.QUESTIONS, id, newQuestion);
    }

    const deleteQuestion = async(item) => {
        if (item?.audio && typeof (item?.audio) === 'string') {
            deleteFileFromFirebase(item?.audio);
        }

        if (item?.image && typeof (item?.image) === 'string') {
            deleteFileFromFirebase(item?.image);
        }

        await deleteFromFirestore(COLLECTIONS.QUESTIONS, item.id);
        return true;
    }

    return {
        getAll,
        createQuestion,
        editQuestion,
        deleteQuestion,
        getQuestion,
        getQuestionsById,
        editQuestionById
    };
}
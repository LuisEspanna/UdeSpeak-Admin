import { COLLECTIONS } from '../constants'
import {
    saveOnFirestore,
    updateFirestoreDoc,
    readFromFirestoreWhere,
    deleteFromFirestore
} from '../services/firebase';
import {  } from '../functions';


export default function useGroups(group_id) {

    const getAll = async() => {
        const items = [];
        let snapshot;

        snapshot = await readFromFirestoreWhere(COLLECTIONS.QUESTIONNARIES, null, 'group_id', '==', group_id);
        snapshot?.forEach(doc => {
            const item = {...doc.data()};
            item.id = doc.id;
            items.push(item);
        });

        return(items);
    }

    const createGroup = (group) => {
        return saveOnFirestore(COLLECTIONS.QUESTIONNARIES, null,
        {
            ...group,
            group_id
        });
    }

    const editGroup = (group) => {
        const newGroup = {...group};
        delete newGroup['id'];
        return updateFirestoreDoc(COLLECTIONS.QUESTIONNARIES, group.id, newGroup);
    }

    const deleteGroup = async(item) => {
        let isDeleted = false;
        const snapshot = await readFromFirestoreWhere(COLLECTIONS.QUESTIONNARIES, null, 'group_id', '==', item.id);
        
        if(snapshot.docs.length === 0){
            await deleteFromFirestore(COLLECTIONS.QUESTIONNARIES, item.id);
            isDeleted = true;
        }

        return isDeleted;
    }

    return {
        getAll,
        createGroup,
        editGroup,
        deleteGroup,
    };
}

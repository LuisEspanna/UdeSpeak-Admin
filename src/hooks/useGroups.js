import { COLLECTIONS } from '../constants'
import {
    saveOnFirestore,
    updateFirestoreDoc,
    readFromFirestoreWhere,
    deleteFromFirestore,
    firestore
} from '../services/firebase';
import usePermissions from './usePermissions';
import {  } from '../functions';


export default function useGroups(level_id) {

    const { isAdmin, isTeacher, user } = usePermissions();

    const getAll = async() => {
        const items = [];
        let snapshot;

        if(isAdmin){
            snapshot = await readFromFirestoreWhere(COLLECTIONS.GROUPS, null, 'level_id', '==', level_id);
            snapshot?.forEach(doc => {
                const item = {...doc.data()};
                item.id = doc.id;
                items.push(item);
            });
        }

        if(isTeacher){
            snapshot = await firestore().collection(COLLECTIONS.GROUPS).where('level_id', '==', level_id)
            .where('user_id', '==', user.uid).get();

            snapshot?.forEach(doc => {
                const item = {...doc.data()};
                item.id = doc.id;
                items.push(item);
            });
        }

        return(items);
    }

    const getMyGroups = async() => {
        const items = [];
        let snapshot = await firestore().collection(COLLECTIONS.GROUPS)
        .where('user_id', '==', user.uid).get();

        snapshot?.forEach(doc => {
            const item = {...doc.data()};
            item.id = doc.id;
            items.push(item);
        });

        return(items);
    }

    const createGroup = (group) => {
        return saveOnFirestore(COLLECTIONS.GROUPS, null,
        {
            ...group,
            level_id
        });
    }

    const editGroup = (group) => {
        const newGroup = {...group};
        delete newGroup['id'];
        return updateFirestoreDoc(COLLECTIONS.GROUPS, group.id, newGroup);
    }

    const deleteGroup = async(item) => {
        let isDeleted = false;
        const snapshot = await readFromFirestoreWhere(COLLECTIONS.QUESTIONNARIES, null, 'group_id', '==', item.id);
        
        if(snapshot.docs.length === 0){
            await deleteFromFirestore(COLLECTIONS.GROUPS, item.id);
            isDeleted = true;
        }

        return isDeleted;
    }

    return {
        getAll,
        createGroup,
        editGroup,
        deleteGroup,
        getMyGroups
    };
}

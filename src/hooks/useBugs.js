import { COLLECTIONS, STORAGE } from '../constants'
import { idGenerator } from '../functions';
import {
    saveOnFirestore,
    readFromFirestore,
    readFromFirestoreWhere,
    deleteFromFirestore,
    deleteFileFromFirebase,
    saveFileOnFirebase
} from '../services/firebase';
import usePermissions from './usePermissions';



export default function useQuestions() {
    const { user } = usePermissions();

    const getAll = async () => {
        const items = [];
        let snapshot;

        snapshot = await readFromFirestore(COLLECTIONS.BUGS, null);
        snapshot?.forEach(doc => {
            const item = { ...doc.data() };
            item.id = doc.id;
            items.push(item);
        });

        return (items);
    }

    const getMyBugs = async () => {
        const items = [];
        let snapshot;

        snapshot = await readFromFirestoreWhere(COLLECTIONS.BUGS, null, 'uid', '==', user?.uid,);
        snapshot?.forEach(doc => {
            const item = { ...doc.data() };
            item.id = doc.id;
            items.push(item);
        });

        return (items);
    }

    const createBug = async (data) => {
        let newBug = {
            ...data,
            uid: (user.uid),
            created_at: new Date().getTime()
        };

        if (data?.image && typeof (data?.image) === 'object') {
            const imageName = idGenerator(20);
            const downloadURL = await saveFileOnFirebase(STORAGE.BUGS, imageName, data?.image);

            if (downloadURL !== null) {
                newBug = { ...newBug, image: downloadURL };
            }
        }

        if(newBug.image === undefined) delete newBug['image'];

        const res = await saveOnFirestore(COLLECTIONS.BUGS, null, newBug);
        newBug.id = res.id;

        return newBug;
    }

    const deleteBug = async (item) => {
        if (item?.image && typeof (item?.image) === 'string') {
            deleteFileFromFirebase(item?.image);
        }

        await deleteFromFirestore(COLLECTIONS.BUGS, item.id);
        return true;
    }

    return {
        getAll,
        getMyBugs,
        createBug,
        deleteBug
    };
}
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useBugs from '../../../hooks/useBugs';
import {
    saveFileOnFirebase,
    //saveOnFirestore,
    //updateFirestoreDoc,
    //deleteFromFirestore,
    deleteFileFromFirebase,
    //readFromFirestoreWhere
} from '../../../services/firebase';
import { STORAGE } from '../../../constants';
import { idGenerator } from '../../../functions';

export default function useBugsView() {
    const [state, setState] = useState();
    const [image, setImage] = useState(undefined);
    const {
        getAll,
        createBug,
        deleteBug,
        editBug
    } = useBugs();
    
    const [isLoading, setIsLoading] = useState(false);
    const [isEdited, setIsEdited] = useState(false);
    const [bugs, setBugs] = useState(false);

    useEffect(() => {        
        async function fetchItems() {
            setIsLoading(true);
            const localquestionnaries = await getAll();
            setBugs(localquestionnaries);
            setIsLoading(false);
        }
        fetchItems();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const handleCreateBug = () => {
        createBug();
    }

    const handleImage = (e) => {
        if (state?.image && typeof (state?.image) === 'string') {
            //Delete from db
            setIsLoading(true);
            deleteFileFromFirebase(state?.image).then(() => {
                const newBug = { ...state, image: null };

                editBug(newBug).then(() => {
                    setState(newBug);
                    setImage(undefined);
                    setIsLoading(false);
                });
            });
        }

        if (e.target?.files) {
            setImage(e.target?.files[0]);
        } else {
            setImage(undefined);
        }
        setIsEdited(true);
    }


    const saveImage = () => {
        const imageName = idGenerator(20);
        saveFileOnFirebase(STORAGE.QUESTION, imageName, image).then((downloadURL) => {
            if (downloadURL !== null) {
                const newBug = { ...state, image: downloadURL };
                setIsLoading(true);
                editBug(newBug).then(() => {
                    setState(newBug);
                    setImage(downloadURL);
                    setIsLoading(false);
                    setIsEdited(false);

                    if (!typeof (audio) === 'object') {
                        Swal.fire(
                            'OK',
                            'Cambios aguardados',
                            'success'
                        )
                    }
                });
            };
        });
    }

    return {
        state,
        image,
        isLoading,
        isEdited,
        bugs,
        deleteBug,
        handleImage,
        handleCreateBug,
        saveImage
    }
}

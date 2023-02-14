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
    const [state, setState] = useState({description: '', date: new Date()});
    const [image, setImage] = useState(undefined);
    const {
        getAll,
        createBug,
        deleteBug,
        editBug
    } = useBugs();
    
    const [isLoading, setIsLoading] = useState(false);
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

    const handleChange = (e) => {
        setState({...state, [e.target.name]: e.target.value});
    }

    const handleCreateBug = () => {
        /*
        TODO: subir cambios a firebase 

        const imageName = idGenerator(20);
        saveFileOnFirebase(STORAGE.BUGS, imageName, image).then((downloadURL) => {
            if (downloadURL !== null) {
                const newBug = { ...state, image: downloadURL };
                setIsLoading(true);
                editBug(newBug).then(() => {
                    setState(newBug);
                    setImage(downloadURL);
                    setIsLoading(false);
                });
            };
        });


        createBug({...state, date: new Date()}).finally(
            Swal.fire(
                'OK',
                'Cambios guardados',
                'success'
            )
        );
        */
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

        if (e?.target?.files) {
            setImage(e.target?.files[0]);
        } else {
            setImage(undefined);
        }
    }

    const handleDeleteBug = (item) => {
        deleteBug(item);
        setIsLoading(true);
    }

    return {
        state,
        image,
        isLoading,
        bugs,
        handleDeleteBug,
        handleImage,
        handleCreateBug,
        handleChange
    }
}

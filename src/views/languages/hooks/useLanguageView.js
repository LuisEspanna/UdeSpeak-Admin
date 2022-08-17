import { useEffect, useState } from 'react';
import { COLLECTIONS, STORAGE } from '../../../constants';
import { idGenerator } from '../../../functions';
import useLanguages from '../../../hooks/useLanguages';
import { saveFileOnFirebase,
    saveOnFirestore, 
    updateFirestoreDoc,
    deleteFromFirestore,
    deleteFileFromFirebase
} from '../../../services/firebase';


export default function useLanguageView() {
    const [languages, setLanguages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isCreating, setIsCreating] = useState(false);

    const { getAll } = useLanguages();

    useEffect(() => {        
        async function fetchLanguages() {
            setIsLoading(true);
            const localLanguages = await getAll();
            setLanguages(localLanguages);
            setIsLoading(false);
        }
        fetchLanguages();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const handleDelete = (item) => {
        //TODO: Agregar barra de carga
        deleteFromFirestore(STORAGE.LANGUAGES, item.id).then(()=>{
            setLanguages(languages.filter((language)=>language.id !== item.id));
            if(item.image && typeof(item.image) === 'string' && item.image.length)
                deleteFileFromFirebase(item.image);
        });
    }

    const handleCreate = () => {
        setIsCreating(!isCreating);
    }

    const handleSave = (item) => {
        //TODO: Agregar barra de carga
        //New language
        const imageName = idGenerator(20);

        if(item?.id === null || item?.id === undefined){
            if(typeof(item.image) === 'object'){
                //TODO Validate if not exist                
                saveFileOnFirebase(STORAGE.LANGUAGES, imageName, item.image).then((downloadURL)=> {
                    if(downloadURL !== null){
                        const newLanguage = {...item, image: downloadURL};
                        saveOnFirestore(COLLECTIONS.LANGUAGES, null, newLanguage).then((res)=>{
                            setLanguages([...languages, {...newLanguage, id: res.id}]);
                        });
                    };     
                })
            }
        } 
        //Editing language
        else {
            if(item.prevImage && typeof(item.prevImage)==='string') {
                deleteFileFromFirebase(item.prevImage);
                saveFileOnFirebase(STORAGE.LANGUAGES, imageName, item.image).then((downloadURL)=> {
                    if(downloadURL !== null){
                        const newItem = {...item, image: downloadURL};
                        delete newItem['id'];
                        delete newItem['prevImage'];
                        updateFirestoreDoc(STORAGE.LANGUAGES, item.id, newItem).then(()=>{
                            const index = languages.findIndex((language) => language.id === item.id);
                            setLanguages(
                                [...languages.slice(0, index), 
                                {...newItem, id: item.id},
                                ...languages.slice(index + 1)]
                            );
                        });
                    };
                })
            } else {
                const newItem = {...item};
                delete newItem['id'];
                updateFirestoreDoc(STORAGE.LANGUAGES, item.id, newItem).then(()=>{
                    const index = languages.findIndex((language) => language.id === item.id);
                    setLanguages(
                        [...languages.slice(0, index),
                        {...newItem, id: item.id},
                        ...languages.slice(index + 1)
                    ]);
                });
            }
        }
        setIsCreating(false);
    }


    return {
        languages,
        isLoading,
        isCreating,        
        handleCreate,
        handleSave,
        handleDelete,
    }
}

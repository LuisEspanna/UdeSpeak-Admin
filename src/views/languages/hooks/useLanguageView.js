import { useEffect, useState } from 'react';
import { COLLECTIONS, STORAGE } from '../../../constants';
import { idGenerator } from '../../../functions';
import useLanguages from '../../../hooks/useLanguages';
import { saveFileOnFirebase, saveOnFirestore } from '../../../services/firebase';


export default function useLanguageView() {
    const [languages, setLanguages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const [currentLanguage, setCurrentLanguage] = useState(undefined);

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


    const handleEdit = (index) => {
        setCurrentLanguage(languages[index]);
    }

    const handleCreate = () => {
        setIsCreating(true);
    }

    const handleSave = (item) => {
        //New language
        if(item?.id === null || item?.id === undefined){
            if(typeof(item.image) === 'object'){
                const imageName = idGenerator(20);
                saveFileOnFirebase(STORAGE.LANGUAGES, imageName, item.image).then((downloadURL)=> {
                    if(downloadURL !== null){
                        const newLanguage = {...item, image: downloadURL};
                        saveOnFirestore(COLLECTIONS.LANGUAGES, null, newLanguage).then(()=>{
                            console.log('Saved!')
                        });
                    };     
                })
            }
        }
    }


    return {
        languages,
        isLoading,
        currentLanguage,
        isCreating,
        handleEdit,
        handleCreate,
        handleSave
    }
}

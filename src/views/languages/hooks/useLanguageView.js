import { useEffect, useState } from 'react';
import { COLLECTIONS, STORAGE } from '../../../constants';
import { idGenerator } from '../../../functions';
import useLanguages from '../../../hooks/useLanguages';
import { saveFileOnFirebase, saveOnFirestore
    , updateFirestoreDoc
} from '../../../services/firebase';


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
        const imageName = idGenerator(20);

        if(item?.id === null || item?.id === undefined){
            if(typeof(item.image) === 'object'){
                //TODO Validate if not exist                
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
        //Editing language
        else {
            console.log(item);
            if(item.prevImage) {
                //TODO: Deleting previus image
                // Save on firestore
                saveFileOnFirebase(STORAGE.LANGUAGES, imageName, item.image).then((downloadURL)=> {
                    if(downloadURL !== null){
                        const newItem = {...item, image: downloadURL};
                        delete newItem['id'];
                        delete newItem['prevImage'];
                        updateFirestoreDoc(STORAGE.LANGUAGES, item.id, newItem).then(()=>{
                            const index = languages.findIndex((language) => language.id === item.id);
                            setLanguages([...languages.slice(0, index), {...newItem, id: item.id}, ...languages.slice(index + 1)]);
                            console.log('Updated!');
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

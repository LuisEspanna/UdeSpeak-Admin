import { useEffect, useState } from 'react';
import { COLLECTIONS, STORAGE, ROUTES } from '../../../constants';
import { idGenerator } from '../../../functions';
import useLanguages from '../../../hooks/useLanguages';
import { saveFileOnFirebase,
    saveOnFirestore, 
    updateFirestoreDoc,
    deleteFromFirestore,
    deleteFileFromFirebase,
    readFromFirestoreWhere
} from '../../../services/firebase';
import Swal from 'sweetalert2';
import useMyNavigation from '../../../hooks/useMyNavigation';
import useOnClickOutside from '../../../hooks/useOnClickOutside';
import { useDashboard } from '../../../context/dashboard-context';
import useGenericSearch from '../../../hooks/useGenericSearch';


export default function useLanguageView(ref) {
    const [languages, setLanguages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isCreating, setIsCreating] = useState(false);

    const { getAll } = useLanguages();
    const { navigateTo } = useMyNavigation();
    const { setSearchAction } = useDashboard();
    const { results, search, setItems } = useGenericSearch();

    useOnClickOutside(ref, (event)=>{
        if(event.target.placeholder === 'Search'){
            setSearchAction({function : (e) => search(e)});
        }
    });

    useEffect(() => {        
        async function fetchLanguages() {
            setIsLoading(true);
            const localLanguages = await getAll();
            setLanguages(localLanguages);
            setIsLoading(false);
            setItems(localLanguages);
        }
        fetchLanguages();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const handleDelete = (item) => {
        Swal.fire({
            title: 'Estás seguro?',
            text: "Esta acción no podrá revertirse",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                readFromFirestoreWhere(COLLECTIONS.LEVELS, null, 'language_id', '==', item.id).then((snapshot)=>{
                    if(snapshot.docs.length === 0){
                        deleteFromFirestore(COLLECTIONS.LANGUAGES, item.id).then(()=>{
                            setLanguages(languages.filter((language)=>language.id !== item.id));
                            setItems(languages.filter((language)=>language.id !== item.id));
                            if(item.image && typeof(item.image) === 'string' && item.image.length)
                                deleteFileFromFirebase(item.image);
                        }).then(()=>{
                            Swal.fire(
                                'Eliminado!',
                                'El proceso finalizó correctamente.',
                                'success'
                            )
                        });
                    } else {
                        Swal.fire(
                            'Error!',
                            'No se puede eliminar, está siendo usado actualmente con ' + snapshot.docs.length + ' niveles',
                            'error'
                        )
                    }
                }).finally(()=>setIsLoading(false));
            }
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
                            setItems([...languages, {...newLanguage, id: res.id}]);
                        });
                    };     
                })
            }
        } 
        //Editing language
        else {
            if(item.prevImage && typeof(item.prevImage)==='string') {
                // If image edited       
                deleteFileFromFirebase(item.prevImage);
                saveFileOnFirebase(STORAGE.LANGUAGES, imageName, item.image).then((downloadURL)=> {
                    if(downloadURL !== null){
                        const newItem = {...item, image: downloadURL};
                        delete newItem['id'];
                        delete newItem['prevImage'];
                        updateFirestoreDoc(STORAGE.LANGUAGES, item.id, newItem).then(()=>{
                            const index = languages.findIndex((language) => language.id === item.id);
                            let newLanguages = [...languages.slice(0, index), 
                                                {...newItem, id: item.id},
                                                ...languages.slice(index + 1)];
                            setLanguages(newLanguages);
                            setItems(newLanguages);
                        });
                    };
                });
            } else {
                const newItem = {...item};
                delete newItem['id'];
                updateFirestoreDoc(STORAGE.LANGUAGES, item.id, newItem).then(()=>{
                    const index = languages.findIndex((language) => language.id === item.id);
                    let newLanguages = [...languages.slice(0, index),
                                        {...newItem, id: item.id},
                                        ...languages.slice(index + 1)];
                    setLanguages(newLanguages);
                    setItems(newLanguages);
                });
            }
        }
        setIsCreating(false);
    }

    const handleClick = (language) => {
        navigateTo(`/${ROUTES.DASHBOARD}/${ROUTES.LEVELS}/${language.id}`);
    }


    return {
        languages,
        isLoading,
        isCreating,        
        handleCreate,
        handleSave,
        handleDelete,
        handleClick,
        results
    }
}

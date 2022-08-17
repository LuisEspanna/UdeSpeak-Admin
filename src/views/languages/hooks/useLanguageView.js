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
import { useNavigate, useLocation } from 'react-router-dom';


export default function useLanguageView() {
    const [languages, setLanguages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isCreating, setIsCreating] = useState(false);

    const { getAll } = useLanguages();
    const navigate = useNavigate();

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
                        deleteFromFirestore(STORAGE.LANGUAGES, item.id).then(()=>{
                            setLanguages(languages.filter((language)=>language.id !== item.id));
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

    const handleClick = (language) => {
        navigate(`/${ROUTES.DASHBOARD}${ROUTES.LEVELS}${language.id}`, {replace: true});
    }


    return {
        languages,
        isLoading,
        isCreating,        
        handleCreate,
        handleSave,
        handleDelete,
        handleClick
    }
}

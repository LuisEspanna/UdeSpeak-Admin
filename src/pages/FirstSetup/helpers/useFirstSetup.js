import {useState, useEffect} from 'react'
import { db, auth } from '../../../services/firebase'
import constants from '../../../config/constants.json'
import Swal from 'sweetalert2'

const dataExamle = [
    {
        "description": "Los docentes unicamente podran getionar sus cursos, cuestionarios y visualizar el progreso de sus estudiantes.",
        "name": "Docente"
    },
    {
        "name": "Estudiante",
        "description": "Los estudiantes unicamente podran visualizar sus indices de desempeno,  para las demas funcionalidades  te invitamos a descargar  nuestra aplicacion movil. "
    },
    {
        "name": "Administrador",
        "description": "Tiene acceso a todo el contenido, solo otro administrador puede dar acceso mediante un código."
    }
]

export default function useFirstSetup() {
    const [isLoading, setIsLoading] = useState(false)
    const [permissions, setPermissions] = useState(dataExamle)
    const [currOption, setCurrOption] = useState(dataExamle[0])
    const [accessKey, setAccessKey] = useState('')
    

    useEffect(() => {
      //getAll();
    }, [])
    
    const onChangeOption = (option) => {
        setCurrOption(permissions[option.target.value])
    }

    const handleAccessKey = (event) => {
        setAccessKey(event.target.value);
    }

    const getAll = async() => {
        setIsLoading(true);
        const permissionsRef = db.collection(constants.COLLECTION_PERMISSIONS);
        const snapshot = await permissionsRef.get();
        const localPermissions = [];
        
        snapshot.forEach(doc => {
            const permission = doc.data();
            localPermissions.push(permission);
        });

        setPermissions(localPermissions);
        setIsLoading(false);
        console.log(localPermissions)
        return(localPermissions);
    }
    
    const handleSubmit = (event) => {
        event.preventDefault();
        if(currOption.name === constants.PERMISSIONS_STUDENT){
            saveInDatabase()
        } else{
            if(accessKey.length > 0 ){
                console.log('Teacher / admin verification...')
                loadAccessKeys();
            }            
        }
    }

    const saveInDatabase = () => {
        showModal('Genial!', 'El proceso finalizó correctamente', 'success');
    }

    const loadAccessKeys = async () => {
        setIsLoading(true);
        const accessRef = db.collection(constants.COLLECTION_ACCESS_KEYS).doc(accessKey);
        const snapshot = await accessRef.get();
        const dbAccessKey = snapshot.data();

        if(auth.currentUser.uid === dbAccessKey?.uid){
            if(currOption.name === dbAccessKey?.name){
                saveInDatabase();
            }
            else{
                showModal('Error!', 'La clave de acceso no corresponde con el rol seleccionado', 'error')
            }
        } else {
            showModal('Error!','Clave no encontrada, contacte con el administrador', 'error')
        }

        setIsLoading(false);
    }

    const showModal = (title, message, icon) => {
        Swal.fire({
            title: title,
            icon: icon,
            text: message
        })
    }

    return {
        isLoading,
        permissions,
        currOption,
        accessKey,
        getAll,
        onChangeOption,
        handleSubmit,
        handleAccessKey
    }
}

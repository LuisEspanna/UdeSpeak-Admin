import {useState, useEffect} from 'react'
import { db, auth } from '../../../services/firebase'
import { COLLECTIONS, PERMISSIONS } from '../../../constants'
import Swal from 'sweetalert2'
import { useDispatch, useSelector } from 'react-redux';
import useUsers from '../../../hooks/useUsers';
import { setPermission } from '../../../state/reducers/userSlice'
import { useNavigate } from 'react-router-dom'
/*
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
*/

export default function useFirstSetup() {
    const [loading, setLoading] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const [permissions, setPermissions] = useState([])
    const [currOption, setCurrOption] = useState(undefined)
    const [accessKey, setAccessKey] = useState('')
    const { editUser } = useUsers()
    const dispatch = useDispatch()
    const currentUser = useSelector((state) => state.user)
    const navigate = useNavigate()

    useEffect(() => {
      getAll();
    }, [])
    
    const onChangeOption = (option) => {
        setCurrOption(permissions[option.target.value])
    }

    const handleAccessKey = (event) => {
        setAccessKey(event.target.value);
    }

    const getAll = async() => {
        setLoading(true);
        setIsLoading(true);
        const permissionsRef = db.collection(COLLECTIONS.PERMISSIONS);
        const snapshot = await permissionsRef.get();
        const localPermissions = [];
        
        snapshot.forEach(doc => {
            const permission = doc.data();
            localPermissions.push(permission);
        });

        setPermissions(localPermissions);
        setCurrOption(localPermissions[0]);
        setIsLoading(false);
        setLoading(false);
        return(localPermissions);
    }
    
    const handleSubmit = (event) => {
        event.preventDefault();
        if(currOption.name === PERMISSIONS.STUDENT){
            saveInDatabase()
        } else{
            if(accessKey.length > 0 ){
                loadAccessKeys();
            }          
        }
    }

    const loadAccessKeys = async () => {
        setIsLoading(true);
        const accessRef = db.collection(COLLECTIONS.ACCESS_KEYS).doc(accessKey);
        const snapshot = await accessRef.get();
        const dbAccessKey = snapshot.data();

        if(auth.currentUser.uid === dbAccessKey?.uid){
            if(currOption.name === dbAccessKey?.name){
                saveInDatabase();
            }
            else{
                showModal('Error!', 'La clave de acceso no corresponde con el rol seleccionado', 'error');
            }
        } else {
            showModal('Error!','Clave no encontrada, contacte con el administrador', 'error');
        }

        setIsLoading(false);
    }

    const saveInDatabase = () => {
        //Save in database
        
        const newUser = {...currentUser, permission: `${currOption.name}`}
        delete newUser['isLogged'];

        editUser(newUser)
        .then(()=>{
            dispatch(setPermission(currOption.name));
            showModal('Genial!', 'El proceso finalizó correctamente', 'success')
            .finally(()=>{
                navigate("/dashboard", {replace: true});
            });
        })
        .catch((err)=>{
            showModal('Error!', err, 'error');
        })
    }

    const showModal = (title, message, icon) => {
        return Swal.fire({
            title: title,
            icon: icon,
            text: message
        });
    }

    return {
        isLoading,
        permissions,
        currOption,
        accessKey,
        loading,
        getAll,
        onChangeOption,
        handleSubmit,
        handleAccessKey
    }
}

import { useEffect, useState } from 'react';
import { COLLECTIONS} from '../../../constants';
import useUsers from '../../../hooks/useUsers';
import {
    updateFirestoreDoc,
    firestore,
    deleteFromFirestore,
    saveOnFirestore
} from '../../../services/firebase';
import Swal from 'sweetalert2';
import { useDashboard } from '../../../context/dashboard-context';
import useOnClickOutside from '../../../hooks/useOnClickOutside';
import useGenericSearch from '../../../hooks/useGenericSearch';


export default function useUsersView(ref) {
    const [isLoading, setIsLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentUser, setCurrentUser] = useState(undefined);
    const [currentPermission, setCurrentPermission] = useState(undefined);
    const { setSearchAction } = useDashboard();
    const { results, search, setItems } = useGenericSearch();
    const [filterApplied, setFilterApplied] = useState('Administrador');
    const [allUsers, setAllUsers] = useState([]);

    const [counters, setCounters] = useState({
        Administrador: 0,
        Docente: 0,
        Estudiante: 0
    });
    const { getAll, getUserPermissions } = useUsers();

    useOnClickOutside(ref, (event)=>{
        if(event.target.placeholder === 'Search'){
            setSearchAction({function : (e) => {
                search(e);
                setFilterApplied(e);
            }});
        }
    });

    useEffect(() => {        
        async function fetchUsers() {
            setIsLoading(true);
            let localUsers =  await getAll();

            setItems(localUsers);
            setAllUsers(localUsers);
            setFilterApplied('Todos');
            const newCounters = {};

            localUsers.forEach((user)=>{
                newCounters[user.permission] = (newCounters[user.permission] ? newCounters[user.permission] : 0) + 1;
            });
            setCounters(newCounters);
            setIsLoading(false);
        }
        fetchUsers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    

    const handleUser = (user) => {
        setIsLoading(true);
        getUserPermissions(user).then(async(res) => {
            const localPermissions = [];
            res.forEach(doc => {
                const permission = {
                    ...doc.data(),
                    key: doc.id,
                    expires: doc.data()['expires'].toDate()
                }
                localPermissions.push(permission);
            });
            let newUser = { ...user, permissions: localPermissions };
            setCurrentUser(newUser);
        }).finally(() => setIsLoading(false));
    }

    const handleDelete = (index) => {
        if (currentUser.permissions.length > 0) {

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
                    const permission = currentUser.permissions[index];
                    const newPermissions = [
                        ...currentUser.permissions.slice(0, index),
                        ...currentUser.permissions.slice(index + 1)];

                    setIsLoading(true);
                    deleteFromFirestore(COLLECTIONS.ACCESS_KEYS, permission.key)
                        .then(() => {
                            setCurrentUser({ ...currentUser, permissions: newPermissions });

                            if (newPermissions.length === 0) {
                                updateFirestoreDoc(COLLECTIONS.USERS, currentUser.uid, { permission: 'Estudiante' });
                            }
                        })
                        .finally(() => {
                            Swal.fire(
                                'Eliminado!',
                                'El proceso finalizó correctamente.',
                                'success'
                            )
                            setIsLoading(false);
                            setIsEditing(false);
                        });
                }
            })
        }
    }

    const handleDate = (event, permission, index) => {
        const localPermissions = currentUser.permissions;

        const newPermissions = [
            ...localPermissions.slice(0, index),
            { ...permission, expires: new Date(event.target.value) },
            ...localPermissions.slice(index + 1)];

        setCurrentUser({ ...currentUser, permissions: newPermissions });
    }

    const handleSave = (index) => {
        const permission = currentUser.permissions[index];
        const newData = {
            ...permission,
            expires: firestore.Timestamp.fromDate(permission.expires),
        };

        delete newData['key'];

        setIsLoading(true);

        updateFirestoreDoc(COLLECTIONS.ACCESS_KEYS, permission.key, newData)
            .finally(() => {
                const newPermission = { permission: currentUser.permissions[index].name };
                updateFirestoreDoc(COLLECTIONS.USERS, currentUser.uid, newPermission)
                    .finally(() => {
                        setIsEditing(false);
                        setIsLoading(false);
                    });
            });
    }

    const handleEdit = (permissionIndex) => {
        setIsEditing(true);
        setCurrentPermission(permissionIndex);
    }

    const handleType = (event, permission, index) => {
        const localPermissions = currentUser.permissions;
        const newPermissions = [
            ...localPermissions.slice(0, index),
            { ...permission, name: event.target.value },
            ...localPermissions.slice(index + 1)];

        setCurrentUser({ ...currentUser, permissions: newPermissions });
    }

    const handleCreate = () => {
        const date = new Date();
        const data = {
            expires: firestore.Timestamp.fromDate(date),
            name: 'Estudiante',
            uid: currentUser.uid
        }

        if(currentUser.permissions.length > 0){
            Swal.fire(
                'Eliminado!',
                'El usuario solo puede tener un tipo de permisos.',
                'warning'
            )
        } else {
            saveOnFirestore(COLLECTIONS.ACCESS_KEYS, null, data).then((res) => {
                const localPermissions = currentUser.permissions;
                const newPermission = { ...data, key: res.id, expires: date };
                const newPermissions = [...localPermissions, newPermission];
    
                setCurrentUser({ ...currentUser, permissions: newPermissions });
            });
        }
    }

    const handleSearch = (text) => {
        search(text);
        setFilterApplied(text);
    }

    return {
        currentUser,
        isLoading,
        isEditing,
        currentPermission,
        counters,
        results,
        filterApplied,
        allUsers,
        handleUser,
        handleDelete,
        handleDate,
        handleSave,
        handleEdit,
        handleType,
        handleCreate,
        handleSearch
    }
}

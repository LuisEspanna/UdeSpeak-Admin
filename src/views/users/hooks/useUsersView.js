import { useEffect, useState } from 'react';
import { COLLECTIONS } from '../../../constants';
import useUsers from '../../../hooks/useUsers';
import {
    updateFirestoreDoc,
    firestore,
    deleteFromFirestore,
    saveOnFirestore
} from '../../../services/firebase';


export default function useUsersView() {
    const { getAll, getUserPermissions } = useUsers();
    
    const [currentUser, setCurrentUser] = useState(undefined);
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isEditing, setIsEdditing] = useState(false);
    const [currentPermission, setCurrentPermission] = useState(undefined);

    useEffect(() => {
        async function fetchUsers(){
            const localUsers = await getAll();
            setUsers(localUsers);
        }
        fetchUsers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    const handleUser = (user) => {
        setIsLoading(true);
        getUserPermissions(user).then(res => {
            const localPermissions = [];
            res.forEach(doc => {
                const permission = {
                    ...doc.data(), 
                    key: doc.id,
                    expires: doc.data()['expires'].toDate()
                }

                localPermissions.push(permission);
            });
            setCurrentUser({...user, permissions: localPermissions});
        }).finally(() => setIsLoading(false));
    }

    const handleDelete = (index) => {
        if(currentUser.permissions.length > 0){
            const permission = currentUser.permissions[index];
            const newPermissions = [
                ...currentUser.permissions.slice(0, index),
                ...currentUser.permissions.slice(index + 1)];
            
            setIsLoading(true);
            deleteFromFirestore(COLLECTIONS.ACCESS_KEYS, permission.key)
            .then(()=> {
                setCurrentUser({...currentUser, permissions: newPermissions});

                if(newPermissions.length === 0){
                    updateFirestoreDoc(COLLECTIONS.USERS, currentUser.uid, {permission: 'Estudiante'});
                }
            })
            .finally(()=> {
                setIsLoading(false);
                setIsEdditing(false);
            });            
        }
    }

    const handleDate = (event, permission, index) => {
        const localPermissions = currentUser.permissions;

        const newPermissions = [
            ...localPermissions.slice(0, index),
            {...permission, expires: new Date(event.target.value)},
            ...localPermissions.slice(index + 1)];

        setCurrentUser({...currentUser, permissions: newPermissions});
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
        .finally(()=>{
            const newPermission = {permission: currentUser.permissions[index].name};
            updateFirestoreDoc(COLLECTIONS.USERS, currentUser.uid, newPermission)
            .finally(()=>{
                setIsEdditing(false);
                setIsLoading(false);
            });
        });
    }

    const handleEdit = (permissionIndex) => {
        setIsEdditing(true);
        setCurrentPermission(permissionIndex);
    }

    const handleType = (event, permission, index) => {
        const localPermissions = currentUser.permissions;
        const newPermissions = [
            ...localPermissions.slice(0, index),
            {...permission, name: event.target.value},
            ...localPermissions.slice(index + 1)];

        setCurrentUser({...currentUser, permissions: newPermissions});
    }

    const handleCreate = () => {
        const date = new Date();
        const data = {
           expires: firestore.Timestamp.fromDate(date),
           name: 'Estudiante',
           uid: currentUser.uid 
        }
        saveOnFirestore(COLLECTIONS.ACCESS_KEYS, null, data).then((res) => {
            const localPermissions = currentUser.permissions;
            const newPermission = { ...data, key: res.id, expires: date};
            const newPermissions = [...localPermissions, newPermission];

            setCurrentUser({ ...currentUser, permissions: newPermissions });
            console.log(res);
        });
    }

    return {
        users,
        currentUser,
        isLoading,
        isEditing,
        currentPermission,
        handleUser,
        handleDelete,
        handleDate,
        handleSave,
        handleEdit,
        handleType,
        handleCreate
    }
}

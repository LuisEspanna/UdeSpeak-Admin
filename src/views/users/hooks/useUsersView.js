import { useEffect, useState } from 'react';
import useUsers from '../../../hooks/useUsers';

export default function useUsersView() {
    const { getAll, getUserPermissions } = useUsers();
    
    const [currentUser, setCurrentUser] = useState(undefined);
    const [users, setUsers] = useState([]);
    const [isLoading, setisLoading] = useState(false);
    const [isEditing, setIsEdditing] = useState(false);

    useEffect(() => {
        async function fetchUsers(){
            const localUsers = await getAll();
            setUsers(localUsers);
        }
        fetchUsers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    const handleUser = (user) => {
        setisLoading(true);
        setCurrentUser(user);
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
            Object.assign(user, {permissions: localPermissions});
        }).finally(() => setisLoading(false));
    }

    const handleDelete = () => {
        console.log('Borrar permisos...');
    }

    const handleDate = (event, permission, index) => {
        const localPermissions = currentUser.permissions;

        const newPermissions = [
            ...localPermissions.slice(0, index),
            {...permission, expires: new Date(event.target.value)},
            ...localPermissions.slice(index + 1)];

        Object.assign(currentUser, {permissions: newPermissions});
    }

    const handleSave = (permission) => {
        setIsEdditing(false);
    }

    const handleEdit = () => {
        setIsEdditing(true);
    }

    const handleType = (event, permission, index) => {
        const localPermissions = currentUser.permissions;
        const newPermissions = [
            ...localPermissions.slice(0, index),
            {...permission, name: event.target.value},
            ...localPermissions.slice(index + 1)];

        Object.assign(currentUser, {permissions: newPermissions});
    }

    return {
        users,
        currentUser,
        isLoading,
        isEditing,
        handleUser,
        handleDelete,
        handleDate,
        handleSave,
        handleEdit,
        handleType
    }
}

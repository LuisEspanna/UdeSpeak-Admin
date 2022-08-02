import { useEffect, useState } from 'react';
import useUsers from '../../../hooks/useUsers';

export default function useUsersView() {
    const { getAll, getUserPermissions } = useUsers();
    
    const [currentUser, setCurrentUser] = useState(undefined);
    const [users, setUsers] = useState([]);
    const [isLoading, setisLoading] = useState(false);

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
                console.log(doc);
                const permission = {
                    ...doc.data(), key: doc.id
                }
                localPermissions.push(permission);
            });
            Object.assign(user, {permissions: localPermissions});
        }).finally(() => setisLoading(false));
    }

    return {
        users,
        currentUser,
        isLoading,
        handleUser
    }
}

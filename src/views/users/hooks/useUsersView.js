import { useEffect, useState } from 'react';
import useUsers from '../../../hooks/useUsers';

export default function useUsersView() {
    const { getAll } = useUsers();
    
    const [currentUser, setCurrentUser] = useState(undefined);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function fetchUsers(){
            const localUsers = await getAll();
            setUsers(localUsers);
        }
        fetchUsers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    const handleUser = (user) => {
        setCurrentUser(user);
    }

    return {
        users,
        currentUser,
        handleUser
    }
}

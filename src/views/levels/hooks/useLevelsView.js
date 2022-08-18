import { useState, useEffect } from 'react';
import uselevels from '../../../hooks/useLevels';

export default function useLevelsView() {
    const [levels, setLevels] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isCreating, setIsCreating] = useState(false);

    const { 
        getAll,
        //createlevel, 
        //editlevel, 
        //deletelevel
    } = uselevels();
    //const navigate = useNavigate();

    useEffect(() => {        
        async function fetchLavels() {
            setIsLoading(true);
            const localLevels = await getAll();
            setLevels(localLevels);
            setIsLoading(false);
        }
        fetchLavels();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleCreate = () => {
        setIsCreating(!isCreating);
    }

    const handleSave = (item) => {
        console.log(item);
    }

    const handleDelete = () => {
        console.log('Deleting...');
    }

    const handleClick = (level) => {
        console.log(level);
    }

    return {
        levels,
        isCreating,
        isLoading,
        handleCreate,
        handleSave,
        handleDelete,
        handleClick
    }
}

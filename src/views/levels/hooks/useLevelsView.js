import { useState, useEffect } from 'react';
import uselevels from '../../../hooks/useLevels';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { ROUTES } from '../../../constants';
import useMyNavigation from '../../../hooks/useMyNavigation';


export default function useLevelsView() {
    const [levels, setLevels] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isCreating, setIsCreating] = useState(false);

    const { navigateTo } = useMyNavigation();

    const { id } = useParams();

    const { 
        getAll,
        createLevel, 
        editLevel, 
        deleteLevel
    } = uselevels(id);

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
        setIsLoading(true);
        if(item?.id) {
            editLevel(item)
            .then(()=>{
                const index = levels.findIndex((level) => level.id === item.id);
                setLevels( 
                    [...levels.slice(0, index), 
                    {...item, language_id: id},
                    ...levels.slice(index + 1)]
                );
            })
            .finally(()=>{
                setIsLoading(false);
                setIsCreating(false);
            });
        } else{
            createLevel(item)
            .then((res)=>{
                const newLevel = {...item, id: res.id};
                setLevels([...levels, newLevel]);
            })
            .finally(()=> {
                setIsLoading(false);
                setIsCreating(false);
            });
        }
    }

    const handleDelete = async(item) => {   
        const res = await deleteLevel(item);
        if(res){
            Swal.fire(
                'Eliminado!',
                'El proceso finalizó correctamente.',
                'success'
            );
            
            setLevels(levels.filter((level) => level.id !== item.id));
        } else {
            Swal.fire(
                'Error!',
                'El nivel está siendo usado actualmente',
                'error'
            )
        }
    }

    const handleClick = (level) => {
        navigateTo(`/${ROUTES.DASHBOARD}/${ROUTES.GROUPS}/${level.id}`, {replace: true});
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

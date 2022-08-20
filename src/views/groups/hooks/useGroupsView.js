import { useState, useEffect } from 'react';
import useGroups from '../../../hooks/useGroups';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
//import { useNavigate } from 'react-router-dom';
//import { ROUTES } from '../../../constants'

export default function useGroupsView() {
    const [groups, setGroups] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isCreating, setIsCreating] = useState(false);

    //const navigate = useNavigate();

    const { id } = useParams();

    const { 
        getAll,
        createGroup, 
        editGroup, 
        deleteGroup
    } = useGroups(id);

    useEffect(() => {        
        async function fetchLavels() {
            setIsLoading(true);
            const localGroups = await getAll();
            setGroups(localGroups);
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
            editGroup(item)
            .then(()=>{
                const index = groups.findIndex((group) => group.id === item.id);
                setGroups( 
                    [...groups.slice(0, index), 
                    {...item, language_id: id},
                    ...groups.slice(index + 1)]
                );
            })
            .finally(()=>{
                setIsLoading(false);
                setIsCreating(false);
            });
        } else{
            createGroup(item)
            .then((res)=>{
                const newGroup = {...item, id: res.id};
                setGroups([...groups, newGroup]);
            })
            .finally(()=> {
                setIsLoading(false);
                setIsCreating(false);
            });
        }
    }

    const handleDelete = async(item) => {   
        const res = await deleteGroup(item);
        if(res){
            Swal.fire(
                'Eliminado!',
                'El proceso finalizó correctamente.',
                'success'
            );
            
            setGroups(groups.filter((group) => group.id !== item.id));
        } else {
            Swal.fire(
                'Error!',
                'El nivel está siendo usado actualmente',
                'error'
            )
        }
    }

    const handleClick = (group) => {
        //navigate(`/${ROUTES.DASHBOARD}/${ROUTES.GROUPS}/${group.id}`, {replace: true});
    }

    return {
        groups,
        isCreating,
        isLoading,
        handleCreate,
        handleSave,
        handleDelete,
        handleClick
    }
}

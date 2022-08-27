import { useState, useEffect } from 'react';
import useQuestionnaires from '../../../hooks/useQuestionnaires';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../constants'

export default function useQuestionnariesView() {
    const [questionnaries, setQuestionnaries] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isCreating, setIsCreating] = useState(false);

    const navigate = useNavigate();

    const { id } = useParams();

    const { 
        getAll,
        createQuestionnary, 
        editQuestionnary, 
        deleteQuestionnary
    } = useQuestionnaires(id);

    useEffect(() => {        
        async function fetchQuestionnaries() {
            setIsLoading(true);
            const localquestionnaries = await getAll();
            setQuestionnaries(localquestionnaries);
            setIsLoading(false);
        }
        fetchQuestionnaries();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleCreate = () => {
        setIsCreating(!isCreating);
    }

    const handleSave = (item) => {
        let newGroup = {
            ...item,
        };

        setIsLoading(true);
        if(item?.id) {
            editQuestionnary(newGroup)
            .then(()=>{
                const index = questionnaries.findIndex((group) => group.id === item.id);
                setQuestionnaries( 
                    [...questionnaries.slice(0, index),
                    {...newGroup},
                    ...questionnaries.slice(index + 1)]
                );
            })
            .finally(()=>{
                setIsLoading(false);
                setIsCreating(false);
            });
        } else{
            createQuestionnary(newGroup)
            .then((res)=>{
                setQuestionnaries([...questionnaries, {...newGroup, id: res.id}]);
            })
            .finally(()=> {
                setIsLoading(false);
                setIsCreating(false);
            });
        }
    }

    const handleDelete = async(item) => {   
        const res = await deleteQuestionnary(item);
        if(res){
            Swal.fire(
                'Eliminado!',
                'El proceso finalizó correctamente.',
                'success'
            );
            
            setQuestionnaries(questionnaries.filter((group) => group.id !== item.id));
        } else {
            Swal.fire(
                'Error!',
                'El nivel está siendo usado actualmente',
                'error'
            )
        }
    }

    const handleClick = (group) => {
        navigate(`/${ROUTES.DASHBOARD}/${ROUTES.QUESTIONS}/${group.id}`, {replace: true});
    }

    return {
        questionnaries,
        isCreating,
        isLoading,
        handleCreate,
        handleSave,
        handleDelete,
        handleClick
    }
}
import { useState, useEffect } from 'react';
import useQuestions from '../../../hooks/useQuestions';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../constants'

export default function useQuestionsView() {
    const [questions, setQuestions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isCreating, setIsCreating] = useState(false);

    const navigate = useNavigate();

    const { id } = useParams();

    const { 
        getAll,
        createQuestion, 
        editQuestion, 
        deleteQuestion
    } = useQuestions(id);

    useEffect(() => {        
        async function fetchLavels() {
            setIsLoading(true);
            const localquestions = await getAll();
            setQuestions(localquestions);
            setIsLoading(false);
        }
        fetchLavels();
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
            editQuestion(newGroup)
            .then(()=>{
                const index = questions.findIndex((group) => group.id === item.id);
                setQuestions( 
                    [...questions.slice(0, index),
                    {...newGroup},
                    ...questions.slice(index + 1)]
                );
            })
            .finally(()=>{
                setIsLoading(false);
                setIsCreating(false);
            });
        } else{
            createQuestion(newGroup)
            .then((res)=>{
                setQuestions([...questions, {...newGroup, id: res.id}]);
            })
            .finally(()=> {
                setIsLoading(false);
                setIsCreating(false);
            });
        }
    }

    const handleDelete = async(item) => {   
        const res = await deleteQuestion(item);
        if(res){
            Swal.fire(
                'Eliminado!',
                'El proceso finalizó correctamente.',
                'success'
            );
            
            setQuestions(questions.filter((group) => group.id !== item.id));
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
        questions,
        isCreating,
        isLoading,
        handleCreate,
        handleSave,
        handleDelete,
        handleClick
    }
}

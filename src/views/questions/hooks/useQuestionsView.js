import { useState, useEffect } from 'react';
import useQuestions from '../../../hooks/useQuestions';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { ROUTES } from '../../../constants';
import useMyNavigation from '../../../hooks/useMyNavigation';
import { useDashboard } from '../../../context/dashboard-context';
import useGenericSearch from '../../../hooks/useGenericSearch';
import useOnClickOutside from '../../../hooks/useOnClickOutside';
import usePermissions from '../../../hooks/usePermissions';

export default function useQuestionsView(ref) {
    const [questions, setQuestions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isCreating, setIsCreating] = useState(false);

    const { navigateTo } = useMyNavigation();

    const { id } = useParams();
    const { setSearchAction } = useDashboard();
    const { results, search, setItems } = useGenericSearch();

    const {
        getAll,
        createQuestion,
        editQuestion,
        deleteQuestion
    } = useQuestions(id);

    const { user } = usePermissions();

    useOnClickOutside(ref, (event)=>{
        if(event.target.placeholder === 'Search'){
            setSearchAction({function : (e) => search(e)});
        }
    });

    useEffect(() => {
        async function fetchLavels() {
            setIsLoading(true);
            const localquestions = await getAll();
            setQuestions(localquestions);
            setItems(localquestions);
            setIsLoading(false);
        }
        fetchLavels();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleCreate = () => {
        setIsCreating(!isCreating);
    }

    const handleSave = (item) => {
        let newQuestion = {
            ...item,
            user_id: user.uid
        };

        setIsLoading(true);
        if (item?.id) {
            newQuestion.edited_at = new Date().getTime();
            editQuestion(newQuestion)
                .then(() => {
                    const index = questions.findIndex((question) => question.id === item.id);
                    let newData = [...questions.slice(0, index),
                                    { ...newQuestion },
                                    ...questions.slice(index + 1)];
                    setQuestions(newData);
                    setItems(newData);
                })
                .finally(() => {
                    setIsLoading(false);
                    setIsCreating(false);
                });
        } else {
            newQuestion.created_at = new Date().getTime();
            createQuestion(newQuestion)
                .then((res) => {
                    setQuestions([...questions, { ...newQuestion, id: res.id }]);
                    setItems([...questions, { ...newQuestion, id: res.id }]);
                })
                .finally(() => {
                    setIsLoading(false);
                    setIsCreating(false);
                });
        }
    }

    const handleDelete = (item) => {

        Swal.fire({
            title: '¿Estás segur@ de eliminar esto?',
            showCancelButton: true,
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar'
        }).then(async(result) => {
            if (result.isConfirmed) {
                const res = await deleteQuestion(item);
                if (res) {
                    Swal.fire(
                        'Eliminado!',
                        'El proceso finalizó correctamente.',
                        'success'
                    );

                    setQuestions(questions.filter((question) => question.id !== item.id));
                    setItems(questions.filter((question) => question.id !== item.id));
                } else {
                    Swal.fire(
                        'Error!',
                        'No se pudo eliminar',
                        'error'
                    )
                }
            }
        });
    }

    const handleClick = (question) => {
        navigateTo(`/${ROUTES.DASHBOARD}/${ROUTES.QUESTION}/${question.id}`);
    }

    return {
        questions,
        isCreating,
        isLoading,
        handleCreate,
        handleSave,
        handleDelete,
        handleClick,
        results
    }
}

import { useState, useEffect } from 'react';
import useQuestions from '../../../hooks/useQuestions';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { ROUTES } from '../../../constants';
import useMyNavigation from '../../../hooks/useMyNavigation';

export default function useQuestionsView() {
    const [questions, setQuestions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isCreating, setIsCreating] = useState(false);

    const { navigateTo } = useMyNavigation();

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
        let newQuestion = {
            ...item,
        };

        setIsLoading(true);
        if (item?.id) {
            editQuestion(newQuestion)
                .then(() => {
                    const index = questions.findIndex((question) => question.id === item.id);
                    setQuestions(
                        [...questions.slice(0, index),
                        { ...newQuestion },
                        ...questions.slice(index + 1)]
                    );
                })
                .finally(() => {
                    setIsLoading(false);
                    setIsCreating(false);
                });
        } else {
            createQuestion(newQuestion)
                .then((res) => {
                    setQuestions([...questions, { ...newQuestion, id: res.id }]);
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
        handleClick
    }
}

import { useState, useEffect } from 'react';
import useQuestionnaires from '../../../hooks/useQuestionnaires';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { ROUTES } from '../../../constants';
import useMyNavigation from '../../../hooks/useMyNavigation';
import { useDashboard } from '../../../context/dashboard-context';
import useGenericSearch from '../../../hooks/useGenericSearch';
import useOnClickOutside from '../../../hooks/useOnClickOutside';

export default function useQuestionnariesView(ref) {
    const [questionnaries, setQuestionnaries] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const { setSearchAction } = useDashboard();
    const { results, search, setItems } = useGenericSearch();
    const { navigateTo } = useMyNavigation();

    const { id } = useParams();

    const {
        getAll,
        createQuestionnary,
        editQuestionnary,
        deleteQuestionnary
    } = useQuestionnaires(id);

    useOnClickOutside(ref, (event)=>{
        if(event.target.placeholder === 'Search'){
            setSearchAction({function : (e) => search(e)});
        }
    });

    useEffect(() => {
        async function fetchQuestionnaries() {
            setIsLoading(true);
            const localquestionnaries = await getAll();
            setQuestionnaries(localquestionnaries);
            setItems(localquestionnaries);
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
        if (item?.id) {
            editQuestionnary(newGroup)
                .then(() => {
                    const index = questionnaries.findIndex((group) => group.id === item.id);
                    let newData = [...questionnaries.slice(0, index),
                                { ...newGroup },
                                ...questionnaries.slice(index + 1)];
                    setQuestionnaries(newData);
                    setItems(newData);
                })
                .finally(() => {
                    setIsLoading(false);
                    setIsCreating(false);
                });
        } else {
            createQuestionnary(newGroup)
                .then((res) => {
                    setQuestionnaries([...questionnaries, { ...newGroup, id: res.id }]);
                    setItems([...questionnaries, { ...newGroup, id: res.id }]);
                })
                .finally(() => {
                    setIsLoading(false);
                    setIsCreating(false);
                });
        }
    }

    const handleDelete = async (item) => {
        Swal.fire({
            title: 'Estás segur@ de eliminar esto?',
            showCancelButton: true,
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar'
        }).then(async(result) => {
            if (result.isConfirmed) {
                const res = await deleteQuestionnary(item);
                if (res) {
                    Swal.fire(
                        'Eliminado!',
                        'El proceso finalizó correctamente.',
                        'success'
                    );

                    setQuestionnaries(questionnaries.filter((group) => group.id !== item.id));
                    setItems(questionnaries.filter((group) => group.id !== item.id));
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

    const handleClick = (group) => {
        navigateTo(`/${ROUTES.DASHBOARD}/${ROUTES.QUESTIONS}/${group.id}`, { replace: true });
    }

    return {
        questionnaries,
        isCreating,
        isLoading,
        handleCreate,
        handleSave,
        handleDelete,
        handleClick,
        results
    }
}

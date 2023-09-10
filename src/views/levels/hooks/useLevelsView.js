import { useState, useEffect } from 'react';
import uselevels from '../../../hooks/useLevels';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { ROUTES } from '../../../constants';
import useMyNavigation from '../../../hooks/useMyNavigation';
import { useDashboard } from '../../../context/dashboard-context';
import useOnClickOutside from '../../../hooks/useOnClickOutside';
import useGenericSearch from '../../../hooks/useGenericSearch';


export default function useLevelsView(ref) {
    const [levels, setLevels] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isCreating, setIsCreating] = useState(false);

    const { navigateTo } = useMyNavigation();
    const { setSearchAction } = useDashboard();
    const { results, search, setItems } = useGenericSearch();

    const { id } = useParams();

    const {
        getAll,
        createLevel,
        editLevel,
        deleteLevel
    } = uselevels(id);

    useOnClickOutside(ref, (event)=>{
        if(event.target.placeholder === 'Search'){
            setSearchAction({function : (e) => search(e)});
        }
    });

    useEffect(() => {
        async function fetchLavels() {
            setIsLoading(true);
            const localLevels = await getAll();
            setLevels(localLevels);
            setItems(localLevels);
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
        if (item?.id) {
            editLevel(item)
                .then(() => {
                    const index = levels.findIndex((level) => level.id === item.id);
                    let newLevels = [...levels.slice(0, index),
                        { ...item, language_id: id },
                        ...levels.slice(index + 1)];
                    setLevels(newLevels);
                    setItems(newLevels);
                })
                .finally(() => {
                    setIsLoading(false);
                    setIsCreating(false);
                });
        } else {
            createLevel(item)
                .then((res) => {
                    const newLevel = { ...item, id: res.id };
                    setLevels([...levels, newLevel]);
                    setItems([...levels, newLevel]);
                })
                .finally(() => {
                    setIsLoading(false);
                    setIsCreating(false);
                });
        }
    }

    const handleDelete = (item) => {
        Swal.fire({
            title: 'Estás segur@ de eliminar esto?',
            showCancelButton: true,
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar'
        }).then(async(result) => {
            if (result.isConfirmed) {
                const res = await deleteLevel(item);
                if (res) {
                    Swal.fire(
                        'Eliminado!',
                        'El proceso finalizó correctamente.',
                        'success'
                    );

                    setLevels(levels.filter((level) => level.id !== item.id));
                    setItems(levels.filter((level) => level.id !== item.id));
                } else {
                    Swal.fire(
                        'Error!',
                        'Error al eliminar',
                        'error'
                    )
                }
            }
        });
    }

    const handleClick = (level) => {
        navigateTo(`/${ROUTES.DASHBOARD}/${ROUTES.GROUPS}/${level.id}`, { replace: true });
    }

    return {
        levels,
        isCreating,
        isLoading,
        handleCreate,
        handleSave,
        handleDelete,
        handleClick,
        results
    }
}

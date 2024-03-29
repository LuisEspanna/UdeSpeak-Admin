import { useState, useEffect } from 'react';
import useGroups from '../../../hooks/useGroups';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import usePermissions from '../../../hooks/usePermissions';
import useMyNavigation from '../../../hooks/useMyNavigation';
import { ROUTES } from '../../../constants'
import { useDashboard } from '../../../context/dashboard-context';
import useGenericSearch from '../../../hooks/useGenericSearch';
import useOnClickOutside from '../../../hooks/useOnClickOutside';

export default function useGroupsView(ref) {
    const [groups, setGroups] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isCreating, setIsCreating] = useState(false);

    const { navigateTo } = useMyNavigation();

    const { id } = useParams();
    const { user } = usePermissions();
    const { setSearchAction } = useDashboard();
    const { results, search, setItems } = useGenericSearch();

    const {
        getAll,
        createGroup,
        editGroup,
        deleteGroup
    } = useGroups(id);

    useOnClickOutside(ref, (event)=>{
        if(event.target.placeholder === 'Search'){
            setSearchAction({function : (e) => search(e)});
        }
    });

    useEffect(() => {
        async function fetchLavels() {
            setIsLoading(true);
            const localGroups = await getAll();
            setGroups(localGroups);
            setItems(localGroups);
            setIsLoading(false);
        }
        fetchLavels();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleCreate = () => {
        setIsCreating(!isCreating);
    }

    const handleSave = (item) => {
        const date = new Date().getTime();
        let newGroup = {
            ...item,
            user_id: user.uid,
            displayName: user.displayName,
            edited_at: date
        };

        setIsLoading(true);
        if (item?.id) {
            editGroup(newGroup)
                .then(() => {
                    const index = groups.findIndex((group) => group.id === item.id);
                    let newGroups = [...groups.slice(0, index),
                                    { ...newGroup },
                                    ...groups.slice(index + 1)];
                    setGroups(newGroups);
                    setItems(newGroups);
                })
                .finally(() => {
                    setIsLoading(false);
                    setIsCreating(false);
                });
        } else {
            newGroup.created_at = date;

            createGroup(newGroup)
                .then((res) => {
                    setGroups([...groups, { ...newGroup, id: res.id }]);
                    setItems([...groups, { ...newGroup, id: res.id }]);
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
                const res = await deleteGroup(item);
                if (res) {
                    Swal.fire(
                        'Eliminado!',
                        'El proceso finalizó correctamente.',
                        'success'
                    );

                    setGroups(groups.filter((group) => group.id !== item.id));
                    setItems(groups.filter((group) => group.id !== item.id));
                } else {
                    Swal.fire(
                        'Error!',
                        'El nivel está siendo usado actualmente',
                        'error'
                    )
                }
            }
        });
    }

    const handleClick = (group) => {
        navigateTo(`/${ROUTES.DASHBOARD}/${ROUTES.QUESTIONNARIES}/${group.id}`);
    }

    return {
        groups,
        isCreating,
        isLoading,
        handleCreate,
        handleSave,
        handleDelete,
        handleClick,
        results
    }
}

import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useBugs from '../../../hooks/useBugs';
import usePermissions from "../../../hooks/usePermissions";
import { PERMISSIONS } from "../../../constants";
import BugDetails from "../helpers/bugDetails/BugDetails";

export default function useBugsView(dialogProps) {
    const [state, setState] = useState({description: ''});
    const [image, setImage] = useState(undefined);
    const [isLoading, setIsLoading] = useState(false);
    const [bugs, setBugs] = useState([]);
    const {
        getAll,
        getMyBugs,
        createBug,
        deleteBug,
    } = useBugs();
    const { user } = usePermissions();

    useEffect(() => {        
        async function fetchItems() {
            setIsLoading(true);
            let localItems = [];

            if(user?.permission === PERMISSIONS.ADMIN){
                localItems = await getAll();
            } else {
                localItems = await getMyBugs();
            }

            setBugs(localItems);
            setIsLoading(false);
        }
        fetchItems();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleChange = (e) => {
        setState({...state, [e.target.name]: e.target.value});
    }

    const handleCreateBug = () => {
        if(state?.description?.length === 0 && image === undefined){
            Swal.fire(
                'Error',
                'Tiene que describir el problema o subir una imagen',
                'error'
            );

            return;
        }
        
        setIsLoading(true);

        Swal.fire({
            title: 'Estás segur@?',
            text: "Esta acción publicará el error y los administradores lo podrán revisar",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Enviar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                createBug({...state, image}).then((createdBug)=>{
                    Swal.fire(
                        'OK',
                        'Gracias por reportar',
                        'success'
                    );
                    setState({description: ''});
                    setImage(undefined);
                    setBugs([...bugs, createdBug]);
                    setIsLoading(false);
                });
            }
        });
    }

    const handleImage = (e) => {
        if (e?.target?.files) {
            setImage(e.target?.files[0]);
        } else {
            setImage(undefined);
        }
    }

    const handleDeleteBug = (item) => {
        setIsLoading(true);

        Swal.fire({
            title: 'Estás segur@?',
            text: "Esta acción no se podrá revertir",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteBug(item).then(() => {
                    setIsLoading(false);
                    Swal.fire(
                        'OK',
                        'Gracias por reportar',
                        'success'
                    );

                    setBugs(bugs.filter(b => b.id !== item.id));
                });
            }
        });
    }


    const handleBugDetails = (bug) => {
        dialogProps.setShowCancelBtn(false);
        dialogProps.setContentDialog(
            <BugDetails bug={bug} />
        );
        dialogProps.setVisibleDialog(true);
    }

    return {
        state,
        image,
        isLoading,
        bugs,
        handleDeleteBug,
        handleImage,
        handleCreateBug,
        handleChange,
        handleBugDetails
    }
}
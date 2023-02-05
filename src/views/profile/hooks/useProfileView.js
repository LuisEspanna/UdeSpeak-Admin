import Swal from "sweetalert2";

export default function useUsersView(ref) {
    //TODO: conectar con DB
    const handleDeleteAccount = () => {
        Swal.fire({
            title: 'Está seguro que desea eliminar su cuenta?',
            text: "Esta acción no se puede revertir",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Eliminada!',
                    'Tu prtfil ha sido eliminado',
                    'success'
                );

                console.log('Eliminando');
            }
        });
    }

    return {
        handleDeleteAccount
    }
}

import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import useQuestions from '../../../../../hooks/useQuestions';
import useLoading from '../../../../../hooks/useLoading';
import { actionButtons } from '../constants';

export default function useNotesView(question) {
    const [state, setState] = useState(question);
    const { editQuestion } = useQuestions();
    const { setLoading } = useLoading();
    const [isEdited, setIsEdited] = useState(false);
    
    useEffect(() => {
        setState(question);
    }, [question]);

    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: (e.target.value) });
        setIsEdited(true);
    }

    const handleMarkdownBtn = (name) => {
        setIsEdited(true);
        let newDescription = state?.description ? state.description + '\n': '';
        setState({ ...state, description: newDescription + actionButtons[name] });
    }

    const onSave = async () => {
        setLoading(true);
        
        if (state?.title?.length > 0) {

            let errors = [];

            if (state?.description === "")
                errors.push('El texto descripción no puede quedar vacío')

            if (errors.length > 0) {
                let err = '';

                errors.forEach(e => {
                    err = err + '<p>' + e + '</p>';
                });

                Swal.fire(
                    'Error!',
                    err,
                    'error'
                );
                setLoading(false);
            } else {
                const newState = { ...state };

                await editQuestion(newState).then(() => {
                    setLoading(false);
                    setIsEdited(false);

                    Swal.fire(
                        'OK',
                        'Cambios guardados',
                        'success'
                    );
                });
            }
        } else {
            Swal.fire(
                'Error!',
                'El título es obligatorio',
                'error'
            )
            setLoading(false);
        }
    }

    return {
        state,
        isEdited,
        handleChange,
        onSave,
        handleMarkdownBtn
    }
}


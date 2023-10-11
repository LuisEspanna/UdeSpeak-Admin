import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import {
    saveFileOnFirebase,
    deleteFileFromFirebase,
} from '../../../../../services/firebase';
import { STORAGE } from '../../../../../constants';
import { idGenerator } from '../../../../../functions';
import useQuestions from '../../../../../hooks/useQuestions';
import DialogList from '../helper/Dialogs/DialogList';


export default function useSpeakingView(question, dialogProps) {
    const [state, setState] = useState(question);
    const [image, setImage] = useState(question?.image || undefined);
    const { editQuestion } = useQuestions();
    const [isLoading, setIsLoading] = useState(false);
    const [isEdited, setIsEdited] = useState(false);

    useEffect(() => {
        setState(question);
        setImage(question?.image || undefined);
    }, [question]);

    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: (e.target.value) });
        setIsEdited(true);
    }


    const handleAddQuestion = (type) => {
        setIsEdited(true);
        let questions = state?.questions ? [...state?.questions] : [];
        const localTitle = (type === 'question' ? '1+1 = ?' : idGenerator(7));
        let newItem = {
            "id":  (type !== 'question' ? localTitle : idGenerator(7)),
            "type":type,
            "title": localTitle,
            "options":[
               {
                  "id":idGenerator(7),
                  "isValid":true,
                  "description": (type === 'question' ? '2' : "Opción 1")
               },
               {
                  "isValid":false,
                  "id":idGenerator(7),
                  "description": (type === 'question' ? '3' : "Opción 2")
               }
            ]
        };
        questions.push(newItem);
        setState({ ...state, questions });
    }

    const handleEditQuestion = (question) => {
        const indexQuestion = state.questions.findIndex(qe => qe.id === question.id);

        const questions = [
            ...state.questions.slice(0, indexQuestion),
            question,
            ...state.questions.slice(indexQuestion + 1)
        ];

        setState({ ...state, questions });
        setIsEdited(true);
    }


    const saveImage = () => {
        setIsLoading(true);
        const imageName = idGenerator(20);
        saveFileOnFirebase(STORAGE.QUESTION, imageName, image).then((downloadURL) => {
            if (downloadURL !== null) {
                const newQuestion = { ...state, image: downloadURL };
                editQuestion(newQuestion).then(() => {
                    setState(newQuestion);
                    setImage(downloadURL);
                    setIsLoading(false);
                    setIsEdited(false);

                    Swal.fire(
                        'OK',
                        'Cambios aguardados',
                        'success'
                    );
                });
            };
        });
    }

    const onSave = () => {
        setIsLoading(true);
        // TODO: Validar opciones y preguntas
        if (state.questions && state.questions.length > 0) {
            if (
                //(state.description && state.description.length > 0) &&
                (state.title && state.title.length > 0)) {

                let errors = [];

                state.questions.forEach((q, i) => {
                    if (q?.title === null || q?.title === undefined) {
                        //errors.push('El texto de la pregunta no debe estar vacio');
                    }

                    if (q?.options === null || q?.options === undefined) {
                        errors.push('Debe contener al menos una opción');
                    } else {
                        q?.options?.forEach(o => {
                            if (o.description === null || o.description === undefined)
                                errors.push('La descripción no debe estar vacía');
                        });
                    }
                });

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
                    setIsLoading(false);
                } else {
                    if (typeof (image) === 'object') {
                        saveImage();
                    }
                    else {
                        editQuestion(state).then(() => {
                            setIsLoading(false);
                            setIsEdited(false);
                            Swal.fire(
                                'OK',
                                'Cambios aguardados',
                                'success'
                            )
                        });
                    }
                }
            } else {
                Swal.fire(
                    'Error!',
                    'El título es obligatorio',
                    'error'
                )
                setIsLoading(false);
            }
        }
        else {
            Swal.fire(
                'Error!',
                'No se puede guardar, debe tener al menos una pregunta',
                'error'
            )
            setIsLoading(false);
        }
    }

    const handleImage = (e) => {
        if (state?.image && typeof (state?.image) === 'string') {
            //Delete from db
            setIsLoading(true);
            deleteFileFromFirebase(state?.image).then(() => {
                const newQuestion = { ...state, image: null };

                editQuestion(newQuestion).then(() => {
                    setState(newQuestion);
                    setImage(undefined);
                    setIsLoading(false);
                });
            });
        }

        if (e.target?.files) {
            setImage(e.target?.files[0]);
        } else {
            setImage(undefined);
        }
        setIsEdited(true);
    }

    const handleDeleteQuestion = (question) => {
        Swal.fire({
            title: 'Estás segur@ de eliminar esto?',
            showCancelButton: true,
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                let questions = state?.questions || [];
                questions = questions.filter(q => q.id !== question.id);
                setState({ ...state, questions });
                setIsEdited(true);
                Swal.fire('Eliminado!', '', 'success');
            }
        });
    }

    const getWords = () => {
        let resp = [];
        if (state?.questions) {
            resp = state?.questions?.filter(q => q.type === 'dropdown').map(q => q.title || '');
        }
        return resp;
    }

    const handleEditDropdown = (dropdown) => {
        dialogProps.setOnAcceptDialog({
            fn: (e) => {
                const index = state.questions.findIndex(op => op.id === dropdown.id);

                const newQ = [
                    ...state.questions.slice(0, index),
                    e,
                    ...state.questions.slice(index + 1)
                ];

                let newState = { ...state, questions: newQ };
                setState(newState);
                setIsEdited(true);
            }
        });

        dialogProps.setContentDialog(
            <DialogList dropdown={{...dropdown}} setChanges={dialogProps.setChanges} />
        );
        dialogProps.setVisibleDialog(true);
    }

    return {
        state,
        image,
        isLoading,
        isEdited,
        handleChange,
        onSave,
        handleImage,
        handleAddQuestion,
        handleEditQuestion,
        getWords,
        handleDeleteQuestion,
        handleEditDropdown
    }
}

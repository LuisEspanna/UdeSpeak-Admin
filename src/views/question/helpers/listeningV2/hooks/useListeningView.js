import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import {
    saveFileOnFirebase,
    deleteFileFromFirebase,
} from '../../../../../services/firebase';
import { STORAGE } from '../../../../../constants';
import { idGenerator } from '../../../../../functions';
import useQuestions from '../../../../../hooks/useQuestions';


export default function useListeningView(question) {
    const [state, setState] = useState(question);
    const [image, setImage] = useState(question?.image || undefined);
    const [audio, setAudio] = useState(question?.audio || undefined);
    const { editQuestionById, editQuestion } = useQuestions();
    const [isLoading, setIsLoading] = useState(false);
    const [isEdited, setIsEdited] = useState(false);

    console.log(question);

    useEffect(() => {
        setState(question);
        setImage(question?.image || undefined);
        setAudio(question?.audio || undefined);
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
            "id": (type !== 'question' ? localTitle : idGenerator(7)),
            "type": type,
            "title": localTitle,
            "options": [
                {
                    "id": idGenerator(7),
                    "isValid": true,
                    "description": (type === 'question' ? '2' : "Opción 1")
                },
                {
                    "isValid": false,
                    "id": idGenerator(7),
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

    const handleImage = (e) => {
        if (e.target?.files) {
            setImage(e.target?.files[0]);
        } else {
            setImage(undefined);
        }
        setIsEdited(true);
    }

    const handleAudio = (e) => {
        if (e.target?.files) {
            setAudio(e.target?.files[0]);
        } else {
            setAudio(undefined);
        }
        setIsEdited(true);
    }

    const saveImage = async () => {
        if (typeof (state?.image) === 'string' && image === undefined) {
            console.log('Eliminando image de FBase');
            deleteFileFromFirebase(state?.image);
            await editQuestionById(state?.id, { image: null }).then(() => {
                setState({ ...state, image: undefined })
            });
        }

        if (typeof (image) === 'object') {
            if (typeof (state?.image) === 'string') {
                console.log('Eliminando imagen de FBase por reemplazo');
                await deleteFileFromFirebase(state?.image);
                await editQuestionById(state?.id, { image: null });
            }

            console.log('guardando imagen en fbase');

            setIsLoading(true);
            const imageName = idGenerator(20);
            await saveFileOnFirebase(STORAGE.QUESTION, imageName, image).then((downloadURL) => {
                if (downloadURL !== null) {
                    const newQuestion = { image: downloadURL };
                    editQuestionById(state?.id, newQuestion).then(() => {
                        setState({ ...state, image: downloadURL });
                        setImage(downloadURL);
                    });
                };
            });
        }
    }

    const saveAudio = async () => {
        if (typeof (state?.audio) === 'string' && audio === undefined) {
            console.log('Eliminando audio de FBase');
            await deleteFileFromFirebase(state?.audio);
            await editQuestionById(state?.id, { audio: null }).then(() => {
                setState({ ...state, audio: undefined })
            });
        }

        if (typeof (audio) === 'object') {
            if (typeof (state?.audio) === 'string') {
                console.log('Eliminando audio de FBase por reemplazo');
                deleteFileFromFirebase(state?.audio);
                editQuestionById(state?.id, { audio: null });
            }

            console.log('guardando audio en fbase');

            setIsLoading(true);
            const fileName = idGenerator(20);
            await saveFileOnFirebase(STORAGE.AUDIOS, fileName, audio).then((downloadURL) => {
                if (downloadURL !== null) {
                    const newQuestion = { audio: downloadURL };
                    editQuestionById(state?.id, newQuestion).then(() => {
                        setState({ ...state, audio: downloadURL });
                        setAudio(downloadURL);
                    });
                };
            });
        }
    }

    const onSave = async () => {
        setIsLoading(true);
        //console.log(state);
        //return;

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
                    const newState = { ...state };
                    delete newState['image'];
                    delete newState['audio'];

                    await saveImage();
                    await saveAudio();

                    await editQuestion(newState).then(() => {
                        setIsLoading(false);
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

    return {
        state,
        image,
        isLoading,
        isEdited,
        audio,
        handleChange,
        onSave,
        handleImage,
        handleAddQuestion,
        handleEditQuestion,
        handleDeleteQuestion,
        handleAudio
    }
}

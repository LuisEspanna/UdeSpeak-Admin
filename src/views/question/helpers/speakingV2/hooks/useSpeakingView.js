import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import {
    saveFileOnFirebase,
    deleteFileFromFirebase,
} from '../../../../../services/firebase';
import { STORAGE } from '../../../../../constants';
import { idGenerator } from '../../../../../functions';
import useQuestions from '../../../../../hooks/useQuestions';
import useLoading from '../../../../../hooks/useLoading';


export default function useSpeakingView(question) {
    const [state, setState] = useState(question);
    const [image, setImage] = useState(question?.image || undefined);
    const [audio, setAudio] = useState(question?.audio || undefined);
    const { editQuestionById, editQuestion } = useQuestions();
    const { setLoading } = useLoading();
    const [isEdited, setIsEdited] = useState(false);

    useEffect(() => {
        setState(question);
        setImage(question?.image || undefined);
        setAudio(question?.audio || undefined);
    }, [question]);

    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: (e.target.value) });
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
            deleteFileFromFirebase(state?.image);
            await editQuestionById(state?.id, { image: null }).then(() => {
                setState({ ...state, image: undefined })
            });
        }

        if (typeof (image) === 'object') {
            if (typeof (state?.image) === 'string') {
                await deleteFileFromFirebase(state?.image);
                await editQuestionById(state?.id, { image: null });
            }

            setLoading(true);
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
            await deleteFileFromFirebase(state?.audio);
            await editQuestionById(state?.id, { audio: null }).then(() => {
                setState({ ...state, audio: undefined })
            });
        }

        if (typeof (audio) === 'object') {
            if (typeof (state?.audio) === 'string') {
                deleteFileFromFirebase(state?.audio);
                editQuestionById(state?.id, { audio: null });
            }

            setLoading(true);
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
        setLoading(true);

        // TODO: Validar opciones y preguntas
        if ((state?.validation_text && state?.validation_text?.length > 0)) {
            if (
                //(state.description && state.description.length > 0) &&
                (state.title && state.title.length > 0)) {

                let errors = [];

                if (audio === undefined && (!state.description || state.description.length === 0)) {
                    errors.push('El ejercicio debe tener una descripción o un audio a repetir');
                }

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
                    delete newState['image'];
                    delete newState['audio'];

                    await saveImage();
                    await saveAudio();

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
        else {
            Swal.fire(
                'Error!',
                'No se puede guardar, el texto a pronunciar es obligatorio',
                'error'
            )
            setLoading(false);
        }
    }

    return {
        state,
        image,
        isEdited,
        audio,
        handleChange,
        onSave,
        handleImage,
        handleAudio
    }
}

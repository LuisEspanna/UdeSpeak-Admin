import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import {
    saveFileOnFirebase,
    //saveOnFirestore,
    //updateFirestoreDoc,
    //deleteFromFirestore,
    deleteFileFromFirebase,
    //readFromFirestoreWhere
} from '../../../../../services/firebase';
import { STORAGE } from '../../../../../constants';
import { idGenerator } from '../../../../../functions';
import useQuestions from '../../../../../hooks/useQuestions';


export default function useSpeakingView(question) {
    const [state, setState] = useState(question);
    const [image, setImage] = useState(question?.image || undefined);
    const [audio, setAudio] = useState(question?.audio || undefined);
    const { editQuestion } = useQuestions();
    const [isLoading, setIsLoading] = useState(false);
    const [isEdited, setIsEdited] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        setState(question);
        setImage(question?.image || undefined);
        setAudio(question?.audio || undefined);
    }, [question])

    const handlePlaying = (e) => {
        if (audio) setIsPlaying(!isPlaying);
    }

    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: (e.target.value) });
        setIsEdited(true);
    }

    const handleAddOption = () => {
        setIsEdited(true);
        let options = state?.options ? [...state?.options] : [];
        options.push({ letter: '', description: '', isValid: false, id: idGenerator(7) });
        setState({ ...state, options });
    }

    const handleEditOption = (id, newValue) => {
        const options = state.options.map((option) => {
            if (option.id === id)
                return { ...option, ...newValue };
            else
                return option;
        });

        setState({ ...state, options });
        setIsEdited(true);
    }

    const handleDeleteOption = (id) => {
        let options = state?.options?.filter((option) => option.id !== id);
        setState({ ...state, options });
        setIsEdited(true);
    }

    const saveImage = () => {
        const imageName = idGenerator(20);
        saveFileOnFirebase(STORAGE.QUESTION, imageName, image).then((downloadURL) => {
            if (downloadURL !== null) {
                const newQuestion = { ...state, image: downloadURL };
                setIsLoading(true);
                editQuestion(newQuestion).then(() => {
                    setState(newQuestion);
                    setImage(downloadURL);
                    setIsLoading(false);
                    setIsEdited(false);

                    if (!typeof (audio) === 'object') {
                        Swal.fire(
                            'OK',
                            'Cambios guardados',
                            'success'
                        )
                    } else saveAudio(newQuestion);
                });
            };
        });
    }

    const saveAudio = (newState) => {
        const audioName = idGenerator(20);
        saveFileOnFirebase(STORAGE.AUDIOS, audioName, audio).then((downloadURL) => {
            if (downloadURL !== null) {
                const newQuestion = { ...newState, audio: downloadURL };
                setIsLoading(true);
                editQuestion(newQuestion).then(() => {
                    setState(newQuestion);
                    setAudio(downloadURL);
                    setIsLoading(false);
                    setIsEdited(false);

                    Swal.fire(
                        'OK',
                        'Cambios aguardados',
                        'success'
                    )
                });
            };
        });
    }

    const onSave = () => {
        if (state.options && state.options.length > 0) {
            const options = state.options.filter((p) => (p.letter.length > 0 && p.description.length > 0));
            setState({ ...state, options });

            if ((state.description && state.description.length > 0) &&
                (state.title && state.title.length > 0) &&
                (audio !== undefined)) {
                if (typeof (image) === 'object') {
                    saveImage();
                } 
                else if(typeof (audio) === 'object') {
                    saveAudio({...state});
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
            } else {
                Swal.fire(
                    'Error!',
                    'Título, descripción y el audio son obligatorios',
                    'error'
                )
            }
        }
        else {
            Swal.fire(
                'Error!',
                'No se puede guardar, debe tener al menos 1 posible respuesta',
                'error'
            )
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

        if (e?.target?.files) {
            setImage(e.target?.files[0]);
        } else {
            setImage(undefined);
        }
        setIsEdited(true);
    }

    const handleAudio = (e) => {
        if (state?.audio && typeof (state?.audio) === 'string') {
            //Delete from db
            setIsLoading(true);
            deleteFileFromFirebase(state?.audio).then(() => {
                const newQuestion = { ...state, audio: null };

                editQuestion(newQuestion).then(() => {
                    setState(newQuestion);
                    setAudio(undefined);
                    setIsLoading(false);
                });
            });
        }

        if (e.target?.files) {
            setAudio(e.target?.files[0]);
        } else {
            setAudio(undefined);
        }
        setIsEdited(true);
    }

    return {
        state,
        image,
        isLoading,
        isEdited,
        audio,
        isPlaying,
        handleChange,
        onSave,
        handleAddOption,
        handleEditOption,
        handleDeleteOption,
        handleImage,
        handleAudio,
        handlePlaying
    }
}

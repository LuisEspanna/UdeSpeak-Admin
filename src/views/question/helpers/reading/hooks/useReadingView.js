import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import {
    saveFileOnFirebase,
    deleteFileFromFirebase,
} from '../../../../../services/firebase';
import { STORAGE } from '../../../../../constants';
import { idGenerator } from '../../../../../functions';
import useQuestions from '../../../../../hooks/useQuestions';


export default function useSpeakingView(question) {
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

    const handleAddOption = () => {
        setIsEdited(true);
        /*
        let options = state?.options ? [...state?.options] : [];
        options.push({ letter: '', description: '', isValid: false, id: idGenerator(7) });
        setState({ ...state, options });
        */
    }

    const handleAddQuestion = () => {
        setIsEdited(true);
        let questions = state?.questions ? [...state?.questions] : [];
        questions.push({ id: idGenerator(7) });
        setState({ ...state, questions });
    }

    const handleEditQuestion = (e, item) => {
        if(e.target.name === 'option'){
            const option = e.target.value.option;
            const question = e.target.value.parent;
            const options = question.options;

            const indexOption = options.findIndex(op => op.id === option.id);
            const indexQuestion = state.questions.findIndex(qe => qe.id === question.id);      
            
            const newOptions = [
                ...options.slice(0, indexOption),
                option,
                ...state.questions.slice(indexOption+1)
            ];

            const newQuestion = {...question, options: newOptions};
            
            const questions = [
                ...state.questions.slice(0, indexQuestion),
                newQuestion,
                ...state.questions.slice(indexQuestion+1)
            ];

            setState({ ...state, questions });
            console.log(questions);
        } else {
            const newQuestion = {...item, [e.target.name]: (e.target.name === 'isValid' ? e.target.checked : e.target.value)};
            const indexQuestion = state.questions.findIndex(qe => qe.id === item.id);

            const questions = [
                ...state.questions.slice(0, indexQuestion),
                newQuestion,
                ...state.questions.slice(indexQuestion+1)
            ];

            setState({ ...state, questions });
            console.log(questions);
        }

        setIsEdited(true);
    }

    const onAddQuestionOption = (question, index) => {
        const options = question?.options || [];
        options.push({ letter: '', description: '', isValid: false, id: idGenerator(7) });

        const newQuestion = {...question, options};

        const questions = [
            ...state.questions.slice(0, index),
            newQuestion,
            ...state.questions.slice(index+1)
        ];

        setState({ ...state, questions });
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
                });
            };
        });
    }

    const onSave = () => {
        // TODO: Validar opciones y preguntas
        if (state.options && state.options.length > 0) {
            const options = state.options.filter((p) => (p.letter.length > 0 && p.description.length > 0));
            setState({ ...state, options });

            if ((state.description && state.description.length > 0) &&
                (state.title && state.title.length > 0)) {
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
            } else {
                Swal.fire(
                    'Error!',
                    'La descripción es obligatoria',
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

        if (e.target?.files) {
            setImage(e.target?.files[0]);
        } else {
            setImage(undefined);
        }
        setIsEdited(true);
    }

    return {
        state,
        image,
        isLoading,
        isEdited,
        handleChange,
        onSave,
        handleAddOption,
        handleDeleteOption,
        handleImage,
        handleAddQuestion,        
        handleEditQuestion,
        onAddQuestionOption
    }
}

import React
, { useState, useEffect } 
from 'react';
import Button from '../../../../../components/button/Button';
import TextField from '../../../../../components/form/textField/TextField';
import SaveIcon from '../../../../../components/icons/SaveIcon';
import TrashIcon from '../../../../../components/icons/TrashIcon';
import { idGenerator } from '../../../../../functions';
import RowQuestionOption from './RowQuestionOption';

export default function QuestionItem({questionItem, onChange, index, onDelete}) {
    
    const [state, setState] = useState(questionItem);
    const [isEditing, setisEditing] = useState(true);

    useEffect(() => {
        setState(questionItem);
    }, [questionItem]);
    
    
    const handleChange = (e) => {
        if(questionItem.type === 'question'){
            setState({...state, [e.target.name]: e.target.value});
        } else {
            setState({...state, [e.target.name]: e.target.value.replaceAll(' ', '')});
        }
        
        setisEditing(true);
    }

    const handleAddOption = () => {
        const options = state?.options || [];
        options.push({ letter: '', description: '', isValid: false, id: idGenerator(7) });
        setState({...state, options});
    }

    const handleEditOption = (option) => {
        const indexOption = state.options.findIndex(op => op.id === option.id);

        const newOptions = [
            ...state.options.slice(0, indexOption),
            option,
            ...state.options.slice(indexOption+1)
        ];

        setState({...state, options: newOptions});
        setisEditing(true);
    }

    const handleDeleteOption = (option) => {
        const options = state.options.filter(op => op.id !== option.id);
        setState({...state, options});
        setisEditing(true);
    }


    const handleSave = () => {
        if(onChange)onChange(state);
        setisEditing(false);
    }

    return (
        <div className={`my-2 r-container ${isEditing ? 'r-container-is-editing' : ''}`}>
            <div className='row my-2'>
                <div className='col-8'>
                    {questionItem.type === 'question' ? 'Pregunta ' : 'Lista '} {index + 1}
                </div>
                <div className='col d-flex justify-content-end'>
                    {
                        isEditing ? 
                        <Button type='primary' onClick={handleSave}>
                            <SaveIcon className='icon'/>
                        </Button> : 
                        <Button type='danger' onClick={() => onDelete(questionItem)}>
                            <TrashIcon className='icon'/>
                        </Button>
                    }                    
                </div>
            </div>
            {
                questionItem.type === 'question' ?
                    <textarea onChange={handleChange} name='title' value={state?.title} placeholder='Texto / pregunta'/>
                : <TextField onChange={handleChange} className='my-2' placeholder='Nombre lista desplegable' name='title' value={state?.title}/>
            }
                                 
            {
                state?.options &&
                <table className="table">
                    <thead>
                        <tr>
                            {questionItem.type === 'question' && <th scope="col">Opción</th>}                            
                            <th scope="col">Descripción</th>
                            <th scope="col">Respuesta válida</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            state?.options.map((option, i) =>
                                <RowQuestionOption
                                    key={i}
                                    option={option}
                                    onSave={handleEditOption}
                                    onDelete={() => handleDeleteOption(option)}
                                    type={questionItem.type}
                                />
                            )
                        }
                    </tbody>
                </table>
            }
            <Button type='primary' title='Agregar opción' className='px-2' onClick={() => handleAddOption(questionItem, index)}/>
        </div>
    )
}

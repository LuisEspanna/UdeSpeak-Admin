import React
, { useState, useEffect } 
from 'react';
import Button from '../../../../../components/button/Button';
import { idGenerator } from '../../../../../functions';
import RowQuestionOption from './RowQuestionOption';

export default function QuestionItem({questionItem, onChange, index}) {
    
    const [state, setState] = useState(questionItem);
    const [isEditing, setisEditing] = useState(true);

    useEffect(() => {
        setState(questionItem);
    }, [questionItem]);
    
    
    const handleChange = (e) => {
        setState({...state, [e.target.name]: e.target.value});
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
        <div className='my-2 r-container'>
            <div className='my-2'>Pregunta {index + 1}</div>
            <textarea onChange={handleChange} name='title' value={state?.title}/>
            {
                isEditing && <Button title='Guardar' type='primary' onClick={handleSave}/>
            }
            {
                state?.options &&
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Opción</th>
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

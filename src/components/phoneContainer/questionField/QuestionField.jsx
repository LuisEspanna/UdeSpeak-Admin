import React from 'react'
import OptionField from '../../form/optionField/OptionField';
import './styles.scss';
import Button from '../../button/Button';
import TrashIcon from '../../icons/TrashIcon';
import { useState } from 'react';
import { idGenerator, getLetter } from '../../../functions';

export default function QuestionField({ question, onDelete, onChange }) {
    const [state, setState] = useState({ ...question });

    const handleAddOption = () => {
        const options = state?.options || [];
        const newOption = { description: 'Nueva opción', isValid: false, id: idGenerator(7) };
        options.push(newOption);
        setState({ ...state, newOption });
        if (onChange)
            onChange({ ...state, newOption });
    }

    const onChangeTextOption = (option, index, text) => {
        let newOptions = [...state?.options?.slice(0, index), { ...option, description: text }, ...state?.options?.slice(index + 1)];
        setState({ ...state, options: newOptions })
        if (onChange)
            onChange({ ...state, options: newOptions });
    }

    const onDeleteOption = (item) => {
        setState({ ...state, options: state?.options?.filter((o) => o.id !== item.id) })
        if (onChange)
            onChange({ ...state, options: state?.options?.filter((o) => o.id !== item.id) });
    }

    const onChangeRadio = (option, index) => {
        let newOptions = [...state.options];
        newOptions.forEach(o => o.isValid = false);
        newOptions = [...newOptions.slice(0, index), { ...option, isValid: true }, ...newOptions.slice(index + 1)];
        setState({ ...state, options: newOptions });
        if (onChange)
            onChange({ ...state, options: newOptions });
    }

    const onChangeQuestion = (text) => {
        setState({ ...state, title: text })
        if (onChange)
            onChange({ ...state, title: text });
    }

    return (
        <>
            <p className='label mt-3'>Pregunta de selección única</p>
            <div className='question-field'>
                <textarea 
                    placeholder='Escriba una pregunta' 
                    value={question?.title} className='question-title'
                    onChange={(e)=>onChangeQuestion(e.target.value)}
                    rows={question?.title.length< 26? 1 : 2}
                />
                {
                    question?.options?.map((option, i) =>
                        <OptionField
                            key={i}
                            letter={getLetter(i)}
                            option={option}
                            onChangeRadio={(e) => onChangeRadio(option, i, e)}
                            onChangeText={(e) => onChangeTextOption(option, i, e.target.value)}
                            onDelete={() => onDeleteOption(option)}
                        />
                    )
                }
                {
                    (question?.options?.length && question?.options?.length < 4) &&
                    <div className='add-option' onClick={handleAddOption}>
                        Agregar una opción
                    </div>
                }

                <Button type='danger' className='action-btn' onClick={() => onDelete(question)}>
                    <TrashIcon className='icon' />
                </Button>
            </div>
        </>
    )
}

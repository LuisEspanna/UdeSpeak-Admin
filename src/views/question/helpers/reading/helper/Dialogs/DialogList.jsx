import React, { useState } from 'react';
import './styles.scss';
import { idGenerator } from '../../../../../../functions';
import DraggableList from '../../../../../../components/draggableList/DraggableList';
import OptionField from '../../../../../../components/form/optionField/OptionField';
import { useEffect } from 'react';

export default function DialogList({ dropdown, setChanges }) {
    const [state, setState] = useState({ ...dropdown });

    useEffect(() => {
        if (setChanges)
            setChanges({ ...dropdown });
    }, [dropdown, setChanges]);

    const handleAddOption = () => {
        const options = state?.options || [];
        const newOption = { description: 'Nueva opción', isValid: false, id: idGenerator(7) };
        options.push(newOption);
        setState({ ...state, options });
        if (setChanges)
            setChanges({ ...state, options });
    }

    const onChangeTextOption = (option, index, text) => {
        let newOptions = [...state?.options?.slice(0, index), { ...option, description: text }, ...state?.options?.slice(index + 1)];
        setState({ ...state, options: newOptions })
        if (setChanges)
            setChanges({ ...state, options: newOptions });
    }

    const handleDeleteOption = (item) => {
        setState({ ...state, options: state?.options?.filter((o) => o.id !== item.id) })
        if (setChanges)
            setChanges({ ...state, options: state?.options?.filter((o) => o.id !== item.id) });
    }

    const onChangeRadio = (option, index) => {
        let newOptions = [];
        
        state.options.forEach(o => {
            newOptions.push({...o, isValid: false});
        });
        
        newOptions = [...newOptions.slice(0, index), { ...option, isValid: true }, ...newOptions.slice(index + 1)];
        setState({ ...state, options: newOptions });
        if (setChanges)
            setChanges({ ...state, options: newOptions });
    }

    return (
        <div className='dialog-list-element'>
            <p className='dialog-title'>Vista previa</p>
            <DraggableList options={state?.options} />
            <div className='my-4'>
                {
                    state?.options.map((option, i) =>
                        <OptionField
                            key={i}
                            onChangeText={(e) => onChangeTextOption(option, i, e.target.value)}
                            onChangeRadio={(e) => onChangeRadio(option, i, e)}
                            onDelete={() => handleDeleteOption(option)}
                            option={option}
                        />
                    )
                }
                {
                    state?.options?.length < 4 &&
                    <div className='add-option' onClick={handleAddOption}>
                        Agregar una opción
                    </div>
                }
            </div>
        </div>
    )
}

import React, { useState } from 'react';
import './styles.scss';
import { idGenerator } from '../../../../../../functions';
import DraggableList from '../../../../../../components/draggableList/DraggableList';
import OptionField from '../../../../../../components/form/optionField/OptionField';

export default function DialogList({dropdown, setChanges}) {
    const [state, setState] = useState({...dropdown});

    const handleAddOption = () => {
        const options = state?.options || [];
        const newOption = { description: 'Nueva opción', isValid: false, id: idGenerator(7) };
        options.push(newOption);
        setState({ ...state, newOption });
        if (setChanges)
            setChanges({ ...state, newOption });
    }

    const onChangeTextOption = (option, index, text) => {
        let newOptions = [...state?.options?.slice(0, index), {...option, description: text}, ...state?.options?.slice(index + 1)];
        setState({...state, options: newOptions})
        if (setChanges)
            setChanges({...state, options: newOptions});
    }

    const handleDeleteOption = (item) => {
        setState({...state, options: state?.options?.filter((o) => o.id !== item.id)})
        if (setChanges)
            setChanges({...state, options: state?.options?.filter((o) => o.id !== item.id)});
    }

    const onChangeRadio = (option, index) => {
        let newOptions = [...state.options];
        newOptions.forEach(o => o.isValid = false);
        newOptions = [...newOptions.slice(0, index), {...option, isValid: true}, ...newOptions.slice(index + 1)];
        setState({...state, options: newOptions});
        if (setChanges)
            setChanges({...state, options: newOptions});
    }

    return (
        <div className='dialog-list-element'>
            <p className='dialog-title'>Vista previa</p>
            <DraggableList options={state?.options}/>
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
                <div className='add-option' onClick={handleAddOption}>
                    Agregar una opción
                </div>
            </div>
        </div>
    )
}

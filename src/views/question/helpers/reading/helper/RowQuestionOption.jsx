import React, { useState, useEffect } from 'react';
import { useRef } from 'react';
import Button from '../../../../../components/button/Button';
import TrashIcon from '../../../../../components/icons/TrashIcon';
import SaveIcon from '../../../../../components/icons/SaveIcon';
import useOnClickOutside from '../../../../../hooks/useOnClickOutside';

export default function RowQuestionOption({option, onDelete, onSave}) {

    const [state, setState] = useState(option);
    const [isEditing, setIsEditing] = useState(false);


    useEffect(() => {
        setState(option);
    }, [option]);
    

    const ref = useRef();
    useOnClickOutside(ref, ()=>{
        //setIsEditing(false);
         //if(onSave)onSave(state);
    });

    const handleChange = (e) => {
        setIsEditing(true);
        setState({...state, [e.target.name]: (e.target.name === 'isValid' ? e.target.checked : e.target.value)});
    }

    const handleSave = () => {
        if(onSave) onSave(state);
        setIsEditing(false);
    }

    return (
        <tr ref={ref}>
            <th scope="row" onClick={()=> setIsEditing(true)}>
                {
                    isEditing ? 
                    <input type='text' name='letter' onChange={handleChange} value={state.letter}/>
                    : state.letter
                }
            </th>
            <td onClick={()=> setIsEditing(true)}>
                {
                    isEditing ? 
                    <input type='text' name='description' onChange={handleChange} value={state.description}/>
                    : state.description
                }
            </td>
            <td>
                <input type="checkbox" checked={state.isValid || false} onChange={handleChange} name='isValid'/>
            </td>
            <td>
                <div className='d-flex'>
                    {
                        isEditing && 
                        <Button type='primary' onClick={handleSave}>
                            <SaveIcon className='icon'/>
                        </Button>
                    }

                    <Button type='danger' className='mx-2' onClick={onDelete}>
                        <TrashIcon className='icon'/>
                    </Button>
                </div>
            </td>
        </tr>
    )
}

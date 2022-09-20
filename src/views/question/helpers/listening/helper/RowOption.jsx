import React, { useState } from 'react';
import { useRef } from 'react';
import Button from '../../../../../components/button/Button';
import useOnClickOutside from '../../../../../hooks/useOnClickOutside';

export default function RowOption({option, onChange, onDelete}) {

    const [isEditing, setIsEditing] = useState(false);
    const ref = useRef();
    useOnClickOutside(ref, ()=>{
        setIsEditing(false);
    });

    const handleChange = (e) => {
        if(onChange)
            onChange(option.id, {[e.target.name]: (e.target.name === 'isValid' ? e.target.checked : e.target.value)});
    }

    return (
        <tr ref={ref}>
            <th scope="row" onClick={()=> setIsEditing(true)}>
                {
                    isEditing ? 
                    <input type='text' name='letter' onChange={handleChange} value={option.letter}/>
                    : option.letter
                }
            </th>
            <td onClick={()=> setIsEditing(true)}>
                {
                    isEditing ? 
                    <input type='text' name='description' onChange={handleChange} value={option.description}/>
                    : option.description
                }
            </td>
            <td>
                <input type="checkbox" checked={option.isValid || false} onChange={handleChange} name='isValid'/>
            </td>
            <td><Button type='danger' title='Eliminar' onClick={()=>onDelete(option.id)}/></td>
        </tr>
    )
}

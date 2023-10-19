import React from 'react';
import './styles.scss';
import TrashIcon from '../../icons/TrashIcon';
import Button from '../../button/Button';

export default function OptionField({onChangeText, onChangeRadio, option, onDelete, letter, hiddeRadio}) {
    return (
        <div className='option'>
            {
                letter && <span className='letter'>{letter}</span>
            }            
            <textarea type='text' value={option.description} onChange={onChangeText} rows={option.description.length<15 ? 1 : 2}/>
            <input type='radio' checked={option.isValid} onChange={onChangeRadio} hidden={hiddeRadio}/>
            <Button type='danger' onClick={onDelete}>
                <TrashIcon className='icon' />
            </Button>
        </div>
    )
}

import React from 'react';
import './styles.scss';
import TrashIcon from '../../icons/TrashIcon';
import Button from '../../button/Button';

export default function OptionField({onChangeText, onChangeRadio, option, onDelete, letter}) {
    return (
        <div className='option'>
            {
                letter && <span className='letter'>{letter}</span>
            }            
            <textarea type='text' value={option.description} onChange={onChangeText}/>
            <input type='radio' checked={option.isValid} onChange={onChangeRadio} />
            <Button type='danger' onClick={onDelete}>
                <TrashIcon className='icon' />
            </Button>
        </div>
    )
}

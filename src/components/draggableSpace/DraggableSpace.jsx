import React from 'react';
import './styles.scss';
import Button from '../button/Button';
import PencilIcon from '../icons/PencilIcon';
import TrashIcon from '../icons/TrashIcon';
import BlankSpaceDropDown from '../blankSpaceDropdown/BlankSpaceDropdown';

/**
 * @param {object} param0
 * @param {function} param0.onDragStart
 * @param {[]} param0.options
 * @param {function} param0.onEdit
 * @param {function} param0.onDelete
 * @returns 
 */
export default function DraggableList({ onDragStart, options, onEdit, onDelete }) {
    return (
        <div 
            className='draggable-list-container' 
            draggable 
            onDragStart={onDragStart}
        >
            <div className='draggable-content'>
                <span className='drag-label'>

                </span>
                <BlankSpaceDropDown options={options}/>
                <Button type='primary' className='c-btn' onClick={onEdit}>
                    <PencilIcon className='icon' />
                </Button>
                <Button type='danger' className='c-btn' onClick={onDelete}>
                    <TrashIcon className='icon' />
                </Button>
            </div>
        </div>
    )
}
